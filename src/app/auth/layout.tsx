import Navbar from "@/components/Navbar";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="h-screen flex ">
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/psl.png)' }}
      />
      <div className="w-1/2 flex flex-col ">
        <Navbar />
        <div className=" flex flex-grow items-center justify-center overflow-auto">{children}</div>
      </div>
    </section>
  );
};

export default AuthLayout;