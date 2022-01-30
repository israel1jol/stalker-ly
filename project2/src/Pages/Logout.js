import { useNavigate } from "react-router-dom";

const Logout = () => {
    const nav = useNavigate();

    const logoutUser = () => {
        localStorage.removeItem("refToken");
        localStorage.removeItem("accToken");

    }

    return(
        <>
        <div className="container-fluid">
            <form action="/login" method="get" onSubmit={logoutUser()}>
                <input type="submit" className="btn btn-primary" value="Proceed to logout"/>
            </form>
        </div>
        </>
    )
}

export default Logout;