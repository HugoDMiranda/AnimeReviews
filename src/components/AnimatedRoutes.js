import { Routes, Route, useLocation } from "react-router-dom";
import WrapperRegister from "../views/Register";
import Login from "../views/Login";
import WrapperHome from "../views/Home";
import { AnimatePresence } from "framer-motion";
import NewAnime from "../views/NewAnime";
import AnimePage from "../views/AnimePage";
import WrapperUser from "../views/User";
import WrapperLogin from "../views/Login";
import WrapperNewAnime from "../views/NewAnime";
import WrapperAnimePage from "../views/AnimePage";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/Register" element={<WrapperRegister />} />
        <Route path="/Login" element={<WrapperLogin />} />
        <Route path="/" element={<WrapperHome />} />
        <Route path="/NewAnime" element={<WrapperNewAnime />} />
        <Route path="/AnimePage/:id" element={<WrapperAnimePage />} />
        <Route path="/User" element={<WrapperUser />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
