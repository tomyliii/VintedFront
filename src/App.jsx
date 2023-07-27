import { useEffect, useState } from "react";
import "./App.css";
import "./assets/Fonts/stylesheet.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./Components/Header/Header";
import HomePage from "./Pages/HomePage";
import OfferPage from "./Pages/OfferPage";
import SearchPageBrand from "./Pages/SearchPageBrand";
import SearchPage from "./Pages/SearchPage";
import PageNotFound from "./Pages/PageNotFound";
import Cookies from "js-cookie";
import Publish from "./Pages/Publish";
// const serverURI = "http://127.0.0.1:3000";
const serverURI = "https://site--vintedback--tzmxcvqjqbzq.code.run";
function App() {
  const [userToken, setUserToken] = useState(Cookies.get("token") || "");

  return (
    <>
      <Router>
        <Header serverURI={serverURI} />
        <Routes>
          <Route path="/" element={<HomePage serverURI={serverURI} />}></Route>
          <Route
            path="product/:id"
            element={<OfferPage serverURI={serverURI} userToken={userToken} />}
          />
          <Route
            path="SearchPageBrand/:brand"
            element={
              <SearchPageBrand serverURI={serverURI} userToken={userToken} />
            }
          />
          <Route
            path="SearchPage/:search/:sort"
            element={<SearchPage serverURI={serverURI} userToken={userToken} />}
          />
          <Route
            path="Publish"
            element={<Publish serverURI={serverURI} userToken={userToken} />}
          />
          <Route
            path="*"
            element={
              <PageNotFound serverURI={serverURI} userToken={userToken} />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
