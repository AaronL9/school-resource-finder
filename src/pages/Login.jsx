import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

// components
import GoogleButton from "react-google-button";
import InputField from "../components/InputField";
import { useAuthContext } from "../hooks/useAuthContext";
import Loader from "../components/Loader";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signInWithGoogle } = useAuthContext();

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      await signIn(email, password);
      setIsLoading(false)
      navigate("/student/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
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
