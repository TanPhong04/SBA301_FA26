import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import TestCount from "./TestCount";
const MainLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100 app-container">
      <Header />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <TestCount />
      <br />
      <Footer
        avatar="https://cdn2.fptshop.com.vn/unsafe/800x0/meme_cho_1_e568e5b1a5.jpg"
        name="phongtt"
        email="sw.phongtt@gmail.com"
      />
    </div>
  );
};

export default MainLayout;
