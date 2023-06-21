import "./sass/App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "./components/AnimatedRoutes.js";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Nav />
      <div className="App">
        <AnimatedRoutes />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
