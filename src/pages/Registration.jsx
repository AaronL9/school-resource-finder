import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
// assets
import "../assets/css/registration.css";

// components
import GoogleButton from "react-google-button";
import InputField from "../components/InputField";
import { useAuthContext } from "../hooks/useAuthContext";
import Loader from "../components/Loader";

export default function Registration() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { createUser } = useAuthContext();

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      createUser(email, password);
      setIsLoading(false);
      navigate('/student/home')
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
          <InputField
            type={"text"}
            label={"Full Name"}
            setValue={setFullName}
          />
          <InputField
            type={"email"}
            label={"Email Address"}
            setValue={setEmail}
          />
          <InputField
            type={"password"}
            label={"Password"}
            setValue={setPassword}
          />
          <input type="submit" value={"Sign Up"} />
        </form>
        <div className="line"></div>
        <div className="media-options">
          <GoogleButton
            onClick={() => signInWithGoogle()}
            type="dark"
          />
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
