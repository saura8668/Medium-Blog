import axios from "axios";
import { SyntheticEvent, useState } from "react";
import { toast } from "react-custom-alert";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "react-custom-alert/dist/index.css";

const alertSuccess = () => toast.success("Login Sucess");
const alertError = (str: string) => toast.error(`${str}`);

const token = localStorage.getItem("jwt-token");

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()
  function signinHandler(e: SyntheticEvent) {
    // e.preventDefault();
    console.log("email: ", email);
    console.log("password: ", password);
    console.log(`you are here `);

    axios.post("http://localhost:8787/api/v1/user/signin", {
      email: email,
      password: password,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      console.log("Login Response is :", res);
      alertSuccess();
      navigate("/test")

    }).catch((err) => {
      console.log("Login Error", err.response.data);
      alertError(err.response.data.messge);
    })
    // console.log("Error", e);
    // alertError();

    console.log("token: ", token);
    console.log(`hii there`);
  }
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center  space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold sm:text-5xl xl:text-6xl ">
                Sign in to your account
              </h1>
              <p className="max-w-md text-gray-500 md:text-xl ">
                Enter your email and password to access your account.
              </p>
            </div>
            <div className="w-full max-w-md p-6 bg-white shadow rounded-lg ">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="yourmail@example.com"
                    required
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className="block w-full p-2 border rounded"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    className="block w-full p-2 border rounded"
                    placeholder="Your password"
                  />
                </div>
              </div>
              <div className="mt-4">
                <button
                  className="w-full p-2 bg-blue-500 text-white rounded"
                  onClick={signinHandler}
                >
                  Sign in
                </button>
              </div>
            </div>
            <div className=" mt-4 pl-[120px] text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="underline">
                Sign up
              </Link>
            </div>
          </div>

          <div className=" mt-4 text-center">
            <div className="mt-[15px] text-center justify-center">
              <h3 className="text-9xl font-bold sm:text-5xl xl:text-6xl text-center">
                “Be yourself; everyone else is already taken.”
                <br />
              </h3>
              <br />{" "}
              <i>
                <h5 className="text-md font-bold sm:text-5xl xl:text-6xl text-center">
                  {" "}
                  ― Oscar Wilde{" "}
                </h5>
              </i>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
