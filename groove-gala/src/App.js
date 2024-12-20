import Home from "./pages/Home.js";
import OrgPage from "./pages/OrgPage.js";
import ScrollToTop from "./components/ScrollToTop.js";
import AdminPage from "./pages/AdminPage.js";
import AdminUser from "./pages/AdminUser.js";
import AdminOrg from "./pages/AdminOrg.js";
import NewFestPage from "./pages/NewFestivalPage.js";
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
        <Route path='/adminMain' element={<AdminPage />}></Route>
        <Route path='/adminUser' element={<AdminUser />}></Route>
        <Route path='/adminOrg' element={<AdminOrg />}></Route>
        <Route path='/newFestPage' element={<NewFestPage />}></Route>
        <Route path='*' element={<Navigate to='/' />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
