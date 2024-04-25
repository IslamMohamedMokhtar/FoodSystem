import { Navigate, useNavigate } from "react-router-dom";
export default function ProtectedRoute({ auth, children }) {
    const navigate = useNavigate();
        if(auth === false){
            return <Navigate to="/"/>
        }
    return children;
}