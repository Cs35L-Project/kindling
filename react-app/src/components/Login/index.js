import React, { useState } from 'react';
import Select from 'react-select';
import './index.css';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Creatable from 'react-select/creatable';

export default function Login() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage/>} />
                <Route path="/Signup" element={<Signup/>} />
            </Routes>
        </BrowserRouter> 
    );
}

const LoginPage = props => {
    return (
        <div className="login-wrapper">
            <h1>Welcome Back! Log In</h1>
            <form>
                <label>
                    <p>Username</p>
                    <input type="text" className="form-control" placeholder="Enter username"/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" className="form-control" placeholder="Enter password"/>
                </label>
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
                <div>
                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                    <p className="forgot-password text-right">
                        Forgot <a href="#">password?</a>
                    </p>
                </div>
                <div>
                    <Link to="/Signup" className="btn btn-primary">Signup</Link>
                </div>
            </form>
        </div>
    );
}

const sports = [
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
];
const hobbies = [
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
    { label: 'Anime and Manga', value: 'Anime and Manga'}
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
const music = [
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
    { label: 'Rock', value: 'Rock'},
]

const Signup = props => {
    const [state, setState] = useState({
        selectedHobbies: [],
        selectedSports: [],
        selectedMusic: [],
        selectedPersonality: []
    })

    let saveData = () => {
        const interests = [];
        for(var i=0;i<state.selectedHobbies.length;i++) interests.push(state.selectedHobbies[i]['label'])
        for(var i=0;i<state.selectedMusic.length;i++) interests.push(state.selectedMusic[i]['label'])
        for(var i=0;i<state.selectedPersonality.length;i++) interests.push(state.selectedPersonality[i]['label'])
        for(var i=0;i<state.selectedSports.length;i++) interests.push(state.selectedSports[i]['label'])
        
        var request = require('request');    
        request.post({url:'http://localhost:4000/api/users', 
        form: {
            username: state.username,
            password: state.password,
            firstName: state.firstName,
            lastName: state.lastName,
            interests: interests,
        }
        });
    }
    return (
        <form onSubmit={saveData}>
                <h3>Don't Have an Account?</h3>

                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" id="firstName" className="form-control" placeholder="Enter first name"
                     onChange={(e) => setState({...state,firstName:e.target.value})}/>
                </div>

                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" id="lastName" className="form-control" placeholder="Enter last name" 
                     onChange={(e) => setState({...state,lastName:e.target.value})}/>
                </div>

                <div className="form-group">
                    <label>Gender</label>
                    <button type="radio" value="Male" name="gender"/>Male
                    <button type="radio" value="Female" name="gender"/>Female
                    <button type="radio" value="Nonbinary" name="gender"/>Nonbinary
                    <button type="radio" value="Prefer Not to Say" name="gender"/>Prefer Not to Say
                </div>

                
                <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" id="username" className="form-control" placeholder="Enter email" 
                     onChange={(e) => setState({...state,username:e.target.value})}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" id="password" className="form-control" placeholder="Enter password" 
                     onChange={(e) => setState({...state,password:e.target.value})}/>
                </div>

                <div className="form-group">
                    <label>What are your hobbies?</label>
                        <Creatable options={hobbies}
                            isMulti
                            onChange={(opt, meta) => setState({...state,selectedHobbies:opt})}
                        />
                    <label>What sports do you like?</label>
                        <Creatable options={sports}
                            isMulti
                            onChange={(opt, meta) => setState({...state,selectedSports:opt})}
                        />
                    <label>What music do you like?</label>
                        <Creatable options={music}
                            isMulti
                            onChange={(opt, meta) => setState({...state,selectedMusic:opt})}
                        />
                    <label>What is your personality type?</label>
                        <Creatable options={personality}
                            isMulti
                            onChange={(opt, meta) => setState({...state,selectedPersonality:opt})}
                        />
                </div>

                <button type="button" onClick={saveData} className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/">Sign in?</a>
                </p>
            </form>
    );
}




