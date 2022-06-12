import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./components/menu/navbar";
import Login from "./pages/auth/login";
import AdminHome from "./pages/admin";
import AdminNavBar from "./components/menu/adminNavBar";
import AddItem from "./pages/admin/items/addItem";
import ItemList from "./pages/admin/items/itemlist";
import Footer from "./components/menu/footer";
import AddItemInfo from "./pages/admin/items/addItemInfo";
import Market from "./pages/market/market";
import SignUp from "./pages/auth/signup";
import UserList from "./pages/admin/user/userList";
import ItemDetail from "./pages/market/itemDetail";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Outlet />
              <Footer />
            </>
          }
        >
          <Route index element={<Home />} />
          <Route path="market">
            <Route index element={<Market />} />
            <Route path=":id" element={<ItemDetail />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
        <Route
          path="/admin"
          element={
            <>
              <AdminNavBar />
              <Outlet />
            </>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="item">
            <Route path="list" element={<ItemList />} />
            <Route path="add" element={<AddItem />} />
            <Route path="info" element={<AddItemInfo />} />
          </Route>
          <Route path="user">
            <Route path="list" element={<UserList />} />
          </Route>
        </Route>
        <Route path="*" element={<div>not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
