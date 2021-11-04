import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Profile from './components/profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/view" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
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
        <Profile userID={-1} size={"full"}/>
      </div>
    </div>
  );
}

//We want to have a list of userID's to display and a button to iterate through them
//Everytime the button is pressed Explore() should be called again with
//a different userID passed to it's child component Profile
function Explore() {
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
function Gallery() {
  return (
    <div>
      <h1 style={{"text-align":"center"}}>Everyone you've matched with!</h1>
      <div style={{"text-align":"left"}}>
        <Link to="/" className="ret2">Return Home</Link>
      </div>
      <div className="gallery_wrapper" style={{"text-align":"center"}}>
        <div className="container">
          <Profile userID={-1} size={"half"}/>
          <Profile userID={-2} size={"half"}/>
          <Profile userID={-3} size={"half"}/>
          <Profile userID={-4} size={"half"}/>
          <Profile userID={-5} size={"half"}/>
          <Profile userID={-6} size={"half"}/>
          <Profile userID={-7} size={"half"}/>
          <Profile userID={-8} size={"half"}/>
          <Profile userID={-9} size={"half"}/>
          <Profile userID={-1} size={"half"}/>
          <Profile userID={-2} size={"half"}/>
          <Profile userID={-3} size={"half"}/>
          <Profile userID={-4} size={"half"}/>
          <Profile userID={-5} size={"half"}/>
          <Profile userID={-6} size={"half"}/>
          <Profile userID={-7} size={"half"}/>
          <Profile userID={-8} size={"half"}/>
          <Profile userID={-9} size={"half"}/>
          <Profile userID={-1} size={"half"}/>
          <Profile userID={-2} size={"half"}/>
          <Profile userID={-3} size={"half"}/>
          <Profile userID={-4} size={"half"}/>
          <Profile userID={-5} size={"half"}/>
          <Profile userID={-6} size={"half"}/>
          <Profile userID={-7} size={"half"}/>
          <Profile userID={-8} size={"half"}/>
          <Profile userID={-9} size={"half"}/>
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