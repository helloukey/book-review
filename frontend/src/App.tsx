import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Hero } from "./components/Hero";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Layout } from "./components/Layout";
import { OTP } from "./components/OTP";
import { NotFound } from "./components/404";
import { useEffect, useState } from "react";
import { getUser } from "./apis/user";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser().then((data) => setUser(data?.user));
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Hero user={user} />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
            <Route path="/verify/:otpId" element={user ? <Navigate to="/" /> : <OTP />} />t
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
