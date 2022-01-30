import * as Yup from "yup";

import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";

import Axios from "../setup/Axios";
import { useRouter } from "next/router";
import slugify from "../setup/slugify";

const formData = [
  { name: "first_name", type: "text", label: "Fisrt Name" },
  { name: "last_name", type: "text", label: "Last Name" },
  { name: "email", type: "email-address", label: "e-mail" },
  // { name: "role", type: "text", label: "Role" },
];

const UserSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(5, "Minimum 5 letters required")
    .required("Name is required"),
  last_name: Yup.string(),
  email: Yup.string().required("Email is required"),
  role: Yup.string().required("Role is required"),
});

const CreateUserForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    role: "",
  };

  const roles = ["user", "admin"];
  const [role, setRole] = useState(user?.role);

  const SubmitForm = async ({ values }) => {
    setLoading(true);
    values.username = slugify(`${values.first_name} ${values.last_name}`);

    console.log({ values });
    console.log("creating users");

    let url = `/users/`;
    const res = await Axios.post(url, values);
    if (res.status == 201) {
      console.log("successfully created user");
    } else {
      console.log("Something went wrong try again!");
    }

    queryClient.invalidateQueries();
    setLoading(false);
    router.push("/");
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={UserSchema}
        onSubmit={(values) => {
          SubmitForm({ values: values });
        }}
      >
        {({ handleSubmit, isValid }) => (
          <Form className="form-control">
            {formData.map((item) => (
              <div className="flex flex-col pt-2 pb-1" key={item.name}>
                <label
                  htmlFor={item.name}
                  className="text-sm text-gray-500 uppercase"
                >
                  {item.label}
                </label>
                <Field
                  name={item.name}
                  type={item.type}
                  placeholder={item.initial ? item.initial : item.label}
                  className="w-full px-2 py-2 my-1 text-gray-900 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name={item.name}
                  component="div"
                  className="text-xs text-red-500"
                />
              </div>
            ))}
            <div>
              <label className="text-sm text-gray-500 uppercase">Role</label>
              <select
                id={"role"}
                name={"role"}
                className="w-full px-2 py-2 my-1 bg-white border border-gray-300 rounded-md"
                onChange={(e) => setRole(e.target.value)}
              >
                {roles.map((role) => (
                  <option value={role} key={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full mt-8 space-y-3">
              <div
                className="flex justify-center w-full shadow-sm cursor-pointer btn hover:scale-100 hover:bg-gray-100"
                onClick={() => router.back()}
              >
                Cancel
              </div>
              <button
                type="submit"
                className="w-full cursor-pointer btn btn-primary hover:scale-100"
                onClick={handleSubmit}
                // disabled={!isValid}
              >
                <span className="w-full text-center">
                  {editing ? "Update" : "Create User"}
                </span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateUserForm;
