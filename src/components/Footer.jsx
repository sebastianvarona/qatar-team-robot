import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="mx-12 p-4 bg-purple-600/75 shadow md:px-6 md:py-8 rounded-t-3xl">
      <div className="sm:flex sm:items-center sm:justify-between">
        <span className="flex items-center mb-4 sm:mb-0">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="self-center text-2xl font-black pl-3 whitespace-nowrap dark:text-white">
            Qatar 2022 Predictions
          </span>
        </span>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <ul className="flex gap-4 justify-center mb-8">
        <Link to={`/`}>
          <li className="hover:underline text-lg">Landing page</li>
        </Link>
        <Link to={`/dashboard`}>
          <li className="hover:underline text-lg">Dashboard page</li>
        </Link>
        <Link to={`/admin`}>
          <li className="hover:underline text-lg">Admin page</li>
        </Link>
      </ul>
      <span className="block text-sm sm:text-center dark:text-gray-400">
        © 2022{' '}
        <a href="https://flowbite.com" className="hover:underline">
          Team Robot
        </a>
        . All Rights Reserved.
      </span>
    </footer>
  );
}

export default Footer;
