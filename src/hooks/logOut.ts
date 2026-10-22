import useToken from "@/features/auth/hooks/use-token";
import { useNavigate } from "react-router";

export default function useLogout() {
  const navigate = useNavigate();
  const { removeToken } = useToken();

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  return { handleLogout };
}