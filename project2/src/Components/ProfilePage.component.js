import { useState } from "react";

const ProfilePage = ({profile}) => {

    const path = "http://localhost:5000/uploads/"+profile.profilePic.substring(8, profile.profilePic.length)
    const [ firstname, setFirstname ] = useState(profile.firstname)
    const [ lastname, setLastname ] = useState(profile.lastname)
    const [ username, setUsername ] = useState(profile.username)
    const [ email, setEmail ] = useState(profile.email)
    const [ gender, setGender ] = useState(profile.gender)

    const modifyUserProfile = () =>{
        const elem = document.getElementById("select")
        setGender(elem.options[elem.selectedIndex].value)

        if( firstname !== profile.firstname) updateProfile("firstname", firstname)
        if( lastname !== profile.lastname) updateProfile("lasname", lastname)
        if( username !== profile.username) updateProfile("username", username)
        if( email !== profile.email) updateProfile("email", email)
        if( gender !== profile.gender) updateProfile("gender", gender)
    }


    const updateProfile = async (changedField, dataChange) => {
        
        const res = await fetch("http://localhost:5000/api/user/updateProfile/"+changedField, {
            "method":"put",
            "headers":{
                "content-type":"application/json"
            },
            "body":JSON.stringify({
                "token":localStorage.getItem("accToken"),
                "data":dataChange
            })
        })
    }
    

    return (
        <div className="container">
            <div className="profile-page">
                <div style={{ backgroundImage:`url(${path})`, backgroundSize:"cover", backgroundRepeat:"no-repeat", backgroundPosition:"center", width:"300px", height:"300px", borderRadius:"50%" }}></div>
                <div>
                    <div className="d-flex  p-2 m-2">
                        <label htmlFor="" className="mx-2">Firstname</label>
                        <input type="text" className="form-control" name="" id="" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                    </div>
                    <div className="d-flex  p-2 m-2">
                        <label htmlFor="" className="mx-2">Lastname</label>
                        <input type="text" name="" id="" className="form-control" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                    </div>
                    <div className="d-flex  p-2 m-2">
                        <label htmlFor="" className="mx-2">Username</label>
                        <input type="text" name="" id="" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="d-flex  p-2 m-2">
                        <label htmlFor="" className="mx-2">Email</label>
                        <input type="text" name="" id="" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="d-flex p-2 m-2">
                        <label htmlFor="" className="mx-2">Gender</label>
                        <select className="form-control" id="select">
                            <option value={gender}>{gender}</option>
                            <option value={ gender === "M" ? "F" : "M" }>{ gender === "M" ? "F" : "M" }</option>
                        </select>
                    </div>
                </div>
            </div>
            <input type="file" className="btn btn-outline-light w-50 form-control" id="file"/>
            <button className="btn btn-success m-5" onClick={modifyUserProfile}>Update Profile</button>
        </div>
    )
}

export default ProfilePage;