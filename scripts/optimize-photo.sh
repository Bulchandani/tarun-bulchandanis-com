#!/bin/bash
# scripts/optimize-photo.sh
#
# Resize and re-encode a JPG image IN PLACE using macOS sips.
# No npm install, no Homebrew, no Python — uses only what ships with macOS.
#
# Usage:
#   ./scripts/optimize-photo.sh <path-to-jpg> [max-dimension] [quality]
#
# Examples:
#   ./scripts/optimize-photo.sh assets/headshot.jpg
#   ./scripts/optimize-photo.sh assets/hero.jpg 1200 85
#   ./scripts/optimize-photo.sh assets/photo.jpg 1600 90
#
# Suggested max-dimension by use case:
#   600   — thumbnail / member-card photo (~50–100KB)
#   1200  — hero image / featured photo (~150–300KB)
#   1600  — full-screen photography (~250–500KB)
#
# Quality 80 is a near-imperceptible default. Bump to 85 or 90 if you
# care about the image (e.g. hero shots), drop to 70 for backgrounds.

set -euo pipefail

FILE="${1:-}"
MAX_DIM="${2:-600}"
QUALITY="${3:-80}"

if [ -z "$FILE" ]; then
  echo "Usage: $0 <path-to-jpg> [max-dimension=600] [quality=80]"
  echo ""
  echo "Run with -h or --help for full documentation."
  exit 1
fi
if [ "$FILE" = "-h" ] || [ "$FILE" = "--help" ]; then
  awk 'NR==1 { next } /^[^#]/ { exit } { sub(/^# ?/, ""); print }' "$0"
  exit 0
fi
if [ ! -f "$FILE" ]; then
  echo "Error: file not found: $FILE" >&2
  exit 1
fi

# Capture before-state
BEFORE_BYTES=$(stat -f%z "$FILE")
BEFORE_HUMAN=$(ls -lh "$FILE" | awk '{print $5}')
BEFORE_DIM=$(sips -g pixelWidth -g pixelHeight "$FILE" 2>/dev/null | awk '/pixelWidth|pixelHeight/ {print $2}' | paste -sd 'x' -)

echo "Optimizing $FILE"
echo "  Before:  ${BEFORE_HUMAN}  ${BEFORE_DIM}"

# Work on a copy so we don't lose the file if sips errors mid-way
TMP=$(mktemp).jpg
cp "$FILE" "$TMP"
sips -Z "$MAX_DIM" -s format jpeg -s formatOptions "$QUALITY" "$TMP" --out "$FILE" >/dev/null

# After-state
AFTER_BYTES=$(stat -f%z "$FILE")
AFTER_HUMAN=$(ls -lh "$FILE" | awk '{print $5}')
AFTER_DIM=$(sips -g pixelWidth -g pixelHeight "$FILE" 2>/dev/null | awk '/pixelWidth|pixelHeight/ {print $2}' | paste -sd 'x' -)
PCT=$(awk "BEGIN { printf \"%.0f\", (1 - $AFTER_BYTES / $BEFORE_BYTES) * 100 }")

echo "  After:   ${AFTER_HUMAN}  ${AFTER_DIM}"
echo "  Saved:   ${PCT}%"
echo ""
echo "If happy with the result:"
echo "  git add ${FILE}"
echo "  git commit -m \"Optimize $(basename "$FILE")\""
echo ""
echo "If you want to undo (sips replaced the original):"
echo "  git checkout -- ${FILE}"

rm -f "$TMP"
