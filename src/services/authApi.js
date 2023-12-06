import { API } from "../config";
import { useStateContext } from "../context/ContextProvider";

const getUserInfo = () => {
  const { user, setUser } = useStateContext();
  console.log("LANCEMENT");
  const token = window.localStorage.getItem("ACCESS_TOKEN");
  if (token) {
    const jwtData = API.get("/me").then(({ data }) => {
      console.log(data);
      setUser(data.data);
      return data;
    });
    // console.log(jwtData);
    return jwtData.data.data;
    // return jwtData.roles;
  } else {
    console.log("Rien trouvé");
    return "moi";
  }
};

export default {
  getUserInfo,
};
