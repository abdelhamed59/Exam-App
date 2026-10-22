import { TOKEN_KEY } from "@/shared/constants/token.constant";

interface IUseTokenReturn {
  /**
   * Get the token from localStorage
   * @returns The token from localStorage
   */
  getToken: () => string | null;
  /**
   * Set the token in localStorage
   * @param token - The token to set
   */
  setToken: (token: string) => void;
  /**
   * Remove the token from localStorage
   */
  removeToken: () => void;
}

export default function useToken(): IUseTokenReturn {
  function getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  function setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  function removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  }

  return { getToken, setToken, removeToken };
}
