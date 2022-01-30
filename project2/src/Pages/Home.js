import { useEffect, useState } from "react";
import Header from "../Components/Header.component";
import Feed from "../Components/Feed.component";

const Home = () => {

    const [ user, setUser ] = useState(null);
    const [feed, setFeed] = useState();
    const token = localStorage.getItem("refToken")

    useEffect(() => {
        async function getData(){

            fetch("http://localhost:5000/api/user/accToken", {
              "method":"get",
              "headers":{
                "Authorization":`Bearer ${token}`
              }
            }).then(res => res.json()).then(data => {
                if(data.accessToken){
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
            setUser(user_data)

            const follower_posts_arr = await fetch("http://localhost:5000/api/post/followerPosts", {
                "method":"post",
                "headers":{
                    "content-type":"application/json"
                },
                "body":JSON.stringify({
                    token:`${localStorage.getItem("accToken")}`
                })
            })

            const follower_posts = await follower_posts_arr.json()

            if(follower_posts.data){
                setFeed()
            }
            else{
                setFeed(follower_posts);
            }
            console.log("This is the posts array", feed);

        }


        if(!localStorage.getItem("accToken")){
            return null;
        }
        else{
            getData();
        }
    }, [token])
    
    return(
        <div className="">
            {
                localStorage.getItem("accToken") ? <> {
                     user ? <Feed content={feed} user={user}/> : <></>
                }
                </>
                : <Header />
            }
        </div>
    )
}

export default Home