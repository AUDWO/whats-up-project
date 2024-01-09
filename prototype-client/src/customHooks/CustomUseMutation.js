import { useMutation, useQueryClient } from "@tanstack/react-query";

const CustomUseMutation = (fn, queryKeyArr, callback) => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: fn,
    onSuccess: () => {
      if (queryKeyArr.length) {
        queryKeyArr.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey: [queryKey] });
        });
        if (callback) return callback();
      }
    },
  });
  return { mutate, isPending, isSuccess };
};

export default CustomUseMutation;
