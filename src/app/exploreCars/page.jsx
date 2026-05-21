import ExploreCarsCard from "@/components/ExploreCars/ExploreCarsCard";


const ExploreCars = async () => {


  const res = await fetch(`http://localhost:5000/cars`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  console.log(data);
  return (
    <div className="">
      <div>
        <section className="relative w-full h-[40vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <img
              className="w-full h-full object-cover"
              data-alt="A cinematic, high-contrast photograph of a luxury sports car's sleek carbon fiber silhouette under dramatic amber and gold studio lighting. The scene is set in an ultra-modern, minimalist garage with deep black shadows and sharp light reflections that emphasize the vehicle's aerodynamic curves. The mood is elite and exclusive, perfectly capturing the dark luxury editorial aesthetic of Obsidian Drive."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQwZpymX55G-s3kTp8bdBR386YU29luV2AGWNNeh4iqL93yJNBsgzsRIuM7ylXSLsD0oRLLUxXH6itYm9VNRqu6aeiKKq-Zda8SJNO49UUaBiz19jpGbC_0UaHwkQ7-btwtdVwuPjyG71PXSUPXLNm44_ubN1xmG-KsQsEFDRp5xFY9SGFfO2j9KmPSRUrVuksuLkVe7lKT5ycReCf8nXiHqw8sqW_OSqrsOrv_NmePP8_r0v6YVnXtXDGjj1Mw0J3jGQmt-pixZo"
            />
            <div className="absolute inset-0 hero-gradient z-20"></div>
          </div>
          <div className="relative z-30 container mx-auto px-gutter w-full">
            <div className="flex flex-col justify-center items-center">
              <h1
                className="text-primary italic font-headline-lg text-headline-lg mb-4 text-2xl md:text-4xl lg:text-5xl text-center font-bold tracking-tight "
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Explore the Fleet
              </h1>
              <p className="text-lg  max-w-2xl leading-relaxed text-center ">
                Discover a world of automotive excellence. Our vast collection
                of high-performance vehicles is designed to captivate and
                inspire.
              </p>
            </div>
          </div>
        </section>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 container mx-auto p-4">
        {data.map((car) => (
          <ExploreCarsCard car={car} key={car._iid} />
        ))}
      </div>
    </div>
  );
};

export default ExploreCars;
