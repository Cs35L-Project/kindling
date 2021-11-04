import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

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
    </div>
  );
}

function Explore() {
  return (
    <div>
      <h1 style={{"text-align":"center"}}>Explore Potential Matches!</h1>
      <div style={{"text-align":"left"}}>
        <Link to="/" className="ret">Return Home</Link>
      </div>
    </div>
  );
}

function Gallery() {
  return (
    <div>
      <h1 style={{"text-align":"center"}}>Everyone you've matched with!</h1>
      <div style={{"text-align":"left"}}>
        <Link to="/" className="ret2">Return Home</Link>
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