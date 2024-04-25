import { Navigate } from "react-router-dom";
export default function ProtectedRoute({ auth, children }) {
        if(auth === false){
            return <Navigate to="/" exact={true}/>
        }
    return children;
}