import AddCarForm from "@/components/addCar/AddCarForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


export const metadata = {
  title: "Add New Vehicle | VELUXORA — Fleet Acquisition",
  description:
    "Commission your machine into the premium fleet. Provide the technical specifications and aesthetic essence of your automotive masterpiece.",
  robots: {
    index: false,
    follow: true,
  },
};

const AddCarPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

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
            New Acquisition
          </h1>
          <p className="text-lg text-[#d0c5b2] max-w-2xl leading-relaxed">
            Commission your machine into the fleet. Provide the technical soul
            and aesthetic essence of your automotive masterpiece.
          </p>
        </header>

        {/* Client form */}
        <AddCarForm user={user} />
      </main>
    </div>
  );
};

export default AddCarPage;
