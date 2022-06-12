import axios from "axios";
import { getCookie, removeCookie } from "./cookie";

type response = {
  status: boolean;
  data: object | null;
};

export const AuthProtect = async (): Promise<response> => {
  const token = getCookie("access_token");

  if (token) {
    try {
      const userInfo = await axios.get("http://localhost:3000/auth/protected", {
        headers: { Authorization: `Bearer ${token}` },
      });

      return {
        status: true,
        data: userInfo,
      };
    } catch (error) {
      removeCookie("access_token");
      window.location.reload();
      return {
        status: false,
        data: null,
      };
    }
  } else {
    return {
      status: false,
      data: null,
    };
  }
};
