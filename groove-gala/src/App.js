import Home from "./pages/Home.js";
import OrgPage from "./pages/OrgPage.js";
import ScrollToTop from "./components/ScrollToTop.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import FestPage from "./pages/FestPage.js";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/singleOrg' element={<OrgPage />}></Route>
        <Route path='/singleFest' element={<FestPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
