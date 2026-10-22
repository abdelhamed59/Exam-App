import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../auth.api";
import type { ILoginFormValues } from "../../types/login";
import { useNavigate } from "react-router";
import useToken from "../../hooks/use-token";

export function useLogin() {
  const navigate = useNavigate();
  const { setToken } = useToken();

  return useMutation({
    mutationFn: (values: ILoginFormValues) => loginApi(values),

    onSuccess: (response) => {
      setToken(response.payload.token);

      const role = response.payload.user.role;

      if (role === "ADMIN" || role === "SUPER_ADMIN") {
        navigate("/dashboard/diplomas");
      } else {
        navigate("/");
      }
    },
  });
}