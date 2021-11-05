import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Profile from './components/profile';
import React, { useState, useEffect } from 'react';

/*
class App extends Component{
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/view" element={<Gallery />} />
        </Routes>
      </BrowserRouter>
    )
  };
}
*/

function App() {
  const [state,setState] = useState({ID:-5})  //ID needs to be set by the login callback
  console.log(state.ID);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home userID={state.ID}/>} />
        <Route path="/explore" element={<Explore userID={state.ID}/>} />
        <Route path="/view" element={<Gallery userID={state.ID}/>} />
      </Routes>
    </BrowserRouter>
  );
}


const Home = props => {
  return (
    <div>
      <h1 style={{"text-align":"center"}}>Home Page</h1>
      <div style={{"text-align":"left"}}>
        <Link to="/explore" className="explore_link">Explore!</Link>
      </div>
      <div style={{"text-align":"right"}}>
        <Link to="/view" className="view_link">View Matches!</Link>
      </div>
      <div className="profile_wrapper" style={{"text-align":"center"}}>
        <Profile userID={props.userID} size={"full"}/>
      </div>
    </div>
  );
}

//We want to have a list of userID's to display and a button to iterate through them
//Everytime the button is pressed Explore() should be called again with
//a different userID passed to it's child component Profile
const Explore = props => {
  let id = props.userID; 
  //TODO: Populate list of userID's to display to our user
  //TODO: Maintain additional state "index" that holds the current index 
  //in the list of new people to show that we are currently displaying to the user
  return (               
    <div>
      <h1 style={{"text-align":"center"}}>Explore Potential Matches!</h1>
      <div style={{"text-align":"left"}}>
        <Link to="/" className="ret">Return Home</Link>
      </div>
      <div className="explore_profile_wrapper" style={{"text-align":"center"}}>
        <Profile userID={-2} size={"full"}/>
      </div>
    </div>
  );
}

//We want to display the entire list of userID's associated with the current
//user's matches in a grid (that you can scroll through if too big)
//Clicking on an icon in this grid should bring up that user's complete profile
//on a separate page (could be home)
const Gallery = props => {
  let id = props.userID; 
  //TODO: Populate list of userID's to display to our user
  //create list of <Profile> components to pass to <div className="container">
  
  // ### STAND IN FOR API Query  (Will want to move this whole section to parent component eventually for efficiency)
  
  var matchesDummy = Array.from({length: 27}, () => Math.floor(Math.random() * 100000));
  let data = [];
  for (var i=0;i<matchesDummy.length;i++){
    console.log(i);
    data.push(
      <Profile userID={matchesDummy[i]} size={"half"}/>
    );
  }
  // these should eventually be passed to Gallery by App
  const [matches, setMatches] = useState([data]);
  // ### END API QUERY
  return (
    <div>
      <h1 style={{"text-align":"center"}}>Everyone you've matched with!</h1>
      <div style={{"text-align":"left"}}>
        <Link to="/" className="ret2">Return Home</Link>
      </div>
      <div className="gallery_wrapper" style={{"text-align":"center"}}>
        <div className="container">
          {matches}
        </div>
      </div>
    </div>
  );
}


/*
        <Route path="users/*" element={<Users />} />
function Users() {
  /* All <Route path> and <Link to> values in this
     component will automatically be "mounted" at the
     /users URL prefix since the <Users> element is only
     ever rendered when the URL matches /users/*
  #END COMMENT HERE
  return (
    <div>
      <nav>
        <Link to="me">My Profile</Link>
      </nav>

      <Routes>
        <Route path="/" element={<UsersIndex />} />
        <Route path=":id" element={<UserProfile />} />
        <Route path="me" element={<OwnUserProfile />} />
      </Routes>
    </div>
  );
}
*/

export default App;