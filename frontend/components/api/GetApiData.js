import { useEffect, useState } from "react";

import Axios from "../setup/Axios";
import { useInfiniteQuery } from "react-query";

const GetApiData = ({ key, pageParam, queryParams, ...props }) => {
  // console.log(props);
  var url = pageParam;

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery(
    [key, queryParams],
    async ({ pageParam = url }) => {
      const res = await Axios.get(pageParam, {
        params: queryParams,
      });
      return res.data;
    },
    {
      getPreviousPageParam: (firstPage) => firstPage.previous ?? false,
      getNextPageParam: (lastPage) => lastPage.next ?? false,
    }
  );

  const loadNext = () => {
    if (hasNextPage) {
      if (!isFetchingNextPage) {
        fetchNextPage();
      }
    }
  };

  const [flatData, setFlatData] = useState([]);
  useEffect(() => {
    if (status === "success") {
      console.log("fetching page success");
      const flattenData = data.pages.flatMap((page) => [...page.results]);
      setFlatData(flattenData);
    }
  }, [data, isFetchingNextPage]);

  return {
    data: data,
    error: error,
    status: status,
    loadNext: loadNext,
    flatData: flatData,
    isFetching: isFetching,
    hasNextPage: hasNextPage,
    fetchNextPage: fetchNextPage,
    isFetchingNextPage: isFetchingNextPage,
    isFetchingPreviousPage: isFetchingPreviousPage,
    fetchPreviousPage: fetchPreviousPage,
    hasPreviousPage: hasPreviousPage,
  };
};

export default GetApiData;
