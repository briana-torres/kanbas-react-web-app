import { Navigate, Route, Routes } from "react-router";
import Account from "./Account";
import Courses from "./Courses";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";

export default function Kanbas() {
  return (
    <div id="wd-kanbas">
      <h1>Kanbas</h1>
      <table>
        <tr>
          <td valign="top">
            <KanbasNavigation />
          </td>
          <td>
            <Routes>
              <Route path="/" element={<Navigate to="Account" />} />
              <Route path="/Account/*" element={<Account />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/Courses/:cid/*" element={<Courses />} />
              <Route path="/Calendar" element={<div>Calendar</div>} />
              <Route path="/Inbox" element={<div>Inbox</div>} />
            </Routes>
          </td>
        </tr>
      </table>
    </div>
  );
}