import { getRandomImage } from "@/apis/images";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useRandomImageQuery = () => {
  return useSuspenseQuery({
    queryKey: ["randomImage"],
    queryFn: getRandomImage,
    retry: 1,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}