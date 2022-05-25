import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import registerImage from "../img/undraw_secure_login_pdn4.png";

const Register = () => {
  //header title
  document.title = `Jsdev Blog - Register`;
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //When User submit form fire this function
  const handleRegister = async (e) => {
    //Validation
    e.preventDefault();
    if (!email && !password && !username)
      return toast.error("Email & Password & Username Required");
    if (username.length < 4)
      return toast.error("Username must be 4 characters");
    if (password.length < 8)
      return toast.error("Password must be 8 characters");
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_PROXY}/register`,
        {
          username,
          email,
          password,
        }
      );
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/login", { replace: true });
      setLoading(false);
      toast.success("Register in successfully. Please login now.");
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <>
      <section className="login">
        <div className="container">
          <div className="login_main">
            <div className="left">
              <img src={registerImage} alt="Razu Islam" />
            </div>
            <div className="right">
              <h1>Welcome People Jsdev Blog Register</h1>
              <form className="form" onSubmit={handleRegister}>
                <div className="from_control">
                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
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
                <button className="app_btn btn_fill">Register</button>
              </form>
              <div className="form_footer">
                <p className="register">
                  if you have already account? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
