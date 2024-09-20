import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Outlet/>
      <Footer />
    </>
  );
}
