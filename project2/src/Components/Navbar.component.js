import { FaPhoneSlash, FaHome, FaUserPlus, FaCog } from "react-icons/fa";
import { Link} from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const [ pic, setPic ] = useState();
    const [user, setUser] = useState(null);
  
    const nav = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("refToken")
        if(token === null){
            return;
          }
          else{
            console.log("hey")
            fetch("http://localhost:5000/api/user/accToken", {
              "method":"get",
              "headers":{
                "Authorization":`Bearer ${token}`
              }
            }).then(res => res.json()).then(data => {
              if(data.error){
                localStorage.removeItem("refToken");
              }
              else{
                console.log("This is the access token from the nav", data);
                localStorage.setItem("accToken", data.accessToken);
              }
            })

            fetch("http://localhost:5000/api/user/userInfo", {
            "method":"post",
            "headers":{
                "content-type":"application/json"
            },
            body:JSON.stringify({
            token:`${localStorage.getItem("accToken")}`
            })
        }).then(res => res.json()).then(data => {
              if(data.error){
                localStorage.removeItem("refToken");
                localStorage.removeItem("accToken");
                return nav("/login")
              }
              console.log("This is user data from the nav", data)
                setUser(data);
                const path = "http://localhost:5000/uploads/"+data.profilePic.substring(8, data.profilePic.length)
                setPic(path);
            })
          }

    }, [setUser, nav])
    
    return(
        <div className="navbar navbar-light bg-light align-items-center">
            <div className="d-flex align-items-center">
              <div className="navbar-brand px-2 d-flex"><FaPhoneSlash size="40"/> <h3>Stalkerly</h3> </div>
              <div className="nav-item"><Link to="/" className="nav-link"><FaHome size="20" color="grey"/></Link></div>
              <div className="nav-item"><Link to="/discover" className="nav-link"><FaUserPlus size="20" color="grey"/></Link></div>
              <div className="nav-item"><Link to="/profile" className="nav-link"><FaCog size="20" color="grey"/></Link></div>
            </div>
            
            <div>
                {user === null ? <ul className="nav">
                    <li className="nav-item"><Link to='/register' className="btn btn-outline-secondary rounded mx-2">Sign Up</Link></li>
                    <li className="nav-item"><Link to='/login' className="btn btn-secondary rounded mx-2">Login</Link></li>
                </ul> :
                <ul className="nav">
                    <li className="nav-item mx-1"><div style={{ backgroundImage:`url(${pic})`,backgroundSize:"cover",  width:"50px", height:"50px", borderRadius:"50%" }}></div></li>
                    <li className="nav-item special-font-2 mx-1">{user.username}</li>
                    <li className="nav-item mx-1"><Link to="/logout" className="nav-link btn btn-outline-secondary text-black">Logout</Link></li>
                </ul>
                }
            </div>
        </div>
    )
}

export default Navbar;