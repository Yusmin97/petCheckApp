import { Route, Routes } from "react-router-dom";
import FrontPage from "./front/FrontPage";
import LoginPage from "./login/Login";
import SignUpPage from "./signup/Signup";
import PetInfo from "./petInfo/PetInfo";

import Calendar from "./calender/Calendar";


function Router() {
  return (
    <Routes>
      <Route path="/" element={<FrontPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/signup" element={<SignUpPage />}></Route>
      <Route path="/petinfo" element={<PetInfo />}></Route>

      <Route path="/calendar" element={<Calendar />}></Route>
    </Routes>
  )
}

export default Router;