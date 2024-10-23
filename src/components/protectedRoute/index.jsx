import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import NotPermitted from "./NotPermitted";

const RoleBaseRoute = (props) => {

    const isAdminRoute = window.location.pathname.startsWith('/admin'); //ktra xem co vao trang admin hay k
    const user = useSelector(state => state.account.user) // check role cua ng dung. lay user ra thong qua redux
  
    const userRole = user.role; // lay role
   
     // Debugging thông tin
     console.log("isAdminRoute >>", isAdminRoute);
     console.log("user >>", user);
     console.log("userRole >>", userRole);
     console.log("props.children >>", props.children);
 
     // Nếu role chưa được load
     if (!userRole) {
         return <div>Loading user role...</div>;
     }
 
     // Kiểm tra và render children
     if (isAdminRoute && userRole === 'ADMIN') {
         console.log("Rendering children...");
         return <>{props.children}</>;
     } else {
         console.log("Rendering NotPermitted...");
         return <NotPermitted />;
     }
    

}

const ProtectedRoute = (props) => {
    const isAuthenticated = useSelector(state => state.account.isAuthenticated)
    console.log("check auth>>",isAuthenticated)
    console.log('checl props protected route',props)
    return (
        <>
        {isAuthenticated === true ?
        <>
        <RoleBaseRoute>
        {props.children}
        </RoleBaseRoute>
        </>
        :
        <Navigate to='/login' replace />

        }
        </>
    )
}
// export default {ProtectedRoute,RoleBaseRoute};
export default ProtectedRoute;