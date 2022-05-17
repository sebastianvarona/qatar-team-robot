import React, { useState } from 'react';
import background from '../images/qatarbg3.jpg';
import { Link } from 'react-router-dom';
import LandingLayout from '../components/LandingLayout';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const styles = {
    background: {
      backgroundImage: `url(${background})`,
    },
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <LandingLayout>
      <div className={`h-screen pt-20 px-12 relative mb-20`}>
        <div
          className={`w-full h-full rounded-2xl bg-top bg-cover overflow-hidden`}
          style={styles.background}
        >
          <div
            className={`w-full h-full flex items-center justify-center bg-purple-700/50`}
          >
            <form
              onSubmit={handleSubmit}
              className={`p-12 rounded-3xl w-full max-w-3xl backdrop-blur-md bg-purple-800/25 shadow-md`}
            >
              <h1 className={`text-4xl font-extrabold text-purple-100`}>
                Sign In
              </h1>
              <div
                className={`w-full grid grid-cols-2 grid-flow-row gap-8 mt-8`}
              >
                <div className={`flex flex-col items-start`}>
                  <label
                    htmlFor="username"
                    className={`text-xl font-semibold text-white/75 mb-3`}
                  >
                    Username:
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Type your username..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={`rounded-xl bg-transparent text-white/75 border-white/75 placeholder:text-white/75 w-full mb-4`}
                  />
                </div>
                <div className={`flex flex-col items-start`}>
                  <label
                    htmlFor="password"
                    className={`text-xl font-semibold text-white/75 mb-3`}
                  >
                    Password:
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Type your password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`rounded-xl bg-transparent text-white/75 border-white/75 placeholder:text-white/75 w-full`}
                  />
                </div>
              </div>
              {/* SPANS */}
              <div className={`flex flex-col items-start mt-8`}>
                <span className={`block mb-2`}>
                  Don't have an account yet?{' '}
                  <Link to={'/sign-up'}>
                    {' '}
                    <span
                      className={`underline underline-offset-4 text-white/50 ml-4 hover:text-white transition`}
                    >
                      Register here
                    </span>{' '}
                  </Link>
                </span>
                {/* <span className={`block`}>
                  Want to be a creator?{" "}
                  <Link to={"/sign-up"}>
                    {" "}
                    <span
                      className={`underline underline-offset-4 text-white/50 ml-4 hover:text-white transition`}
                    >
                      Creator register here
                    </span>{" "}
                  </Link>
                </span> */}
              </div>
              <div className={`text-xl`}>
                <button
                  className={`bg-purple-600/75 hover:bg-purple-600 transition py-1 px-10 rounded-xl font-semibold mt-8`}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
