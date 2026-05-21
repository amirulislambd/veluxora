import LogInForm from "@/components/auth/LogInForm";

export const metadata = {
  title: "Login | VELUXORA Drive — Inner Circle",
  description:
    "Enter the inner circle of automotive excellence. Sign in to your Obsidian Drive account to manage your luxury fleet and bookings.",
  openGraph: {
    title: "Login | VELUXORA",
    description:
      "Sign in to manage your high-performance luxury vehicle reservations.",
    images: ["https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800"],
  },
};

const LogInPage = () => {
  return <LogInForm />;
};

export default LogInPage;
