import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader } from "../components";
import forgotPassword from "../img/undraw_Forgot_password_re_hxwm.png";

const ChangePassword = () => {
  // All State Varibale
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // CHange Document Title
  document.title = `Jsdev Blog - Change Password`

  //When User Click reset button
  const handleReset = async (e) => {
    e.preventDefault();
    if (!email && !password) return toast.error("Email & Password Required");
    if (password.length < 8)
      return toast.error("Password must be 8 characters");
    setLoading(true);
    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_PROXY}/change-password`,
        {
          email,
          password,
        }
      );
      setLoading(false);
      toast.success(data);
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <section className="forgot">
        <div className="container">
          <div className="forgot_main">
            <div className="left">
              <img src={forgotPassword} alt="Razu Islam" />
            </div>
            <div className="right">
              <h1 style={{ fontSize: "35px", textAlign: "left" }}>
                Update <br /> Your Password
              </h1>
              <form className="form" onSubmit={handleReset}>
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
                    placeholder="Enter update password.."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button className="app_btn btn_fill" type="submit">
                  Update Password
                </button>
                <button
                  className="app_btn btn_trans"
                  onClick={() => navigate("/login", { replace: true })}
                  type="submit"
                >
                  Back to login
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChangePassword;
