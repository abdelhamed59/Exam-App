import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { registerApi } from "../auth.api";
import type { ISignupCompleteRequest } from "../../types/signup";
import useToken from "../../hooks/use-token";

export function useRegister() {
  // Navigation
  const navigate = useNavigate();

  // Hooks
  const { setToken } = useToken();

  return useMutation({
    mutationFn: (values: ISignupCompleteRequest) => registerApi(values),
    onSuccess: (response) => {
      setToken(response.payload.token);

      navigate("/");
    },
  });
}
