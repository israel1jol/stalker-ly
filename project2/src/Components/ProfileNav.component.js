import { Link } from "react-router-dom";
import { FaCog, FaUserAlt } from "react-icons/fa";


const ProfileNav = ({destination, set}) => {

    return (
        <div className=" m-3">
            <div className="navbar navbar-secondary alert-secondary">
                <ul className="nav">
                    <li className="nav-item mx-4 nav-widget " onClick={(e) => set(prev => !prev)}><div className={destination ? "d-none" : "lin"}></div><FaUserAlt color="white" size="20"/>Posts</li>
                    <li className="nav-item mx-4 nav-widget"  onClick={(e) => set(prev => !prev)}><div className={destination ? "lin" : "d-none"}></div><FaCog color="white" size="20"/>My Profile</li>
                </ul>
            </div>
        </div>
    )
}

export default ProfileNav