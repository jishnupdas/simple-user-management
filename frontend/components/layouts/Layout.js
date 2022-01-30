import Navbar from "../navigation/Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="grid w-full p-2 pt-10 place-items-center md:p-4 lg:p-8 lg:pt-16">
        {children}
      </div>
    </>
  );
};

export default Layout;
