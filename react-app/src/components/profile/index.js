import "axios";
import './style.css'
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Profile = props => {      //props should be a unique id corresponding to the user
    //const [profile, setProfile] = useState();
    
    const [profile, setProfile] = useState({
        Name: null, 
        Description: null, 
        Interests: null,
        UID: props.userID,
        init:true});
    
    // Below promise will only be functional once backend is serving data
    if(profile.init){
        axios.get(`http://localhost:4000/api/users/${props.userID}`)
        .then((res) => {
            var response = res.data;
            let data = {
                Name: response.fullName, 
                Description: response.bio, 
                Interests: response.interests,
                UID: props.userID, 
            };
            setProfile(data);
        })
        .catch((e) => {
            console.log(e);
            console.log("cannot connect to server");
        })
    }

    if(props.size=="full"){
        if(props.root){
            return (
                <div className="rectangle">
                    <div style={{"text-align":"left"}}><button onClick={() => props.toggleEdit({showForm:!props.state})}>Edit</button></div>
                    <h1>{profile.Name}</h1>
                    <h2>PICTURE</h2>
                    <h3>{profile.Description}</h3>
                    <h4>{profile.Interests}</h4>
                    <h5>USER ID: {props.userID}</h5>
                </div>
            );
        }
        else{
            return (
                <div className="rectangle">
                    <h1>{profile.Name}</h1>
                    <h2>PICTURE</h2>
                    <h3>{profile.Description}</h3>
                    <h4>{profile.Interests}</h4>
                    <h5>USER ID: {props.userID}</h5>
                </div>
            );
        }
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