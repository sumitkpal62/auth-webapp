import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const userData = currentUser.userData;
  return (
    <div className="flex flex-col m-auto min-w-[400px] max-w-[500px] border border-blue-500 rounded-md mt-10 h-[70vh] shadow-lg shadow-blue-600">
      <div>
        <h1 className="text-center pb-2 text-3xl mt-3 font-bold ">Profile</h1>
        <img
          className="w-[80px] h-[80px] mt-1 mx-auto rounded-full object-cover cursor-pointer"
          src={userData.userPhoto}
          alt="Profile photo"
        />
      </div>
      <form className="flex flex-col gap-3 p-3 mt-6">
        <input
          className="outline-blue-500 border p-2 rounded w-1/2 m-auto"
          type="text"
          placeholder="Username"
          id="username"
          defaultValue={userData.username}
        />
        <input
          className="outline-blue-500 border p-2 rounded w-1/2 m-auto"
          type="email"
          placeholder="Email"
          id="email"
          defaultValue={userData.email}
        />
        <input
          className="outline-blue-500 border p-2 rounded w-1/2 m-auto"
          type="password"
          placeholder="Password"
          id="password"
        />
        <button className="border text-white border-blue-600 w-1/2 self-center p-2 rounded bg-blue-600 hover:bg-blue-500 disabled:bg-blue-300">
          Update
        </button>
      </form>
      <div className="flex justify-between px-5">
        <span className="text-red-500 cursor-pointer hover:opacity-85">
          Delete Account
        </span>
        <span className="text-red-500 cursor-pointer hover:opacity-85">
          Sign Out
        </span>
      </div>
    </div>
  );
};

export default Profile;
