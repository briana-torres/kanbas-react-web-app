import { Navigate, Route, Routes } from "react-router";
import AccountNavigation from "./Navigation";
import Profile from "./Profile";
import Signin from "./Signin";
import Signup from "./Signup";
import { useSelector } from "react-redux";
import Users from "./Users";
export default function Account() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div>
      <h2>Account</h2>
      <table>
        <tr>
          <td valign="top">
            <AccountNavigation />
          </td>
          <td>
            <Routes>
              <Route path="/" element={<Navigate to={currentUser ? "/Kanbas/Account/Profile" : "/Kanbas/Account/Signin"} />} />
              <Route path="Signin" element={<Signin />} />
              <Route element={<Profile />} path="Profile" />
              <Route element={<Signup />} path="Signup" />
              <Route path="/Users" element={<Users />} />
              <Route path="/Users/:uid" element={<Users />} />
            </Routes>
          </td>
        </tr>
      </table>
    </div>
  );
}