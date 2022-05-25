import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Loader } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";
const categories = [
  "Default",
  "Covid",
  "Computer",
  "Programing",
  "Politic",
  "Sports",
];

const initialState = {
  title: "",
  description: "",
  category: "",
};

const UpdateBlog = () => {
  // All State Variable
  const [formData, setFormData] = useState(initialState);
  const { title, description, category } = formData;
  const [img, setImg] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.user);
  const {id} = useParams();

   // CHange Document Title
   document.title = `Jsdev Blog - Update Blog Mr ${user?.username}`

  //When User Upload Any File
  const uploadFile = (e) => {
    const storageRef = ref(storage, `img/${e.target.files[0].name}`);
    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        return toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImg(downloadUrl);
        });
      }
    );
  };

  const trimTitle = title.trim();
  const trimDescription = description.trim();
  //handle Change function to track change form data
  const handleChange = (e) =>{
      setFormData({...formData, [e.target.name]: e.target.value})
  }
  //get Single Blog Based On Id
  useEffect(() => {
    const getSingleBlog = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_PROXY}/blog/${id}`
        );
        setLoading(false);
        setFormData({...data.blog})
      } catch (error) {
        setLoading(false);
        return toast.error(error.message);
      }
    };

    getSingleBlog();
  }, [id]);

  //When user Click Update Button Fire this function
  const handleUpdateBlog = async (e) => {
    e.preventDefault();
    if (!title && !description && !category)
      return toast.error("Title & Description & Category is Required");
    if (title.length < 20) return toast.error("Title At least 20 characters");
    if (description.length < 150)
      return toast.error("Title At least 150 characters");
    if (category === "Default")
      return toast.error("Don't use default category");
    setLoading(true);
    try {
      await axios.put(
        `${process.env.REACT_APP_PROXY}/blog/update/${id}`,
        {
          title: trimTitle,
          description: trimDescription,
          category,
          img,
          author: user?._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: true,
        }
      );
      setLoading(false);
      navigate("/", { replace: true });
      toast.success("Blog Post Update Successfully");
    } catch (error) {
      setLoading(false);
      return toast.error(error.response.data.message);
    }
  };

  if (loading && !user && !token) return <Loader />;

  return (
    <>
      <section className="create_blog">
        <div className="container">
          <div className="create_blog_main">
            <h1>Welcome {user?.username}. Post Your Blog</h1>
            <form className="form" onSubmit={handleUpdateBlog}>
              <div className="from_control">
                <input
                  type="text"
                  placeholder="Enter your title..."
                  value={title}
                  name="title"
                  onChange={handleChange}
                />
              </div>
              <div className="from_control">
                <select name='category' onChange={handleChange}>
                  {categories.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="from_control">
                <textarea
                  value={description}
                  name="description"
                  onChange={handleChange}
                  rows="4"
                  cols="50"
                  placeholder="Enter your blog description..."
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
                Post
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateBlog;
