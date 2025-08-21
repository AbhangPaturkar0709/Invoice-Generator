import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddProducts from "./pages/AddProducts";
import { ToastContainer } from "react-toastify";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useContext } from "react";

function AppRoutes() {
  const { token } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/*" element={<Home />} />
      <Route path="/signup" element={token ? <Navigate to="/add-products" /> : <Signup />} />
      <Route path="/login" element={token ? <Navigate to="/add-products" /> : <Login />} />
      <Route path="/add-products" element={token ? <AddProducts /> : <Navigate to="/login" />} />
    </Routes>
  );
}

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
