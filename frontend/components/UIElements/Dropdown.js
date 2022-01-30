import React from "react";

const Dropdown = ({ title, setStateFn, renderItem }) => {
  return (
    <div>
      <label className="block text-lg font-medium capitalize text-sky-400">
        {title}{" "}
      </label>
      <select
        id="title"
        name="title"
        className="block w-full px-3 py-2 mt-1 bg-white border rounded-md shadow-sm border-sky-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
        onChange={(e) => setStateFn(e.target.value)}
        // size={5}
      >
        <option value={""} defaultValue>
          {"All "}
        </option>
        {renderItem}
      </select>
    </div>
  );
};

export default Dropdown;
