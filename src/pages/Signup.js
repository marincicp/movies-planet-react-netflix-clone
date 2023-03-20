import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContex";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { user, signUp } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signUp(email, password);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full h-full ">
      <img
        className="hidden sm:block absolute w-full h-full object-cover"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
        alt="/"
      />

      <div
        className="fixed w-full h-full top-0 left-0 bg-gradient-to-r from-black/60
      "
      ></div>

      <div className="relative w-full md:w-[600px] h-[700px] top-[200px] mx-auto text-white bg-black/90">
        <div className="w-full sm:w-[400px]  py-20 mx-auto">
          <h1 className="text-5xl font-bold mb-10 ">Sign Up</h1>
          <form
            onSubmit={handleSubmit}
            className="w-full px-2 flex flex-col gap-8"
          >
            <input
              className="w-full py-4 px-6 bg-gray-700 text-gray-400 text-xl outline-none"
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="w-full py-4 px-6 bg-gray-700 text-gray-400 text-xl outline-none"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full py-4 mt-4 px-6 bg-red-600 text-xl outline-none hover:bg-red-800">
              Sign up
            </button>
          </form>

          <p className="mt-12 text-gray-600 text-xl">
            Already subscribed to Netflix?{" "}
            <span className="text-white ml-2">
              {" "}
              <Link to="/login">Sign In</Link>{" "}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
