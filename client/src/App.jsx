
import  { useContext } from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Settings from "./Pages/Settings/Settings";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Context } from "./context/Context";
import ImageCompression from "../src/Pages/ImageCompression/ImageCompression"
import ImageTagging from "../src/Pages/ImageTagging/ImageTagging"
import ImageTransform01 from "../src/Pages/ImageTransformation/ImageTransform01"
import ImageTransform02 from "../src/Pages/ImageTransformation02/ImageTransform02"
import Footer from "./components/Footer/Footer";



const App = () => {
  const {user} = useContext(Context)
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/register" element={user? <Home/> : <Register />} />

        <Route path="/login" element={user? <Home/> :<Login />} />

        <Route path="/settings" element={user?<Settings />: <Login/>} />


        <Route path="/image-compression" element={<ImageCompression />} />
        <Route path="/image-transform-01" element={<ImageTransform01 />} />
        <Route path="/image-transform-02" element={<ImageTransform02 />} />
        <Route path="/image-tagging" element={<ImageTagging />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;
