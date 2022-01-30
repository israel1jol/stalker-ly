import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Discover = () => {
    const [profiles, setProfiles] = useState();
    const [user, setUser] = useState();
    useEffect(() => {
            fetch("http://localhost:5000/api/user/allUsers", {
                "method":"post",
                "headers":{
                    "content-type":"application/json"
                },
                "body":JSON.stringify({
                    "token":`${localStorage.getItem("accToken")}`
                })
            }).then(res => res.json()).then(data => {
                setData(data)
            });
    }, [])

    const setData = (data) => {
        const following = data.client_profile[0].following;
        const all_accounts  = data.allUsers;
        let acceptable = all_accounts.filter(acc => !following.includes(acc._id));
        acceptable = acceptable.filter(acc => acc._id !== data.client_profile[0]._id);
        setProfiles(acceptable)
        setUser(data.client_profile[0])
        console.log("These are okay", acceptable)
    }

    const parseURL = (pic) => {
        return "http://localhost:5000/uploads/"+pic.substring(8, pic.length)
    }

    const checkFollowStatus = (profile) =>{
        return profile.following.includes(user._id);
    }

    return(
        <div className="m-5">
            <div>
            {
                profiles ? profiles.map(profile => (
                    <div className="user-profile">
                        <div className="profile-page">
                            <div>
                                 <div style={{backgroundImage:`url(${parseURL(profile.profilePic)})`, backgroundSize:"cover", backgroundPosition:"center",backgroundRepeat:"no-repeat" ,width:"150px", height:"150px", borderRadius:"50%"}}></div>
                                <Link to={"/discover/"+profile.username} className="btn btn-primary m-3">View Profile</Link>
                            </div>
                           
                            <div>
                                <div className="display-6">{profile.username}</div>
                            </div>
                        </div>
                        { user ? <>{ checkFollowStatus(profile) ? <span className="custom-badge">Follows You</span> : null} </>: <></> }
                        
                    </div>
                ))
            :
            <></>
            }
            </div>
        </div>
    )
}

export default Discover