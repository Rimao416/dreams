import {Navigate, Outlet} from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import {useSelector} from "react-redux"
export default function GuestLayout() {
//   const { user, token } = useStateContext();
  const { user, token } = useSelector(state=>state.authReducer);
  console.log(token)


  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <div id="guestLayout">
      <Outlet />
    </div>
  );
}