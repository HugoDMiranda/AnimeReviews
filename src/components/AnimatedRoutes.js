import { Routes, Route, useLocation } from "react-router-dom";
// import AnimeReviews from "../views/AnimeReviews";
import Register from "../views/Register";
import Login from "../views/Login";
import Home from "../views/Home";
import { AnimatePresence } from "framer-motion";
import NewAnime from "../views/NewAnime";
import AnimePage from "../views/AnimePage";
import User from "../views/User";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/NewAnime" element={<NewAnime />} />
        <Route path="/AnimePage/:id" element={<AnimePage />} />
        <Route path="/User" element={<User />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
