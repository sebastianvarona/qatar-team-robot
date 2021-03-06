import React, { useState } from 'react';
import background from '../images/qatarbg4.jpg';
import { Link } from 'react-router-dom';
import LandingLayout from '../components/LandingLayout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [fn, setFN] = useState('');
  const [ln, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const styles = {
    background: {
      backgroundImage: `url(${background})`,
    },
  };

  let navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(fn);
    console.log(ln);
    console.log(email);
    console.log(password);
    axios
      .post('https://sebasrestapi.azurewebsites.net/user', {
        name: fn,
        last_name: ln,
        email: email,
        pwd: password,
      })
      .then(function (response) {
        console.log(response);
        if (response.status === 201) {
          navigate(`/sign-in`);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
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
              className={`p-12 my-12 rounded-3xl w-full max-w-3xl backdrop-blur-md bg-purple-800/25 shadow-md`}
            >
              <h1 className={`text-4xl font-extrabold text-purple-100`}>
                Sign Up
              </h1>
              <div
                className={`w-full grid grid-cols-3 grid-flow-row gap-8 mt-8`}
              >
                {/* FName */}
                <label
                  htmlFor="fn"
                  className={`text-xl font-semibold text-white/75 text-right col-span-1 mb-3`}
                >
                  Name:
                </label>
                <input
                  type="text"
                  name="fn"
                  id="fn"
                  placeholder="Type your first name..."
                  value={fn}
                  onChange={(e) => setFN(e.target.value)}
                  className={`rounded-xl bg-transparent text-white/75 border-white/75 placeholder:text-white/75 w-full col-span-2`}
                />
                {/* LName */}
                <label
                  htmlFor="ln"
                  className={`text-xl font-semibold text-white/75 text-right col-span-1 mb-3`}
                >
                  Last Name:
                </label>
                <input
                  type="text"
                  name="ln"
                  id="ln"
                  placeholder="Type your last name..."
                  value={ln}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`rounded-xl bg-transparent text-white/75 border-white/75 placeholder:text-white/75 w-full col-span-2`}
                />
                {/* Email */}
                <label
                  htmlFor="email"
                  className={`text-xl font-semibold text-white/75 text-right col-span-1 mb-3`}
                >
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Type your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`rounded-xl bg-transparent text-white/75 border-white/75 placeholder:text-white/75 w-full col-span-2`}
                />
                {/* Password */}
                <label
                  htmlFor="password"
                  className={`text-xl font-semibold text-white/75 text-right col-span-1 mb-3`}
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
                  className={`rounded-xl bg-transparent text-white/75 border-white/75 placeholder:text-white/75 w-full col-span-2`}
                />
              </div>
              {/* SPANS */}
              <div className={`flex flex-col items-center mt-8`}>
                <span className={`block mb-2`}>
                  Already have an account?{' '}
                  <Link to={'/sign-in'}>
                    {' '}
                    <span
                      className={`underline underline-offset-4 text-white/50 ml-4 hover:text-white transition`}
                    >
                      Login here
                    </span>{' '}
                  </Link>
                </span>
              </div>
              <div className={`text-xl`}>
                <button
                  className={`bg-purple-600/75 hover:bg-purple-600 transition py-1 px-10 rounded-xl font-semibold mt-8`}
                >
                  Create account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
