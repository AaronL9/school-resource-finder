import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
// assets
import "../assets/css/registration.css";

// components
import GoogleButton from "react-google-button";
import InputField from "../components/InputField";
import { useAuthContext } from "../hooks/useAuthContext";
import Loader from "../components/Loader";
import supabase from "../config/supabaseClient";

export default function Registration() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { createUser, signInWithGoogle } = useAuthContext();

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      await createUser(firstName, lastName, email, password);
      setIsLoading(false);
      navigate("/student/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container">
      {isLoading && <Loader />}
      <div className="registration">
        <div className="caption">
          <h2>Create an account</h2>
          <p>connect with your friend today!</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="full-name">
            <InputField
              id={"fist-name"}
              type={"text"}
              label={"First Name"}
              setValue={setFirstName}
            />
            <InputField
              id={"last-name"}
              type={"text"}
              label={"Last Name"}
              setValue={setLastName}
            />
          </div>
          <InputField
            id={"email"}
            type={"email"}
            label={"Email Address"}
            setValue={setEmail}
          />
          <InputField
            id={"password"}
            type={"password"}
            label={"Password"}
            setValue={setPassword}
          />
          <input type="submit" value={"Sign Up"} />
        </form>
        <div className="line"></div>
        <div className="media-options">
          <GoogleButton onClick={() => signInWithGoogle()} type="dark" />
        </div>
        <div className="go-to-login">
          <p>
            Already have an account? <Link to={"/"}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
