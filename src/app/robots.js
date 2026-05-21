export default function robots() {
    return {
      rules: {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/(privete)/"],
      },
      sitemap: "https://veluxora.vercel.app/sitemap.xml",
    };
  }