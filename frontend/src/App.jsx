// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useGoogleAuth from "./hooks/useGoogleAuth";
import LoginPage from "./components/LoginPage";
import CustomNavbar from "./components/Navbar";
import MyTodos from "./components/MyTodos";
import TodosList from "./components/TodosList";

const App = () => {
  const { profile, login, logOut, error } = useGoogleAuth();
  return (
    <Router>
      <div>
        {profile ? (
          <>
            <CustomNavbar profile={profile} logOut={logOut} />
            <div className="container">
              <h1 className="mt-5 mb-5 text-center">
                <b>The Ultimate Todos of Champions</b>
              </h1>
              <Routes>
                <Route path="/" element={<TodosList />} />
                <Route
                  path="/my-todos"
                  element={<MyTodos userId={profile.id} />}
                />
              </Routes>
            </div>
          </>
        ) : (
          <LoginPage login={login} error={error} />
        )}
      </div>
    </Router>
  );
};

export default App;
