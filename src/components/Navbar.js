import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContex";

function Navbar() {
  const { user, logOut } = UserAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-between items-center p-6 z-[100] w-full absolute">
      <Link to="/">
        <h1 className="text-red-600 uppercase font-bold text-3xl cursor-pointer">
          Movies Planet
        </h1>
      </Link>

      {user?.email ? (
        <div className="flex w-[130px] sm:w-fit flex-col sm:flex-row gap-3 ">
          <Link to="/account">
            {" "}
            <button className="text-white w-full px-4 py-2 bg-black/40 transition-all duration-150 hover:bg-black/60 text-m md:text-xl mr-6">
              Your Account
            </button>
          </Link>

          <Link to="/">
            <button
              onClick={handleLogout}
              className="text-white px-4 w-full  py-2 text-m md:text-xl bg-red-600 rounded transition-all duration-150 hover:bg-red-700"
            >
              Sign Out
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex w-[130px] sm:w-fit flex-col sm:flex-row gap-3 ">
          <Link to="/login">
            {" "}
            <button className="text-white w-full px-4 py-2 bg-black/40 transition-all duration-150 hover:bg-black/60 text-m md:text-xl mr-6">
              Sign In{" "}
            </button>
          </Link>

          <Link to="/signup">
            <button className="text-white w-full px-4 py-2 text-m  md:text-xl bg-red-600 rounded transition-all duration-150 hover:bg-red-700">
              Sign Up{" "}
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
