import { ErrorMessage, useField } from "formik";

import React from "react";

const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-col mb-4">
      <label className="block text-lg font-medium text-green-800">
        {label}{" "}
      </label>
      <input {...field} {...props} className="px-3 py-2 border text-grey-800" />
      <ErrorMessage
        component="div"
        name={field.name}
        className="text-red-600 error"
      />
    </div>
  );
};
export default TextField;
