import './App.css';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';
import Profile from './components/profile';
import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Popup from './components/Popup'

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
  // Add token for user login authentication
  const [token, setToken] = useState();

  if(!token) {
    return <Login setToken={setToken} />
  }
  
  var potentialsDummy = Array.from({length: 16}, () => Math.floor(Math.random() * 100000));
  var matchesDummy = Array.from({length: 48}, () => Math.floor(Math.random() * 100000));
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home userID={state.ID}/>} />
        <Route path="/explore" element={<Explore userID={state.ID} potentialsDummy={potentialsDummy}/>} />
        <Route path="/view" element={<Gallery userID={state.ID} matchesDummy={matchesDummy}/>} />
        <Route path="/view/:id" element={<View/>} />
      </Routes>
    </BrowserRouter>
  );
}

function View(){
  const {id} = useParams();
  return (
    <div>
      <h1 style={{"text-align":"center"}}>View User {id}'s profile</h1>
      <div style={{"text-align":"left"}}>
        <Link to="/view" className="view_link">Back to Matches</Link>
      </div>
      <div className="profile_wrapper" style={{"text-align":"center"}}>
        <Profile userID={id} size={"full"}/>
      </div>
    </div>
  );
}
const Home = props => {
  const [state,setState] = useState({showForm:false})
  const [buttonPopup, setButtonPopup] = useState(false);
  return (
    <div>
      <h1 style={{"text-align":"center"}}>Home Page</h1>
      <div style={{"text-align":"left"}}>
        <Link to="/explore" className="explore_link">Explore!</Link>
      </div>
      <div style={{"text-align":"right"}}>
        <Link to="/view" className="view_link">View Matches!</Link>

      </div>
        <button onClick={() => setButtonPopup(true)}>Edit</button>
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        </Popup>
      <div>



      </div>
      <div className="profile_wrapper" style={{"text-align":"center"}}>
        <Profile userID={props.userID} size={"full"} root={true} toggleEdit={setState}/>
      </div>
  
    </div>
  );
}

//We want to have a list of userID's to display and a button to iterate through them
//Everytime the button is pressed Explore() should be called again with
//a different userID passed to it's child component Profile
const Explore = props => {
  let id = props.userID; 
  const [state,setState] = useState({index:parseInt(Math.floor(Math.random() * props.potentialsDummy.length)),toggle:false});
  const leftSwipe = () => {
    props.potentialsDummy.splice(state.index,1); //Delete that user from their list
    setState({'index':parseInt(Math.floor(Math.random() * props.potentialsDummy.length)),'toggle':!state.toggle});
  }
  const rightSwipe = () => {
    //TODO: Communicate to backend that we 'liked' this user
    setState({'index':parseInt(Math.floor(Math.random() * props.potentialsDummy.length))});
  }
  const exhaustedOptions = () => {
    return (
      <div className="rectangle">
        <h1>Oh no! You've run out of people to explore. Try refreshing the page</h1>
      </div>
    );
  }
  return (               
    <div>
      <h1 style={{"textAlign":"center"}}>Explore Potential Matches!</h1>
      <div style={{"textAlign":"left"}}>
        <Link to="/" className="ret">Return Home</Link>
      </div>
      <div className="explore_profile_wrapper" style={{"textAlign":"center"}}>
        <button onClick={leftSwipe}>X</button>
        {props.potentialsDummy.length>0 ? <Profile userID={props.potentialsDummy[state.index]} size={"full"}/> : exhaustedOptions()}
        <button onClick={rightSwipe}>Next</button>
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
  let matchesDummy = props.matchesDummy;
  let data = [];
  for (var i=0;i<matchesDummy.length;i++){
    console.log(i);
    let routeString = "/view/"+matchesDummy[i].toString();
    data.push(
      <Link to={routeString}>
      <Profile userID={matchesDummy[i]} size={"half"}/>
      </Link>
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
