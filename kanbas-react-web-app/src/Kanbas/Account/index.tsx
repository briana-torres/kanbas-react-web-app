import { Navigate, Route, Routes } from "react-router";
import AccountNavigation from "./Navigation";
import Profile from "./Profile";
import Signin from "./Signin";
import Signup from "./Signup";
export default function Account() {
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
              <Route path="/" element={<Navigate to="Signin" />} />
              <Route path="Signin" element={<Signin />} />
              <Route element={<Profile />} path="Profile" />
              <Route element={<Signup />} path="Signup" />
            </Routes>
          </td>
        </tr>
      </table>
    </div>
  );
}