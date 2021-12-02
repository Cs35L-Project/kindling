import "axios";
import './style.css'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import UserService from '../../services/user.service';

const Profile = props => {      //props should be a unique id corresponding to the user
    //const [profile, setProfile] = useState();
    
    const [profile, setProfile] = useState({
        Name: null, 
        Description: null, 
        Interests: null,
        UID: props.userID,
        Image: null,
        init:true});
    
    const initProfile = async () => {
       let res = await axios.get(`http://localhost:4000/api/users/${props.userID}`);
       let image = await UserService.getAvatar(props.userID).catch((err) => { console.error(err); });
       var response = res.data;
       let data = {
            Name: response.fullName, 
            Description: response.bio, 
            Interests: response.interests.join(' '),
            UID: props.userID, 
            Image: image ? image.data:null,
        };
        setProfile(data);
    }
    if(profile.init){
        initProfile()
    }

    function to64(string) {
        if(!string) return;
        return Buffer.from(string).toString('base64');
      }

    if(props.size=="full"){
        return (
            <div className="rectangle">
                <h1>{profile.Name}</h1>
                <img src={`data:image/jpg;base64,${to64(profile.Image)}`} id={profile.Name}/>
                <h3>{profile.Description}</h3>
                <h4>{profile.Interests}</h4>
            </div>
            );
    }
    else{
        return (
            <div className="square">
                <h1>{profile.Name}</h1>
                <img src={`data:image/jpg;base64,${btoa(encodeURIComponent(profile.Image))}`} id={profile.Name}/>
            </div>
        );
    }
}
export default Profile;
