import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../img/undraw_Mobile_login_re_9ntv.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login } from '../features/userSlice';
import { Loader } from "../components";

const Login = () => {
  //header title
  document.title = `Jsdev Blog - Login`;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // When User Click Login Button Fire This function
  const loginAccount = async (e) =>{
    //Validation
    e.preventDefault();
  if(!email && !password) return toast.error('Email & Password Required');
  if(password.length < 8) return toast.error('Password must be 8 characters');
    setLoading(true);
    try {
      const {data} = await axios.post(`${process.env.REACT_APP_PROXY}/login`, {
        email,
        password,
      });
      dispatch(login(data));
      localStorage.setItem("user", JSON.stringify(data));
      navigate('/', {replace:true})
      setLoading(false);
      return toast.success('Logged in successfully')
    } catch (error) {
      setLoading(false);
      return toast.error('Invalid Credential');
    }
  }
  
  
  if(loading) return <Loader />

  return (
    <>
      <section className="login">
        <div className="container">
          <div className="login_main">
            <div className="left">
              <img src={loginImage} alt="Razu Islam" />
            </div>
            <div className="right">
              <h1>Welcome People Jsdev Blog Login</h1>
              <form className="form" onSubmit={loginAccount}>
                <div className="from_control">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="from_control">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button className="app_btn btn_fill">Login</button>
              </form>
              <div className="form_footer">
                <p className="register">
                  Not A Member <Link to="/register">Register</Link>
                </p>
                <p
                  onClick={() => navigate("/reset-password", { replace: true })}
                >
                  Forgot Password?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
