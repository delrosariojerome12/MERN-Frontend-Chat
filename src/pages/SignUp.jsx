import React, {useState} from "react";
import bot from "../assets/img/bot.jpg";
import {FcPlus} from "react-icons/fc";
import {Link} from "react-router-dom";
import {useSignupUserMutation} from "../services/appApi";
import {useNavigate} from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [signupUser, {isLoading, isError}] = useSignupUserMutation();
  const [image, setImage] = useState("");
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [imagePreview, setPreviewImage] = useState(null);

  const navigate = useNavigate();

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "puemymzh");
    try {
      setIsImageUploading(true);
      let res = await fetch(
        `https://api.cloudinary.com/v1_1/drkkyyeih/image/upload`,
        {method: "post", body: data}
      );
      const urlData = await res.json();
      setIsImageUploading(false);
      return urlData.url;
    } catch (error) {
      setIsImageUploading(false);
      console.error(error);
    }
  };

  const validateImg = (e) => {
    const file = e.target.files[0];
    if (file.size >= 1048576) {
      return alert("Max File Size is 1mb");
    } else {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handeSignup = async (e) => {
    e.preventDefault();
    const url = await uploadImage(image);
    console.log(url);
    console.log(image);
    signupUser({name, email, password, picture: url}).then(({data}) => {
      if (data) {
        console.log(data);
        navigate("/chat");
      }
    });
  };

  return (
    <div className="signup">
      <div className="text">
        <h1>Sign Up</h1>
        <p>Dont Have an account?</p>
        <h3>Create and Start Chatting!</h3>
      </div>
      <form onSubmit={handeSignup}>
        <div className="profile">
          <img src={imagePreview ? imagePreview : bot} alt="img" />
          <span>
            <FcPlus />
          </span>
          <input
            required
            type="file"
            name="image-upload"
            id="image-upload"
            accept="image/png image/jpeg"
            onChange={validateImg}
          />
        </div>
        <div className="input-con">
          <input
            required
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            type="name"
            name="name"
            id="name"
            value={name}
          />
          <input
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            name="email"
            id="email"
            value={email}
          />
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            name="password"
            id="password"
          />
          <button type="submit">
            {isImageUploading ? "Signing You Up..." : "Create Account"}
          </button>
          <p>
            Already have an account? <Link to={"/login"}>Login</Link>
          </p>
        </div>
      </form>
      <div className="overlay"></div>
    </div>
  );
};

export default SignUp;
