import { useMutation, useQueryClient } from "@tanstack/react-query";

const CustomUseMutation = (fn, queryKeyArr, callback) => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: fn,
    onSuccess: (data) => {
      if (queryKeyArr.length) {
        queryKeyArr.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey: [queryKey] });
        });
      }
      if (callback) return callback(data);
    },
  });
  return { mutate, isPending, isSuccess };
};

export default CustomUseMutation;
