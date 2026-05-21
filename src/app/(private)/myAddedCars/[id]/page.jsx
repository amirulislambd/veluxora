import UpdateCollection from "@/components/MyAddedCars/UpdateCollection";
import React from "react";

const UpdatePage = async ({ params }) => {

  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars/${id}`);
  const car = await res.json();
  return (
    <div className="min-h-screen bg-[#131318] text-[#e4e1e9]">
      <style>{`
        .glass-panel {
          background: rgba(31,31,37,0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(230,195,100,0.1);
        }
      `}</style>

      <main className="pt-16 pb-32 px-6 md:px-16 max-w-screen-xl mx-auto">
        {/* Header — static, server side */}
        <header className="mb-16">
          <h1
            className="text-[56px] md:text-[80px] leading-none tracking-tight text-[#e6c364] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Update Vehicle
          </h1>
          <p className="text-lg text-[#d0c5b2] max-w-2xl leading-relaxed">
            Refine your listing — update the details, pricing, and availability
            of your machine within the Veluxora fleet.
          </p>
        </header>

        {/* Client form */}
        <UpdateCollection user={car} />
      </main>
    </div>
  );
};

export default UpdatePage;
