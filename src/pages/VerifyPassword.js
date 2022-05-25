import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader } from "../components";
import forgotPassword from "../img/undraw_Forgot_password_re_hxwm.png";

const VerifyPassword = () => {
  // CHange Document Title
  document.title = `Jsdev Blog - Verify Password`;
  //All State Varibale
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [loading, setLoading] = useState(false);

  //When User Click reset button
  const handleReset = async (e) => {
    e.preventDefault();
    if (!email && !resetCode) return toast.error("Email & Password Required");
    if (resetCode.length < 5)
      return toast.error("resetCode must be 6 characters");
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_PROXY}/verify-code`,
        {
          email,
          resetCode,
        }
      );
      setLoading(false);
      toast.success(data);
      navigate("/change-password", { replace: true });
    } catch (error) {
      toast.error('Invalid Credentials');
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
                Verify <br /> Your Password Code
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
                    type="text"
                    placeholder="Enter reset code.."
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value)}
                  />
                </div>
                <button className="app_btn btn_fill" type="submit">
                  Change Password
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

export default VerifyPassword;
