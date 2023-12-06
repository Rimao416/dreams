import { API } from "../config";
import { useStateContext } from "../context/ContextProvider";

export const getUserInfo = async (setUser) => {
  try {
    const response = await API.get("/me");
    const userData = response.data.data;
    setUser(userData);
    return userData;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};

export default {
  getUserInfo,
};


