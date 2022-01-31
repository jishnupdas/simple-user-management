import React from "react";
import { useIsFetching } from "react-query";
import Spinner from "../UIElements/Spinner";

const Navbar = () => {
  const isFetching = useIsFetching();
  return (
    <nav className="sticky top-0 flex items-center justify-between w-full px-3 py-5 bg-white shadow fle-row md:px-8">
      <div className="text-lg font-bold">Archimydes Challenge</div>
      {isFetching !== 0 ? <Spinner /> : null}
    </nav>
  );
};

export default Navbar;
