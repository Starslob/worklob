import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Dash from "../components/Dash";
import logo from "../assets/address.jpg";
import Modal from "../components/Modal";

const Home = () => {
  const [isGamemodalOpen, setIsGamemodalOpen] = useState(false);

  const handleGamemodalClick = () => {
    setIsGamemodalOpen(true);
  };

  const handleCloseGamemodal = () => {
    setIsGamemodalOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // claim
    handleCloseGamemodal();
  };
  return (
    <>
      <div className="col-lg-8">
        <div className="row">
          <Dash />

          {/* End quiz */}
        </div>
      </div>

      <Sidebar />
      {/* Render the Gamemodal if isGamemodalOpen is true */}
      {isGamemodalOpen && (
        <Modal onClose={handleCloseGamemodal} onSubmit={handleSubmit} />
      )}
    </>
  );
};

export default Home;
