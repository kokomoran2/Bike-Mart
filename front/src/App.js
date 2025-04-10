import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BikeProvider } from "../src/components/User/Bikecontext";
//import { WishlistProvider } from "./components/User/wishlistcontext";

// Import Components
import Index from "./components/index";
import AboutUs from "./components/aboutus";
import Admin from "./components/admin/admin";
import Login from "./components/login";
import Signup from "./components/signup";
import AddBike from "./components/admin/addbike";
import ViewBike from "./components/admin/viewbike";
import AddService from "./components/admin/addservicecenter";
import ViewServiceCenters from "./components/admin/viewservice";
import ViewCustomer from "./components/admin/viewcustomer";
import ViewFeedback from "./components/admin/viewfeedback";
import ViewAddress from "./components/admin/viewaddress";

import User from "./components/User/user";
import Wishlist from "./components/User/wishlist";
import Service from "./components/User/service";
import FeedbackForm from "./components/User/feedback";
import BankLoan from "./components/User/bankloan";
import TestDrive from "./components/User/testdrive";
import PaymentGateway from "./components/User/paymentgateway";
import PayLater from "./components/User/Paylater";
import ForgotPass from "./components/User/forgotpass";
import BuyNow from "./components/User/buynow";
import BikeDetails from "./components/User/Bikedetails";
import Address from "./components/User/address";
import Profile from "./components/User/profile";
import Sales from "./components/admin/viewsales";
import Order from "./components/User/order";
import ViewDistrictReport from "./components/admin/viewdistrictreport";
import ViewDateReport from "./components/admin/viewdatereport";
import TopSellingBikes from "./components/admin/viewtopbike";
import BookService from "./components/User/bookservice";
import ServiceBookings from "./components/admin/servicebookings";
import BikeSold from "./components/admin/bikessold";
import BookTestDrive from "./components/User/booktestdrive";
import ViewTestDrive from "./components/admin/viewtestdrive";
//import Portfolio from "./components/admin/port";

const App = () => {
  return (
    <BikeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Admin Routes */}
          <Route path="/addbike" element={<AddBike />} />
          <Route path="/Viewbike" element={<ViewBike />} />
          <Route path="/addservice" element={<AddService />} />
          <Route path="/Viewservice" element={<ViewServiceCenters />} />
          <Route path="/viewcustomer" element={<ViewCustomer />} />
          <Route path="/Viewfeedback" element={<ViewFeedback />} />
          <Route path="/viewaddress" element={<ViewAddress />} />
          <Route path="/viewdistrictreport" element={<ViewDistrictReport/>}/>
          <Route path="/viewdatereport" element={<ViewDateReport/>}/>
          <Route path="/viewbrandreport" element={<TopSellingBikes/>}/>
          <Route path="/Viewtestdrive" element={<ViewTestDrive />} />
          {/* <Route path="/p" element={<Portfolio/>}/> */}

          {/* User Routes */}
          <Route path="/user" element={<User />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/service" element={<Service />} />
          <Route path="/feedback" element={<FeedbackForm />} />
          <Route path="/paylater" element={<PayLater />} />
          <Route path="/bankloan" element={<BankLoan />} />
          <Route path="/testdrive" element={<TestDrive />} />
          <Route path="/payment" element={<PaymentGateway />} />
          <Route path="/forgotpassword" element={<ForgotPass />} />
          <Route path="/buynow" element={<BuyNow />} />
          <Route path="/bikedetails" element={<BikeDetails />} />
          <Route path="/address" element={<Address />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/viewsales" element={<Sales/>} />
          <Route path="/order/:id" element={<Order />} />
          <Route path="/bikesold" element={<BikeSold />} />
          <Route path="/bookservice" element={<BookService />} />
          <Route path="/viewbookings" element={<ServiceBookings />} />
          <Route path="/booktestdrive" element={<BookTestDrive />} />
        </Routes>
      </Router>
    </BikeProvider>
  );
};

export default App;
