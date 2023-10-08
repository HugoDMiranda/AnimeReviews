import "./sass/App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "./components/AnimatedRoutes.js";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { motion } from "framer-motion";

function App() {
  return (
    <Router>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 1 }}
      >
        <Nav />
        <div className="App">
          <AnimatedRoutes />
        </div>
        <Footer />
      </motion.div>
    </Router>
  );
}

export default App;
