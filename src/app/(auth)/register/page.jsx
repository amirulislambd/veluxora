import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = {
  title: "Join the Inner Circle | VELUXORA — Registration",
  description:
    "Create an account on Veluxora to access a premium fleet of luxury and high-performance sports cars.",

  icons: {
    icon: "/favicon.ico",
  },

  robots: {
    index: false,
    follow: false,
  },
};

const RegisterPage = () => {
  return <RegisterForm />;
};

export default RegisterPage;
