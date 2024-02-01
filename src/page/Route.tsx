import { Route, Routes } from "react-router-dom";
import FrontPage from "./front/FrontPage";
import Login from "./login/Login";

import Calendar from "./calender/Calendar";


function Router() {
  return (
    <Routes>
      <Route path="/" element={<FrontPage />}></Route>
      <Route path="/login" element={<Login />}></Route>
      
      <Route path="/calendar" element={<Calendar />}></Route>
    </Routes>
  )
}

export default Router;