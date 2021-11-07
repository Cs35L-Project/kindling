import "axios";
import './style.css'
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Profile = props => {      //props should be a unique id corresponding to the user
    const [profile, setProfile] = useState([{
        Name: "null", 
        Description: "null", 
        UID: props.userID, 
        User: props.root,
        Matches: [], 
        Potentials: []}]);
    // Below promise will only be functional once backend is serving data
    /*
    axios.get(`http://localhost:4000/api/?profile=${props.userID}`)
    .then((res) => {
        var response = res.data;
        let data = [];
        setProfile(data);
    })
    .catch((e) => {
        console.log(e);
        console.log("cannot connect to server");
    })
    */
    if(props.size=="full"){
        if(props.root){
            return (
                <div className="rectangle">
                    <div style={{"text-align":"left"}}><button onClick={() => props.toggleEdit({showForm:!props.state})}>Edit</button></div>
                    <h1>NAME</h1>
                    <h2>PICTURE</h2>
                    <h3>DESCRIPTION</h3>
                    <h4>USER ID: {props.userID}</h4>
                </div>
            );
        }
        else{
            return (
                <div className="rectangle">
                    <h1>NAME</h1>
                    <h2>PICTURE</h2>
                    <h3>DESCRIPTION</h3>
                    <h4>USER ID: {props.userID}</h4>
                </div>
            );
        }
    }
    else{
        return (
            <div className="square">
                <h1>NAME</h1>
                <h2>PICTURE</h2>
                <h3>USER ID: {props.userID}</h3>
            </div>
        );
    }
}
export default Profile;