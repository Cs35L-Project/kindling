import React, {useEffect, useState} from 'react'
import './index.css'
import Creatable from 'react-select/creatable';
import kindling_mini from "../Login/image/kindling_mini.png"
import UserService from '../../services/user.service';
import { queryFeed } from '../profile/helper';

function Popup(props) {
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [state, setState] = useState({
        selectedInterests: [],
    })
    
    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };

    const handleSubmission = () => {
        if(isFilePicked){
            const formData = new FormData();
            formData.append(
                "file",
                selectedFile,
                selectedFile.name
              );
              formData.append(
                  "body",
                  props.id
              );
              UserService.uploadAvatar(props.id,formData);
        }
        var request = require('request');  
        let form = {};
        console.log(state)
        var bcrypt = require("bcryptjs");
        if(state.username) form.username = state.username;  
        if(state.password) form.password = bcrypt.hashSync(state.password, 10);  
        if(state.firstName) form.firstName = state.firstName;
        if(state.lastName) form.lastName = state.lastName;  
        if(state.selectedInterests){
            const interests = [];
            for(var i=0;i<state.selectedInterests.length;i++) interests.push(state.selectedInterests[i]['label'])
            form.interests = interests;
            console.log(interests) 
        }  
        if(state.bio) form.bio = state.bio;

        request.put({url:`http://localhost:4000/api/users/${props.id}`, 
        form: form
        });
    };

    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-button" onClick={() => props.setTrigger(false)}>Close</button>
                <h2 style={{"text-align":"center"}}>Edit Your Profile </h2>
                <div className="kindling-image1">
                            <img src={kindling_mini} alt="kindling" className="kindling"/>
                </div>
                <div className="kindling-image2">
                            <img src={kindling_mini} alt="kindling" className="kindling"/>
                </div>
                <form>
                        <div className="information">
                            <label>First Name   </label>
                            <input type="text" className="input-signup" placeholder="Update first name"
                            onChange={(e) => setState({...state,firstName:e.target.value})} />
                        </div>

                        <div className="information">
                            <label>Last Name   </label>
                            <input type="text" className="input-signup" placeholder="Update last name"
                            onChange={(e) => setState({...state,lastName:e.target.value})} />
                        </div>

                        <div className="information">
                            <label>Email Address   </label>
                            <input type="email" className="input-signup" placeholder="Update email" 
                            onChange={(e) => setState({...state,username:e.target.value})}/>
                        </div>

                        <div className="information">
                            <label>Password   </label>
                            <input type="password" className="input-signup" placeholder="Update password" 
                            onChange={(e) => setState({...state,password:e.target.value})}/>
                        </div>

                        <div className="information">
                             <label>What are your interests?</label>
                                <Creatable options={interests}
                                    isMulti
                                    onChange={(opt, meta) => setState({...state,selectedInterests:opt})}
                                />
                            

                        </div>

                        <div className="information">
                                <label> Insert your bio:  </label>
                                    <input className="biography" type="text" name="text" 
                                    onChange={(e) => setState({...state,bio:e.target.value})}/>
                        </div>

                        <div className="image">
                            <label>Upload a photo of yourself  </label>
                            <input type="file" name="file" onChange={changeHandler} />
                        </div>


                <button className="submit-button" type="submit" onClick={handleSubmission}>Save Changes</button>
                </form>
            </div>
        </div>
    ) : "";
}

// function MeaningfulSearch(props) {
//     console.log("INIT")
//     const [state, setState] = useState({
//         query: [],
//     })
    
//     const handleSubmission = () => {
//         console.log("SUBMITTED")
//         var request = require('request');  
//         let form = {};
//         if(state.query){
//             const interests = [];
//             for(var i=0;i<state.selectedInterests.length;i++) interests.push(state.selectedInterests[i]['label'])
//             form.interests = interests;
//             console.log(interests) 
//         }  
        
//     };

//     return (props.trigger) ? (
//         <div className="popup">
//             <div className="popup-inner">
                
//                 <h2 style={{"text-align":"center"}}>Search by Interest </h2>
                
