import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import AssetPage from "../pages/asset";



function RoutesContainer() {
  return (
   
    <HashRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/:collectionId/:id"} element={<AssetPage />} />
      </Routes>
    </HashRouter>
   
  );
}

export default RoutesContainer;
