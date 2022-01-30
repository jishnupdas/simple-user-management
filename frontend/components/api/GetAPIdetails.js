import Axios from "../setup/Axios";
import { useQuery } from "react-query";

const GetAPIDetail = ({ url, key, slug, queryParams }) => {
  const { data, status, error } = useQuery(
    [key, slug],
    async () => {
      const res = await Axios.get(url, { params: queryParams });
      return await res.data;
    },
    {
      cacheTime: 30000,
    }
  );
  return {
    data: data,
    status: status,
    error: error,
  };
};

export default GetAPIDetail;
