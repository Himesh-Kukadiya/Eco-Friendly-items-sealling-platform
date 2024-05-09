import OrdersDetails from "./Component/OrdersDetail/OrdersDetails"
import ProductDetail from "./Component/ProductDetails/ProductDetail"
import SellerDetail from "./Component/SellerDetails/SellerDetail"
import ChartSection from "./Component/Charts/ChartSection"
import MainSection from "./Component/Dashboard/MainSection"
import LoginPage from "./Component/Login/LoginPage"
import Profile from "./Component/Login/Profile"
import NavBar from "./Component/NavBar"
import UsersDetails from "./Component/UserDetails/UsersDetails"
import './assets/css/MainSection.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <LoginPage />
          } />
          <Route path="/profile" element={
            <>
              <div className="wrapper grid-container">
                <NavBar />
                <Profile />
              </div>
            </>
          } />
          <Route path="/dashboard" element={
            <>
              <div className="wrapper grid-container">
                <NavBar />
                <MainSection />
              </div>
            </>
          } />
          <Route path="/users" element={
            <>
              <div className="wrapper grid-container">
                <NavBar />
                <UsersDetails />
              </div>
            </>
          } />
          <Route path="/box-keepers" element={
            <>
              <div className="wrapper grid-container">
                <NavBar />
                <SellerDetail />
              </div>
            </>
          } />
          <Route path="/boxes" element={
            <>
              <div className="wrapper grid-container">
                <NavBar />
                <ProductDetail />
              </div>
            </>
          } />
          <Route path="/bookings" element={
            <>
              <div className="wrapper grid-container">
                <NavBar />
                <OrdersDetails />
              </div>
            </>
          } />
          <Route path="/charts" element={
            <>
              <div className="wrapper grid-container">
                <NavBar />
                <ChartSection />
              </div>
            </>
          } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
