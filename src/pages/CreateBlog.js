import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { Loader } from "../components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase";
import { FaTrash } from "react-icons/fa";
const categories = [
  "Default",
  "Covid",
  "Computer",
  "Programing",
  "Politic",
  "Sports",
];

const CreateBlog = () => {
  // All State Variable
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.user);

  // CHange Document Title
  document.title = `Jsdev Blog - Create Blog Mr ${user?.username}`;

  //When User Upload Any File
  const uploadFile = (e) => {
    const storageRef = ref(storage, `img/${e.target.files[0].name}`);
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
          setImg(downloadUrl);
        });
      }
    );
  };

  // Delete Images
  const deleteImage = () => {
    if (window.confirm("Are you sure to delete this image?")) {
      const deleteRef = ref(storage, img);
      deleteObject(deleteRef).then(() => {
        setImg(null);
      });
    } else return toast.warning(`You can't able to do that`);
  };

  const trimTitle = title.trim();
  const trimDescription = description.trim();
  // When User Click Post Button Fire This function
  const handleBlog = async (e) => {
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
      await axios.post(
        `${process.env.REACT_APP_PROXY}/create/blog`,
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
      toast.success("Blog Post Create Successfully");
    } catch (error) {
      setLoading(false);
      return toast.error(error.response.data.message);
    }
  };

  if (loading && !token && !user) return <Loader />;

  return (
    <>
      <section className="create_blog">
        <div className="container">
          <div className="create_blog_main">
            <h1>Welcome {user?.username}. Post Your Blog</h1>
            <form className="form" onSubmit={handleBlog}>
              <div className="from_control">
                <input
                  type="text"
                  placeholder="Enter your title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="from_control">
                <select onChange={(e) => setCategory(e.target.value)}>
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
                  onChange={(e) => setDescription(e.target.value)}
                  rows="4"
                  cols="50"
                  placeholder="Enter your blog description..."
                />
              </div>
              <div className="from_control">
                {img ? (
                  <img
                    src={img}
                    alt={user?.name}
                    onClick={deleteImage}
                    className="fileUpload"
                  />
                ) : (
                  <input type="file" onChange={uploadFile} />
                )}
              </div>
              <button
                className="app_btn btn_fill"
                disabled={progress != null && progress < 100}
              >
                {progress != null && progress < 100 ? "loading..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateBlog;
