import { useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

export default function useAxios(url: string) {
  const coinApi = async () => {
    try {
      return (await axios.get(url)).data;
    } catch (error) {
      return console.error(error);
    }
  };
  const { isLoading, data } = useQuery<ICoin[]>(["allcoins"], coinApi);

  useEffect(() => {
    coinApi();
  }, []);
  return { isLoading, data };
}
