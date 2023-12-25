import { useQuery } from "@tanstack/react-query";

const CustomUseQuery = (key, fn) => {
  const { data, isLoading } = useQuery({ queryKey: [key], queryFn: fn });
  return { data, isLoading };
};

export default CustomUseQuery;
