import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/pages/HomePage";
import Cart from "./components/Cart";
import RegistrationPage from "./components/pages/RegistrationPage";
import AutorizationPage from "./components/pages/AutorizationPage";
import CatalogPage from "./components/pages/CatalogPage";
import { UserProvider } from "./contextAPI/contextAPI";
import Profile from "./components/Profile";
import CheckoutPage from "./components/pages/CheckoutPage";


function App() {
  return (
    <Router>
      <UserProvider>
      <Header />
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/authorization" element={<AutorizationPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/checkoutpage" element={<CheckoutPage />} />
          </Routes>
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
