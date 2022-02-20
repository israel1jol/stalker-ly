const Posts = ({content, user}) => {
    const normalize = (url) =>{
        const path = url.substring(8, url.length);
        const file = "http://localhost:5000/uploads/"+path;
        return file
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

    const check_like_state = (post) => {
        console.log(post.likes)
        return post.likes.includes(user._id);
        
    }

    return(
        <div>
            <div className="w-75 mx-auto">
                <br />
                <div>
                { content ?
                    content.map((post, i) => (
                        <div  key={i} className="post-box">
                            <div className="form-group">
                                <div style={{backgroundImage:`url(${normalize(post.img)})`, width:"250px", height:"250px", margin:"auto", backgroundSize:"cover", backgroundRepeat:"no-repeat"}}></div>
                                <hr />
                                <div className="lead text-center">{post.postBody}</div>
                                <br />
                                <form className="d-flex" action="/profile" onSubmit={() =>  likePost(post) }>
                                        <input type="submit" className={check_like_state(post) ? "btn btn-danger" : "btn btn-success"} value={check_like_state(post) ? "unlike" : "like"}/>
                                        <div className="special-font-2 m-2">{ post.likes.length }</div> 
                                </form>
                            </div>
                        </div>
                    ))
                    : <></>
                }
            </div>
            </div>
        </div>
    )
}

export default Posts