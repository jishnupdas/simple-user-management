import GetApiData from "../api/GetApiData";

const GetUsers = ({ queryParams, ...props }) => {
  const data = GetApiData({
    key: ["users", queryParams],
    pageParam: "/users/",
    queryParams: queryParams ? queryParams : {},
    props: props,
  });

  return data;
};

export default GetUsers;
