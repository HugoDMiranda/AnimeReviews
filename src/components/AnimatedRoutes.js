import { Routes, Route, useLocation } from "react-router-dom";
// import AnimeReviews from "../views/AnimeReviews";
import Register from "../views/Register";
import Login from "../views/Login";
import Home from "../views/Home";
import { AnimatePresence } from "framer-motion";
import NewAnime from "../views/NewAnime";
import AnimePage from "../views/AnimePage";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        {/* <Route path="/AnimeReviews" element={<AnimeReviews />} /> */}
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/NewAnime" element={<NewAnime />} />
        {/* <Route path="/AnimePage/:animeName" element={<AnimePage />} /> */}
        <Route path="/AnimePage/:id" element={<AnimePage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
