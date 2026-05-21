export default async function sitemap() {
    const baseUrl = "https://veluxora.vercel.app";
  
    
    const staticRoutes = ["", "/exploreCars", "/login", "/register", "/myAddedCars"].map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: route === "" ? "daily" : "weekly",
      priority: route === "" ? 1.0 : 0.8, 
    }));
  
    
    let carRoutes = [];
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "https://veluxora-server.vercel.app";
      const res = await fetch(`${apiBase}/cars`, { cache: "no-store" });
      
      if (res.ok) {
        const cars = await res.json();
        carRoutes = cars.map((car) => ({
          url: `${baseUrl}/exploreCars/${car._id}`, 
          lastModified: new Date().toISOString(),
          changeFrequency: "weekly",
          priority: 0.6,
        }));
      }
    } catch (error) {
      console.error("SEO Sitemap dynamic fetch failed:", error);
    }
  
    return [...staticRoutes, ...carRoutes];
  }