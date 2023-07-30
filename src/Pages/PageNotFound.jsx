// import { link } from "react-router-dom";

import { useLocation } from "react-router-dom";

const PageNotFound = () => {
  const location = useLocation();
  console.log("location", location);

  return (
    <div>
      <p>Page not found</p>
    </div>
  );
};

export default PageNotFound;
