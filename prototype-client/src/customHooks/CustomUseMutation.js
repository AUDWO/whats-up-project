import { useMutation, useQueryClient } from "@tanstack/react-query";

const CustomUseMutation = (fn, queryKey, callback) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: fn,
    onSuccess: () => {
      if (queryKey) {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        if (callback) return callback();
      }
    },
  });
  return { mutate };
};

export default CustomUseMutation;
