import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../config/firebaseConfig";
import axios from "axios";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  signOut,
} from "../redux/user/userSlice";
import { toast } from "react-toastify";

const Profile = () => {
  const { currentUser, loading } = useSelector((state) => state.user);
  const userData = currentUser.userData;
  const fileRef = useRef();
  const [image, setImage] = useState(undefined);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({});
  const [imageError, setImageError] = useState(Boolean);
  const dispatch = useDispatch();

  useEffect(() => {
    handleFileUpload(image);
  }, [image]);

  const handleFileUpload = async () => {
    try {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + image.name.split(" ").join("");
      const storageref = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageref, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploadProgress(progress);
        },
        (error) => setImageError(true),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
            setFormData({ ...formData, profilePhoto: downloadURL })
          );
        }
      );
    } catch (error) {}
  };

  const handleOnChange = (evt) => {
    setFormData({ ...formData, [evt.target.id]: evt.target.value });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    try {
      dispatch(updateUserStart());
      const response = await axios.post(
        `/api/user/update/${currentUser.userData._id}`,
        formData
      );
      const data = await response.data;
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      toast.success("User data updated successfully");
      dispatch(updateUserSuccess(data));
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(updateUserFailure(error.response.data));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const response = await axios.delete(
        `/api/user/delete/${currentUser.userData._id}`
      );
      const data = await response.data;
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess());
      toast.success(data.message);
    } catch (error) {
      toast.error("Unauthorized, Sign In again!");
      dispatch(deleteUserFailure(error));
    }
  };

  const onSignOut = async () => {
    dispatch(signOut());
    try {
      await axios.get("/api/auth/signout");
    } catch (error) {
      console.log("Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col m-auto min-w-[400px] max-w-[500px] border border-blue-500 rounded-md mt-10 h-[75vh] shadow-lg shadow-blue-600">
      <div>
        <h1 className="text-center text-3xl mt-3 font-bold ">Profile</h1>
      </div>
      <form className="flex flex-col gap-3 p-3 mt-3" onSubmit={handleOnSubmit}>
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <div className="flex flex-col justify-center">
          <img
            className="w-[80px] h-[80px] mx-auto rounded-full object-cover cursor-pointer"
            src={formData.ProfilePhoto || userData.userPhoto}
            alt="Profile photo"
            onClick={() => fileRef.current.click()}
          />
          <p className="text-sm text-center mx-auto mt-1">
            {imageError ? (
              <span className=" text-red-700">Error while uploading image</span>
            ) : uploadProgress > 0 && uploadProgress < 100 ? (
              <span className=" text-slate-700">{`Upload progress: ${uploadProgress}%`}</span>
            ) : uploadProgress === 100 ? (
              <span className=" text-green-700">Completed</span>
            ) : (
              <span className="opacity-0">Hidden text</span>
            )}
          </p>
        </div>
        <input
          className="outline-blue-500 border p-2 rounded w-1/2 m-auto"
          type="text"
          placeholder="Username"
          id="username"
          defaultValue={userData.username}
          onChange={handleOnChange}
        />
        <input
          className="outline-blue-500 border p-2 rounded w-1/2 m-auto"
          type="email"
          placeholder="Email"
          id="email"
          defaultValue={userData.email}
          onChange={handleOnChange}
        />
        <input
          className="outline-blue-500 border p-2 rounded w-1/2 m-auto"
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleOnChange}
        />
        <button className="border text-white border-blue-600 w-1/2 self-center p-2 rounded bg-blue-600 hover:bg-blue-500 disabled:bg-blue-300">
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between px-5">
        <span
          className="text-red-500 cursor-pointer hover:opacity-85"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </span>
        <span
          className="text-red-500 cursor-pointer hover:opacity-85"
          onClick={onSignOut}
        >
          Sign Out
        </span>
      </div>
    </div>
  );
};

export default Profile;
