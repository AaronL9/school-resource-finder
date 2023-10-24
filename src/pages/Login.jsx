import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";

// components
import GoogleButton from "react-google-button";
import InputField from "../components/InputField";
import { useAuthContext } from "../hooks/useAuthContext";
import Loader from "../components/Loader";
import SuccessMessg from "../components/SuccessMessg";


export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessVisible, setSuccessVisible] = useState(false);
  const { signIn, signInWithGoogle, authEvent, setAuthEvent } = useAuthContext();
  const [errorMessage, setErrorMessage] = useState(null);
  
  const handleCloseSuccess = () => {
    setSuccessVisible(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signIn(email, password);
      navigate("/student/home");
    } catch (error) {
      setErrorMessage(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (authEvent === "SIGNED_OUT") setSuccessVisible(true);
    supabase.auth.onAuthStateChange((event) => {
      setAuthEvent(event);
    });
  }, [])

  return (
    <>
      {isSuccessVisible && (
        <SuccessMessg
          message={"Logout Succesfully"}
          onClose={handleCloseSuccess}
        />
      )}
      {isLoading && <Loader />}
      <div className="container">
        <div className="registration">
          <div className="caption">
            <h2>Hi Welcome Back!👋</h2>
            <p>Hello again you have been missed!</p>
          </div>
          <form onSubmit={handleSubmit}>
            <InputField
              label={"Email Address"}
              type={"email"}
              setValue={setEmail}
            />
            <InputField
              label={"Password"}
              type={"password"}
              setValue={setPassword}
            />
            {errorMessage && (
              <div>
                <i
                  style={{ color: "#ff3333", verticalAlign: 'middle', marginRight: '5px' }}
                  className="bx bxs-error-circle"
                ></i>
                <span style={{ color: "#ff3333" }}>{errorMessage}</span>
              </div>
            )}
            <input type="submit" value={"Login"} />
          </form>
          <div className="line"></div>
          <div className="media-options">
            <GoogleButton onClick={() => signInWithGoogle()} type="dark" />
          </div>
          <div className="go-to-login">
            <p>
              Don't have an account ? <Link to={"/register"}>Register</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
