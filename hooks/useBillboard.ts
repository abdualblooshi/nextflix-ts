import useSWR from "swr";
import { fetcher } from "@/libs/fetcher";

// This is a custom hook that will fetch a random movie from the database and return it to the client

const useBillboard = () => {
  const { data, error } = useSWR("/api/random", fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useBillboard;
