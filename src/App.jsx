import { useEffect, useState } from "react";
import "./App.css";
import "./assets/Fonts/stylesheet.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./Components/Header/Header";
import HomePage from "./Pages/HomePage";
import OfferPage from "./Pages/OfferPage";
import SearchPage from "./Pages/SearchPage";
import PageNotFound from "./Pages/PageNotFound";
import OfferPage2 from "./Pages/OfferPage2";
// const serverURI = "http://127.0.0.1:3000";
const serverURI = "https://site--vintedback--tzmxcvqjqbzq.code.run";
function App() {
  return (
    <>
      <Router>
        <Header serverURI={serverURI} />
        <Routes>
          <Route path="/" element={<HomePage serverURI={serverURI} />}></Route>
          <Route
            path="/product/:id"
            element={<OfferPage serverURI={serverURI} />}
          ></Route>
          <Route
            path="/product2/:id"
            element={<OfferPage2 serverURI={serverURI} />}
          ></Route>
          <Route
            path="/SearchPage/:brand"
            element={<SearchPage serverURI={serverURI} />}
          ></Route>
          <Route
            path="*"
            element={<PageNotFound serverURI={serverURI} />}
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
