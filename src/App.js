import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Navbar } from "./components/Navbar";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Game } from "./pages/Game";
import { Summary } from "./pages/Summary";
import { HighScore } from "./pages/HighScore";

// Wrapper HOC
function Wrapper(Component) {
  return function WrappedComponent() {
    const navigate = useNavigate();
    return <Component navigate={navigate} />;
  };
}

// Make wrapped versions
const WrappedSignup = Wrapper(Signup);
const WrappedLogin = Wrapper(Login);
const WrappedHome = Wrapper(Home);
const WrappedGame = Wrapper(Game);
const WrappedSummary = Wrapper(Summary);

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>

          <Route path="/" element={<WrappedSignup />} />
          <Route path="/signup" element={<WrappedSignup />} />
          <Route path="/login" element={<WrappedLogin />} />
          <Route path="/home" element={<WrappedHome />} />
          <Route path="/game" element={<WrappedGame />} />
          <Route path="/summary" element={<WrappedSummary />} />
          <Route path="/highscore" element={<HighScore />} />

        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
