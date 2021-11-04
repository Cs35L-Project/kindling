import "axios";
import './style.css'
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Profile = props => {      //props should be a unique id corresponding to the user
    const [profile, setProfile] = useState([{Name: "null", Description: "null", UID: -1, Matches: [], Potentials: []}]);

    // Below promise will only be functional once backend is serving data
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
    if(props.size=="full"){
        return (
            <div className="rectangle">
                <h1>NAME</h1>
                <h2>PICTURE</h2>
                <h3>DESCRIPTION</h3>
            </div>
        );
    }
    else{
        return (
            <div className="square">
                <h1>NAME</h1>
                <h2>PICTURE</h2>
            </div>
        );
    }
}
export default Profile;