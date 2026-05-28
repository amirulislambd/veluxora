export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/addCar",
        "/myAddedCars",
        "/myBookings",
        "/login",
        "/register",
      ],
    },
    sitemap: "https://veluxora.vercel.app/sitemap.xml",
  };
}