import { Link } from "react-router-dom";
import "../assets/css/registration.css";
import MediaOption from "../components/MediaOption";
import InputField from "../components/InputField";

export default function Registration() {
  return (
    <div className="container">
      <div className="registration">
        <div className="caption">
          <h2>Create an account</h2>
          <p>connect with your friend today!</p>
        </div>
        <form action="">
          <InputField type={'text'} label={"Full Name"} />
          <InputField type={"email"} label={"Email Address"} />
          <InputField type={"password"} label={"Password"} />
          <input type="submit" value={"Sign Up"} />
        </form>
        {/* <div className="line"></div>
        <div className="media-options">
          <MediaOption source={"/svg/fb.svg"} name={"Facebook"} />
          <MediaOption source={"/svg/google.svg"} name={"Google"} />
        </div> */}
        <div className="go-to-login">
          <p>
            Already have an account? <Link to={"/"}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
