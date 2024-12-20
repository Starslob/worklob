import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/worklob-logo-cp-no-bg.png";
import stx from "../assets/img/stx-wallet.png";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { useWeb3 } from "../Web3Provider";

const WalletRegister = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    walletAddress: "",
    role: "",
  });
  const [roleSelected, setRoleSelected] = useState(false);
  const { connectWallet, account, connected } = useWeb3();
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role });
    setRoleSelected(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleWalletConnect = async () => {
    try {
      await connectWallet();
      setFormData((prevData) => ({ ...prevData, walletAddress: account }));
      toast.success("Wallet connected successfully!");
    } catch (error) {
      toast.error("Failed to connect wallet.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.role) {
      toast.error("Please select your role!");
      return;
    }

    if (!formData.username || !formData.email || !formData.walletAddress) {
      toast.error("Please fill all fields and connect your wallet!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/user/wallet-signup",
        {
          username: formData.username,
          email: formData.email,
          walletAddress: formData.walletAddress,
          role: formData.role,
        }
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        toast.success("User registered successfully!");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    } catch (e) {
      if (e.response && e.response.data.errors) {
        e.response.data.errors.forEach((error) => {
          toast.error(error.message);
        });
      } else if (e.response && e.response.data.msg) {
        toast.error(e.response.data.msg || "Error during registration");
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <div>
      <div id="boxit">
        <div id="logodiv">
          <img id="logoimg" className="mx-auto" src={logo} alt="Logo" />
        </div>

        <div className="auth-box">
          <div>
            <h2>Register</h2>
          </div>

          {!roleSelected ? (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
                margin: "20px 0",
              }}
            >
              {/* Customer Card */}
              <div onClick={() => handleRoleSelect("Customer")} id="role-reg">
                <span style={{ fontSize: "50px", marginBottom: "10px" }}>
                  👥
                </span>
                <div>
                  <h3>I’m a Customer</h3>
                  <p>I’m looking for talents who will do work for me</p>
                </div>
              </div>

              {/* Talent Card */}
              <div onClick={() => handleRoleSelect("Talent")} id="role-reg">
                <span style={{ fontSize: "50px", marginBottom: "10px" }}>
                  💼
                </span>
                <div>
                  <h3>I’m a Talent</h3>
                  <p>I’m looking for short-term or long-term jobs</p>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="walletAddress">Wallet Address</label>
                <input
                  type="text"
                  id="walletAddress"
                  name="walletAddress"
                  placeholder="Connect your wallet"
                  value={formData.walletAddress}
                  disabled
                />
              </div>
              <button
                id="connbtn"
                type="button"
                style={{ marginBottom: "20px" }}
                onClick={handleWalletConnect}
              >
                <img
                  src={stx}
                  alt="Wallet"
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    marginRight: "8px",
                  }}
                />
                {connected ? "Wallet Connected" : "Connect Wallet"}
              </button>
              <button id="optionbut" type="submit">
                Sign Up
              </button>
            </form>
          )}
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
        <Toaster />
      </div>
    </div>
  );
};

export default WalletRegister;
