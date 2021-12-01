import React from 'react'
import './index.css'
import Creatable from 'react-select/creatable';

function Popup(props) {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={() => props.setTrigger(false)}>close</button>
                <h2 style={{"text-align":"center"}}>Edit Your Profile </h2>
                <form>
                        <div className="information">
                            <label>First Name   </label>
                            <input type="text" className="input-signup" placeholder="Update first name"/>
                        </div>

                        <div className="information">
                            <label>Last Name   </label>
                            <input type="text" className="input-signup" placeholder="Update last name" />
                        </div>

                        <div className="information">
                            <label>Email Address   </label>
                            <input type="email" className="input-signup" placeholder="Update email" />
                        </div>

                        <div className="information">
                            <label>Password   </label>
                            <input type="password" className="input-signup" placeholder="Update password" />
                        </div>

                        <div className="information">
                            <label>What is your gender?</label>
                                <Creatable options={gender}
                                    onChange={opt => console.log(opt.label, opt.value)}
                                />
                             <label>What are your interests?</label>
                                <Creatable options={interests}
                                    isMulti
                                    onChange={(opt, meta) => console.log(opt, meta)}
                                />
                            <label>What is your personality type?</label>
                                <Creatable options={personality}
                                    onChange={opt => console.log(opt.label, opt.value)}
                                />

                        </div>
                <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    ) : "";
}

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