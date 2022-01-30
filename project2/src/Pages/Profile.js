import { useState, useEffect } from "react";
import { useNavigate } from  "react-router-dom";
import ProfileNav from "../Components/ProfileNav.component";
import ProfilePage from "../Components/ProfilePage.component";
import Posts from "../Components/Posts.component";

const Profile = () => {
    const [destination, setDestination] = useState(false);
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState(null);
    const [postBody, setPostBody] = useState("");
    const [file, setFile] = useState("");
    const nav = useNavigate();

    useEffect(() => {
        let refToken = localStorage.getItem("refToken") 
        if(refToken === null) return nav("/login");
        async function getData(){
            const token = localStorage.getItem("refToken")
            fetch("http://localhost:5000/api/user/accToken", {
              "method":"get",
              "headers":{
                "Authorization":`Bearer ${token}`
              }
            }).then(res => res.json()).then(data => {
                if(data.accessToken){
                    console.log("The acc from profile", data)
                    localStorage.setItem("accToken", data.accessToken);
                }
            })

            const user_res = await fetch("http://localhost:5000/api/user/userInfo", {
                                        "method":"post",
                                        "headers":{
                                            "content-type" :"application/json"
                                        },
                                        "body":JSON.stringify({
                                            token:`${localStorage.getItem("accToken")}`
                                        })
                                    })
            const user_data = await user_res.json();
            console.log("use data from profile", user_data);
            setUser(user_data)
            const post_res = await fetch("http://localhost:5000/api/post/posts", {
                                        "method":"post",
                                        "headers":{
                                            "content-type" :"application/json"
                                        },
                                        "body":JSON.stringify({
                                            userId:`${user_data._id}`
                                        })
                                    })
            const post_data = await post_res.json();
            setPosts(post_data);
            console.log("post data from profile ",post_data)
        }

        getData();
    }, [setPosts, setUser, nav])

    console.log(file, postBody)

    const uploadPost = async () => {
        const res = await fetch("http://localhost:5000/api/post/uploadPost", {
            "method":"post",
            "headers":{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                "path":file,
                "postDetail":postBody,
                "token":localStorage.getItem("accToken")
            })
        })
        const data = await res.json();
        console.log(data)
    }

    return (
        <div>
            {
                user !== null ?
                <>
                <ProfileNav destination={destination} set={setDestination} />
                {
                destination ? 
                <ProfilePage profile={user} /> 
                : 
                <>
                <form className="w-50 mx-auto">
                    <textarea name="" id="" cols="30" rows="10" className="form-control" placeholder="Type Something" value={postBody} onChange={(e) => setPostBody(e.target.value)}></textarea>
                    <br />
                    <input type="file" className="form-control" id="" onChange={(e) => setFile(e.target.files[0])}/>
                    <br />
                    <button className="btn btn-outline-primary" onClick={uploadPost}>Post</button>
                </form>
                <br /><br />
                <Posts content={posts} user={user}/>
                </>
                }
                </>
                : <></>
            }
        </div>
    )
}

export default Profile;