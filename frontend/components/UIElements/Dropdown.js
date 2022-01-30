import React from "react";

const Dropdown = ({ title, setStateFn, renderItem }) => {
  return (
    <div>
      <label className="block text-lg font-medium capitalize text-cyan-400">
        {title}{" "}
      </label>
      <select
        id={title}
        name={title}
        className="mt-1 block w-full rounded-md border border-cyan-300 bg-white px-3 py-2 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm"
        onChange={(e) => setStateFn(e.target.value)}
      >
        {renderItem}
      </select>
    </div>
  );
};

export default Dropdown;
