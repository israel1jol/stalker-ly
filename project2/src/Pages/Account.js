import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Posts from "../Components/Posts.component";

const Account = () => {
    const [ acc, setAcc ] = useState();
    const [posts, setPosts] = useState();
    const [user, setUser] = useState();
    const [ isFollowing, setIsFollowing ] = useState(null);
    const location = useLocation();
    const path = location.pathname;
    const profile = path.substring(10, path.length);
    const token = localStorage.getItem("accToken")

    const change_follow_state = async () => {
        let following = user.following || null;
        let followers = acc.followers || null;
        let profileId = acc._id || null;
        let userId = user._id || null;
        
        if(following && followers && profileId && userId){
            if(!isFollowing){
                following.push(profileId)
                followers.push(userId)
            }
            else{
                following = following.filter(id => id !== profileId);
                followers = followers.filter(id => id !== userId);
            }
            const res = await fetch("http://localhost:5000/api/user/updateProfile/following", {
                "method":"put",
                "headers":{
                    "content-type" : "application/json"
                },
                "body":JSON.stringify({
                    token:token,
                    profileId:profileId, 
                    following:following,
                    followers:followers
                })
            })
            const data = await res.json();
            console.log("Follow state has been changed", data);
            setIsFollowing(prev => !prev);
        }

    }
    

    useEffect(() => {
        if(token){
            console.log("fetching...")
            fetch("http://localhost:5000/api/user/"+profile, {
                "method":"post",
                "headers":{
                    "content-type":"application/json"
                },
                "body":JSON.stringify({
                    "token":`${token}`
                })
            }).then(res => res.json()).then(data =>{
                if(data.user){
                    setUser(data.user);

                    const follow_state = data.user.following.includes(data.profile._id);
                    setIsFollowing(follow_state);
                }
                setAcc(data.profile);
                setPosts(data.posts);
                
            });
        }
        else{

        }
    }, [token, profile])

    const parseURL = (pic) => {
        return "http://localhost:5000/uploads/"+pic.substring(8, pic.length)
    }


    return(
        <div className="my-4">
            <div>
            {
                acc ? 
                <div className>
                    <div className="d-flex justify-content-center">
                        <div style={{ backgroundImage:`url(${parseURL(acc.profilePic)})`, backgroundSize:"contain", backgroundPosition:"center", width:"150px", height:"150px", borderRadius:"50%" }}></div>
                        <div>
                            <div className="display-6 mx-3">{acc.username}</div>
                            <div className="nav-link disabled text-center"><h5>{acc.email}</h5></div>
                        </div>
                    </div>
                    { user ? 
                    <div className="d-flex justify-content-center my-4">{ !isFollowing ? <div className="btn btn-outline-light" onClick={change_follow_state}>Follow</div> : <div className="btn btn-outline-success" onClick={change_follow_state}>UnFollow</div> }</div>
                    :
                    <></>
                    }
                    <div className="d-flex justify-content-center">
                        <div className="btn alert-disabled">{acc.followers.length} followers</div>
                        <div className="btn btn-light">{acc.following.length} following</div>
                    </div>
                </div>
                :
                <div className="display-5 m-1">
                    Sorry this User does not exist
                </div>
            }
            {
                posts ? 
                <Posts content={posts} user={user}/>
                :
                <></>
            }
            </div>
        </div>
    )
}

export default Account