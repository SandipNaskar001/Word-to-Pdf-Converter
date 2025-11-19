import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
  <div>
<Toaster position="top-right" reverseOrder={false} />
 <Navbar/>
 <Home/>
 <Footer/>
  </div>
  );
};

export default App;
