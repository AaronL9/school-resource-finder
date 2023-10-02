import MediaOption from "../components/MediaOption";
import InputField from "../components/InputField";
import { loginData, inputFieldData } from "../assets/js/data";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  
  return (
    <div className="container">
      <div className="registration">
        <div className="caption">
          <h2>Hi Welcome Back!👋</h2>
          <p>Hello again you have been missed!</p>
        </div>
        <form onSubmit={() => navigate('/student/home')}>
          <InputField label={"Email Address"} type={"email"} />
          <InputField label={'Password'} type={"password"} />
          <input type="submit" value={"Login"} />
        </form>
        {/* <div className="line"></div>
        <div className="media-options">
          <MediaOption source={"/svg/fb.svg"} name={"Facebook"} />
          <MediaOption source={"/svg/google.svg"} name={"Google"} />
        </div> */}
        <div className="go-to-login">
          <p>
            Don't have an account ? <Link to={"/register"}>Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
