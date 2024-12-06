import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

export default function CourseProtectedRoute({ children }: { children: any }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  if (!currentUser) {
    return <Navigate to="/Kanbas/Account/Signin" />;
  }

  if (currentUser.role === "FACULTY" || currentUser.role === "ADMIN") {
    return children;
  }

  return children;
} 