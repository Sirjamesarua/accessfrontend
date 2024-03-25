import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

export default function AuthLayout() {
    const { token } = useStateContext();

    if (token) {
        return <Navigate to={"/home"} />
    }

    return (
        <div>
            <Outlet />
        </div>
    )
}
