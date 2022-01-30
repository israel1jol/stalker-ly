const Feed = ({content, user}) => {


    const normalize = (url) =>{
        const path = url.substring(8, url.length);
        const file = "http://localhost:5000/uploads/"+path;
        return file
    }

    const check_like_state = (post) => {
        console.log("hoe many likes")
        return post.likes.includes(user._id);
        
    }

    const likePost = async (post) => {
        const res = await fetch("http://localhost:5000/api/post/updatePostLikes/"+post._id, {
            "method":"put",
            "headers":{
                "content-type":"application/json"
            },
            "body":JSON.stringify({
                data:user._id,
                token:localStorage.getItem("accToken")
            })
        })
    }



    return(
        <>
        <div>

            <div className="container">
                <div className="nav-link disabled cs-1">Feed</div>
                <hr color="grey"/>
            </div>

            <div className="w-50 mx-auto">
                    <textarea name="" id="" cols="30" rows="10" className="form-control" placeholder="Type Something"></textarea>
                    <br />
                    <input type="file" className="form-control" id="" />
                    <br />
                    <button className="btn btn-outline-primary">Post</button>
            </div>
            
            {
                content ? content.feed.map((posts, ind) => (
                    <div key={ind} className="w-75 mx-auto">
                        {
                            posts.map((post, i) => (
                                <div key={i}>
                                    <div className="post-box">
                                        <div className="form-group">
                                            <div className="d-flex">
                                                <div>{content.user[ind].username}</div>
                                                <div className=" mx-1"><div style={{ backgroundImage:`url(${normalize(content.user[ind].profilePic)})`,backgroundSize:"cover",  width:"30px", height:"30px", borderRadius:"50%" }}></div></div>
                                            </div>
                                            <br />
                                            <div style={{backgroundImage:`url(${normalize(post.img)})`, width:"200px", height:"200px", margin:"auto", backgroundPosition:"center" ,backgroundSize:"contain", backgroundRepeat:"no-repeat"}}></div>
                                            <div className="lead text-center">{post.postBody}</div>
                                        </div>
                                        <br />
                                        <br />
                                        <form className="d-flex" action="/" onSubmit={() =>  likePost(post) }>
                                            <input type="submit" className={check_like_state(post) ? "btn btn-danger" : "btn btn-success"} value={check_like_state(post) ? "unlike" : "like"}/>
                                            <div className="special-font-2 m-2">{ post.likes.length }</div> 
                                        </form>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ))
            :
            <div className="vh-100 d-flex justify-content-center align-items-center cs-1">
                You aren't following anybody yet
            </div> 
            }
        </div>
        </>
    )
}

export default Feed