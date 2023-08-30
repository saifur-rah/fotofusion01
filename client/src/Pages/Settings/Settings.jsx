import React, { useContext, useState } from "react";
import "./Settings.scss";
import { FaCamera } from "react-icons/fa6";
import { Context } from "../../context/Context";
import axios from "axios";

const Settings = () => {

  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess]= useState(false)

  const { user, dispatch } = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type: "UPDATE_START"})
    const updatedUser = {
      userId: user._id,
      username: username || user.username,
      email: email || user.email,
    };
    if (password) {
      updatedUser.password = password;
    }
    if (file) {
      const data = new FormData();
      data.append("file", file);
      try {
        const res= await axios.post("/api/upload", data);
        updatedUser.profilePic= res.data.secure_url;
      } catch (error) {console.log(error)}
    }
    try {
      const res= await axios.put("/api/users/" + user._id, updatedUser);
      setSuccess(true)
      dispatch({type: "UPDATE_SUCCESS", payload: res.data})
    } catch (error) {
      dispatch({type: "UPDATE_FAILURE"})
    }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          {/* <span className="settingsTitleDelete">Delete Account</span> */}
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img src={file? URL.createObjectURL(file) : user.profilePic} alt="" />
            <label htmlFor="fileInput">
              <FaCamera />
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            value={username}
            name="name"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
          { success && <span className="successMessage">Profile has been updated...</span>}
        </form>
      </div>
    </div>
  );
};

export default Settings;
