// import { link } from "react-router-dom";
import history from "../History/History";
import { useLocation } from "react-router-dom";

const PageNotFound = () => {
  const location = useLocation();
  console.log("location", location);
  history.push(location.pathname);
  console.log("history", history);
  return (
    <div>
      <p>Page not found</p>
    </div>
  );
};

export default PageNotFound;
