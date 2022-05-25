import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader } from "../components";
import forgotPassword from "../img/undraw_Forgot_password_re_hxwm.png";

const ResetPassword = () => {
   // CHange Document Title
   document.title = `Jsdev Blog - Reset Password`
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  //When User Click reset button
  const handleReset = async (e) => {
    e.preventDefault();
    if(!email) return toast.error('Email Must Be Required');
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_PROXY}/reset-password`,
        {
          email,
        }
      );
      setLoading(false);
      toast.success(data);
      navigate("/verify-code", { replace: true });
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
                Forgot <br /> Your Password
              </h1>
              <div className="form">
                <form className="from_control" onSubmit={handleReset}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button className="app_btn btn_fill" type="submit">
                    Reset Password
                  </button>
                </form>
                <button
                  className="app_btn btn_trans"
                  onClick={() => navigate("/login", { replace: true })}
                  type="submit"
                >
                  Back to login
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetPassword;
