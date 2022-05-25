import axios from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader } from "../components";
import { login } from "../features/userSlice";
import { storage } from "../firebase";
import registerImage from "../img/undraw_secure_login_pdn4.png";

const initialState = {
  username: "",
  email: "",
  about: "",
  website: "",
};

const UpdateProfile = () => {
  //All State Varibale
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const { username, email, about, website } = formData;
  const [avatar, setAvatar] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.user);
 // CHange Document Title
 document.title = `Jsdev Blog - Update Profile Mr ${user?.username}`
  //When user upload any file
  const uploadFile = (e) => {
    const storageRef = ref(storage, `user/${e.target.files[0].name}`);
    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress - 10);
          setTimeout(() => {
            setProgress(progress);
          }, 3000);
      },
      (error) => {
        return toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setAvatar(downloadUrl);
        });
      }
    );
  };
  //Handle Change function to tracking form data
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //fetch single user data to based on user
  useEffect(() => {
    const getSingleBlog = async () => {
      if(!token) return <Loader />
      else {
        setLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_PROXY}/user/details`, 
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: true,
          }
        );
        setLoading(false);
        setFormData({...data.user})
      } catch (error) {
        setLoading(false);
        return toast.error(error.message);
      }
      }
    };

    getSingleBlog();
  }, [token]);
  //When User Click Profile Button
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (username && username.length < 4)
      toast.error("Username must be 4 characters");
    setLoading(true);
    try {
      await axios.put(
        `${process.env.REACT_APP_PROXY}/update/profile`,
        {
          username,
          email,
          about,
          website,
          avatar,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: true,
        }
      );
      const data = {
        token: null,
        user: null,
      };
      setLoading(false);
      dispatch(login(data));
      navigate("/login", { replace: true });
      toast.success("User Profile Update successfully");
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const handleUpdatePass = () => {
    if (window.confirm("Are you you need yo update password"))
      navigate("/update-password", { replace: true });
    else return toast.error(`Sorry you can't access update password page`);
  };

  if (loading && !token) return <Loader />;

  return (
    <div>
      <section className="login">
        <div className="container">
          <div className="login_main">
            <div className="left">
              <img src={registerImage} alt="Razu Islam" />
            </div>
            <div className="right">
              <h1>Update Your Profile Razu Islam</h1>
              <form className="form" onSubmit={handleProfileUpdate}>
                <div className="from_control">
                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    name="username"
                    onChange={handleChange}
                  />
                </div>
                <div className="from_control">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    name="email"
                    onChange={handleChange}
                  />
                </div>
                <div className="from_control">
                  <textarea
                    type="password"
                    placeholder="Enter your about optional"
                    cols={40}
                    rows={10}
                    value={about}
                    name="about"
                    onChange={handleChange}
                  />
                </div>
                <div className="from_control">
                  <input
                    type="text"
                    placeholder="Enter your website optional"
                    value={website}
                    name="website"
                    onChange={handleChange}
                  />
                </div>
                <div className="from_control">
                  <input type="file" onChange={uploadFile} />
                </div>
                <button
                  className="app_btn btn_fill"
                  type="submit"
                  disabled={progress !== null && progress < 100}
                >
                  Update
                </button>
                <button
                  className="app_btn btn_trans"
                  onClick={handleUpdatePass}
                >
                  Update Password
                </button>
                <button
                  className="app_btn btn_trans"
                  onClick={() => navigate("/user-profile", { replace: true })}
                >
                  Back to Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UpdateProfile;
