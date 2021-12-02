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
            Interests: response.interests,
            UID: props.userID, 
            Image: image ? image.data:null,
        };
        setProfile(data);
    }
    if(profile.init){
        initProfile()
    }

    function toBinary(string) {
        if(!string) return "";
        const codeUnits = new Uint16Array(string.length);
        for (let i = 0; i < codeUnits.length; i++) {
          codeUnits[i] = string.charCodeAt(i);
        }
        return btoa(String.fromCharCode(new Uint8Array(codeUnits.buffer)));
      }

    if(props.size=="full"){
        return (
            <div className="rectangle">
                <h1>{profile.Name}</h1>
                <img src={`data:image/jpg;base64,${btoa(encodeURIComponent(profile.Image))}`} id={profile.Name}/>
                <h3>{profile.Description}</h3>
                <h4>{profile.Interests}</h4>
                <h5>USER ID: {props.userID}</h5>
            </div>
            );
    }
    else{
        return (
            <div className="square">
                <h1>{profile.Name}</h1>
                <h2>PICTURE</h2>
                <h3>USER ID: {props.userID}</h3>
            </div>
        );
    }
}
export default Profile;
