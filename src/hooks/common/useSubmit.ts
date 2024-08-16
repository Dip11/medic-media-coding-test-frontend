import { MutationFunction, useMutation } from "react-query";
import { useToast } from "@chakra-ui/react";
import { UseSubmitProps } from "hooks/query/types";
import { useHandle401 } from "./useHandle401";
import { ApiErr } from "utils/api/types/ApiErr";

export function useSubmit<
  TData = unknown,
  TVariables = void,
  TContext = unknown
>(
  fn: MutationFunction<TData, TVariables>,
  params: UseSubmitProps<TData, TVariables, TContext> = {}
) {
  const {
    successToastText,
    toastOnError = true,
    onSuccess,
    onError,
    onSettled,
    onMutate,
  } = params;
  const toastIt = useToast();
  const handle401 = useHandle401();

  return useMutation<TData, ApiErr, TVariables, TContext>(fn, {
    onMutate,
    onError: (err, vars, context) => {
      if (err.status === 401) {
        handle401();
      } else {
        onError?.(err, vars, context);
        // eslint-disable-next-line no-console
        console.error(`${err.message}`);

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        toastOnError &&
          toastIt({
            status: "error",
            description: err.message,
          });
      }
    },
    onSuccess: (data, vars, context) => {
      onSuccess?.(data, vars, context);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      successToastText &&
        toastIt({ status: "success", description: successToastText });
    },
    onSettled,
  });
}
