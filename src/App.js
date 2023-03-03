import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header.js";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Perfil from "./pages/Perfil";

function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/@omarro" element={<Perfil />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/" end element={<Home />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
