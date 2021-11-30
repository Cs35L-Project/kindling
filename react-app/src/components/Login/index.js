import React from 'react';
import Select from 'react-select';
import './index.css';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Creatable from 'react-select/creatable';
import kindling from "./image/kindling.png"
import kindling_mini from "./image/kindling_mini.png"
import lock from "./image/lock.png"
import profile from "./image/profile-user.png"

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

/* <Route path="/Reset" element={<ResetPassword/>} /> */

const LoginPage = props => {
    return (
        <div className="main">
            <div className = "sub-main">
                <div>
                    <div className="imgs">
                        <div className="container-image">
                            <img src={kindling} alt="kindling" className="kindling"/>
                        </div>
                    </div>
                    <div>
                        <h1>Sign In</h1>
                        <form>
                            <div>
                                <img src={profile} alt="profile" className="mini"/>
                                <input type="text" className="input-login" placeholder="Enter username"/>
                            </div>
                            <div className="second-input">
                                <img src={lock} alt="lock" className="mini"/>
                                <input type="password" className="input-login" placeholder="Enter password"/>
                            </div>
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="checkbox" id="customCheck1" />
                                <label className="checkbox" htmlFor="customCheck1">Remember me</label>
                            </div>
                            <div className="login-button">
                                <button type="submit">Submit</button>
                            </div>
                            <div className="link">
                                No account? <Link to="/Signup">Signup</Link>
                            </div>
                        </form>
                    </div>
            
            
            
            </div>
            </div>
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
];
const gender = [
    {label: "Male", value: 1},
    {label: "Female", value: 2},
    {label: "Nonbinary", value: 3},
    {label: "Prefer Not to Say", value: 4}
];

const Signup = props => {
    return (
        <div className="main">
            <div className = "signup_sub-main">
                <div>
                    <div className="imgs">
                        <div className="container-image">
                            <img src={kindling_mini} alt="kindling" className="kindling"/>
                        </div>
                    </div>
                        <h2>Don't Have an Account?</h2> 
                        <form>
                        <div className="information">
                            <label>First Name   </label>
                            <input type="text" className="input-signup" placeholder="Enter first name" />
                        </div>

                        <div className="information">
                            <label>Last Name   </label>
                            <input type="text" className="input-signup" placeholder="Enter last name" />
                        </div>

                        <div className="information">
                            <label>Email Address   </label>
                            <input type="email" className="input-signup" placeholder="Enter email" />
                        </div>

                        <div className="information">
                            <label>Password   </label>
                            <input type="password" className="input-signup" placeholder="Enter password" />
                        </div>

                        <div className="information">
                            <label>What is your gender?</label>
                                <Creatable options={gender}
                                    onChange={opt => console.log(opt.label, opt.value)}
                                />
                            <label>What are your hobbies?</label>
                                <Creatable options={hobbies}
                                    isMulti
                                    onChange={(opt, meta) => console.log(opt, meta)}
                                />
                            <label>What sports do you like?</label>
                                <Creatable options={sports}
                                    isMulti
                                    onChange={(opt, meta) => console.log(opt, meta)}
                                />
                            <label>What music do you like?</label>
                                <Creatable options={music}
                                    isMulti
                                    onChange={(opt, meta) => console.log(opt, meta)}
                                />
                            <label>What is your personality type?</label>
                                <Creatable options={personality}
                                    onChange={opt => console.log(opt.label, opt.value)}
                                />
                        </div>

                        <div className="login-button">
                            <button type="submit">Sign Up</button>
                        </div>
                        <p className="already-registered text-right">
                            Already registered? <a href="/">Sign in</a>
                        </p>
                        </form>
                    </div> 
            </div>
        </div>
    );
}

/* const ResetPassword = props => {
    return (
        <div className="reset-wrapper">
            <h1>Forgot Your Password?</h1>
                <form>
                    <label>
                        <p>Enter New Password</p>
                        <input type="resetpassword" className="form-control" placeholder="Enter new password"/>
                    </label>
                    <label>
                    <p>Please Re-Enter New Password</p>
                    <input type="confirmresetpassword" className="form-control" placeholder="Re-enter new password"/>
                </label> 
                </form>
                <div>
                    <Link to="/" className="btn btn-primary">Go Back</Link>
                </div>
        </div>
        
    );
} 

<p className="forgot-password text-right">
    Forgot <a href="/Reset">password?</a>
</p>
*/
