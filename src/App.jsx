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

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/product/:id" element={<OfferPage />}></Route>
          <Route path="/product2/:id" element={<OfferPage2 />}></Route>
          <Route path="/SearchPage/:brand" element={<SearchPage />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
