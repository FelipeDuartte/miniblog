import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Dashboard from "./Dashboard/Dashboard";
import CreatPost from "./pages/Createpost/CreatPost";
// CSS
import "./App.css";
// Components
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Search from "./pages/search/Search";
import Post from "./pages/post/Post";
import Editpost from "./pages/EditPost/Editpost";
// Hooks
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication";
function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();
  const loadingUser = user === undefined;
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Nav />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/search" element={<Search />} />
              <Route path="/posts/:id" element={<Post />} />
              <Route
                path="/Login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/Register"
                element={!user ? <Register /> : <Navigate to="/" />}
              />
              <Route
                path="/Dashboard"
                element={user ? <Dashboard /> : <Navigate to="/Login" />}
              />
              <Route
                path="/Post/CreatePost"
                element={user ? <CreatPost /> : <Navigate to="/Login" />}
              />
              <Route
                path="/posts/edit/:id"
                element={user ? <Editpost /> : <Navigate to="/Login" />}
              />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
