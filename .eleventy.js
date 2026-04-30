// Eleventy config — builds the /blog/ section while leaving the existing
// hand-coded homepage (index.html), assets/, downloads/, CNAME untouched.
//
// Build:        npx @11ty/eleventy
// Dev preview:  npm run dev   (then visit http://localhost:8080/blog/)

module.exports = function(eleventyConfig) {
  // === Static passthrough — these files are copied verbatim, never templated ===
  eleventyConfig.addPassthroughCopy("index.html");
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("downloads");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy({ "blog/blog.css": "blog/blog.css" });
  // Decap CMS UI — copied as-is, never templated
  eleventyConfig.addPassthroughCopy("studio");

  // === Posts collection (newest first) ===
  eleventyConfig.addCollection("posts", function(api) {
    return api.getFilteredByGlob("blog/posts/*.md")
      .filter(p => !p.data.draft)
      .sort((a, b) => b.date - a.date);
  });

  // === Filters ===
  eleventyConfig.addFilter("readableDate", (d) => {
    return new Date(d).toLocaleDateString("en-GB", {
      year: "numeric", month: "long", day: "numeric"
    });
  });
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString());

  // First N items
  eleventyConfig.addFilter("limit", (arr, n) => arr.slice(0, n));

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