//                 <form>
//                         <div className="information">
//                              <label>Who do you want to search for?</label>
//                                 <Creatable options={interests}
//                                     isMulti
//                                     onChange={(opt, meta) => setState({query:opt})}
//                                 />
                            

//                         </div>
//                 <button className="submit-button" type="button" onClick={handleSubmission}>Save Changes</button>
//                 </form>
//             </div>
//         </div>
//     ) : "";
// }

const gender = [
    {label: "Male", value: 1},
    {label: "Female", value: 2},
    {label: "Nonbinary", value: 3},
    {label: "Prefer Not to Say", value: 4}
];

const interests = [
    { label: 'Basketball', value: 'Basketball'},
    { label: 'Soccer', value: 'Soccer'},
    { label: 'Baseball', value: 'Baseball'},
    { label: 'Tennis', value: 'Tennis'},
    { label: 'Volleyball', value: 'Volleyball'},
    { label: 'Dance', value: 'Dance'},
    { label: 'Gymnastics', value: 'Gymnastics'},
    { label: 'Football', value: 'Football'},
    { label: 'Cross Country', value: 'Cross Country'},
    { label: 'Hockey', value: 'Hockey'},
    { label: 'Golf', value: 'Golf'},
    { label: 'Swimming', value: 'Swimming'},
    { label: 'Cooking', value: 'Cooking'},
    { label: 'Traveling', value: 'Traveling'},
    { label: 'Sewing', value: 'Sewing'},
    { label: 'Video Games', value: 'Video Games'},
    { label: 'Eating', value: 'Eating'},
    { label: 'Pets', value: 'Pets'},
    { label: 'Reading/Writing', value: 'Reading/Writing'},
    { label: 'Arts and Crafts', value: 'Arts and Crafts'},
    { label: 'Technology', value: 'Technology'},
    { label: 'Gardening', value: 'Gardening'},
    { label: 'Socializing', value: 'Socializing'},
    { label: 'Photography', value: 'Photography'},
    { label: 'Health and Fitness', value: 'Health and Fitness'},
    { label: 'Anime and Manga', value: 'Anime and Manga'},
    { label: 'Alternative', value: 'Alternative'},
    { label: 'Anime', value: 'Anime'},
    { label: 'Blues', value: 'Blues'},
    { label: 'Classical', value: 'Classical'},
    { label: 'Country', value: 'Country'},
    { label: 'Disney', value: 'Disney'},
    { label: 'Hip-Hop/Rap', value: 'Hip-Hop/Rap'},
    { label: 'Indie', value: 'Indie'},
    { label: 'J-Pop', value: 'J-Pop'},
    { label: 'Jazz', value: 'Jazz'},
    { label: 'K-Pop', value: 'K-Pop'},
    { label: 'Latin', value: 'Latin'},
    { label: 'Metal', value: 'Metal'},
    { label: 'Pop', value: 'Pop'},
    { label: 'R&B/Soul', value: 'R&B/Soul'},
    { label: 'Rock', value: 'Rock'}
];

const personality = [
    { label: 'INTJ', value: 'INTJ'},
    { label: 'INTP', value: 'INTP'},
    { label: 'ENTJ', value: 'ENTJ'},
    { label: 'ENTP', value: 'ENTP'},
    { label: 'INFJ', value: 'INFJ'},
    { label: 'INFP', value: 'INFP'},
    { label: 'ENFJ', value: 'ENFJ'},
    { label: 'ENFP', value: 'ENFP'},
    { label: 'ISTJ', value: 'ISTJ'},
    { label: 'ISFJ', value: 'ISFJ'},
    { label: 'ESTJ', value: 'ESTJ'},
    { label: 'ESFJ', value: 'ESFJ'},
    { label: 'ISTP', value: 'ISTP'},
    { label: 'ISFP', value: 'ISFP'},
    { label: 'ESTP', value: 'ESTP'},
    { label: 'ESFP', value: 'ESFP'},
    { label: 'Not sure', value: 'Not sure'}
];

export default Popup
