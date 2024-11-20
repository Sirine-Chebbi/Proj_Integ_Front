import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./LoginPage.css";
import {send_login} from '../services/AuthService'
import burImage from "../assets/bur.png"; // Image in the bottom left
import mecImage from "../assets/mec.png"; // Image in the bottom right


import { Button } from 'primereact/button';                             


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!passwordValid) {
      console.log("Invalid form submission: Password is not valid.");
      return;
    }
    console.log("Form submitted with email:", email);
    console.log("Password:", password);


	const result = await send_login(email,password);
		
	if (result.success) {
		console.log("Login successful:", result.data);


		// Handle successful login (e.g., save token, redirect user)
	  } else {
		console.error("Login failed:", result.error);
		// Display error message to the user

	  }



  };

  const validatePassword = (value) => {
    if (!value || value.length < 6) {
      setPasswordValid(false);
    } else {
      setPasswordValid(true);
    }
  };

  return (
    <div className="page-container">
      <nav className="navbar">
        <div className="navbar-left">
          <h1>ServiceLink</h1> {/* Title or logo */}
        </div>
        <div className="navbar-right">
          <a href="/" className="nav-link">
            Home
          </a>
          <Link to="/">
            <button className="register-button">Register</button>
          </Link>
        </div>
      </nav>

      <div className="login-container">
        <h2>Login Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }}
            />
            {!passwordValid && (<p style={{ color: "red" }}>Password must be at least 6 characters long</p>)}
			
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
		  <Button label="Submit" raised outlined />
        </form>

        <div className="forgot-password">
          <a href="/reset-password">Forget password?</a>
        </div>
      </div>

      <img src={burImage} alt="bureau" className="image-left" />
      <img src={mecImage} alt="mécanicien" className="image-right" />
    </div>
  );
}

export default Login;
