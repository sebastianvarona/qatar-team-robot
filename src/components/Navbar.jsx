import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-neutral-900 h-20 flex items-center px-12 fixed top-0 letf-0 w-full z-40">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        {/* Brand */}
        <span className="flex items-center">
          <span className="self-center text-xl font-black whitespace-nowrap">
            Qatar 2022 Predictions
          </span>
        </span>
        <ul className={`flex gap-4 items-center`}>
          <li>
            <Navlink link={'/'} content={`About`} />
          </li>
          <li>
            <Navlink link={'/sign-in'} content={`Sign in`} />
          </li>
          <Link to={`/sign-up`}>
            <li>
              <button
                className={`font-medium px-4 py-2 bg-purple-700/75 hover:bg-purple-700 rounded-xl transition`}
              >
                Sign Up
              </button>
            </li>
          </Link>
        </ul>
      </div>
    </nav>
  );
}

const Navlink = ({ link, content }) => {
  return (
    <Link to={link}>
      <li>
        <button
          className={`font-medium px-4 py-1 hover:bg-purple-700/75 rounded-2xl transition`}
        >
          {content}
        </button>
      </li>
    </Link>
  );
};
