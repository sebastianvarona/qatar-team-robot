import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import background from '../images/qatarbg5.jpg';
import axios from 'axios';

export default function Dashboard() {
  const [showUserD, setShowUserD] = useState(false);
  const [activeTab, setActiveTab] = useState('');
  const [ranking, setRanking] = useState([]);
  const [aMatches, setAMatches] = useState([]);

  const styles = {
    header: {
      backgroundImage: `url('${background}')`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    },
  };

  const UserDropdown = () => {
    return (
      <>
        {/* Dropdown */}
        <div
          onClick={() => {
            setShowUserD(false);
          }}
          className={`absolute top-0 left-0 z-20 h-screen w-screen ${
            showUserD ? '' : 'hidden'
          }`}
        ></div>
        <div className="relative z-30">
          <button
            onClick={() => {
              setShowUserD(!showUserD);
            }}
            className={`bg-purple-500/75 hover:bg-purple-700 transition rounded-full p-1`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>

          <div
            className={`absolute top-10 right-0 overflow-hidden bg-purple-700/50 backdrop-blur-sm shadow-sm rounded-lg ${
              showUserD ? '' : 'hidden'
            }`}
          >
            <button className="block hover:bg-purple-700 py-2 px-4">
              logout
            </button>
          </div>
        </div>
      </>
    );
  };

  const TabButton = (props) => {
    return (
      <button
        onClick={() => {
          setActiveTab(props.text);
          console.log(ranking);
        }}
        className={`rounded-lg px-4 py-1 capitalize font-semibold hover:bg-purple-500/50 transition ${
          activeTab === props.text
            ? 'bg-purple-700/50 backdrop-blur-md shadow-md'
            : ''
        }`}
      >
        {props.text}
      </button>
    );
  };

  useEffect(() => {
    console.log(window.sessionStorage.getItem('userId'));
    axios({
      method: 'get',
      url: 'https://sebasrestapi.azurewebsites.net/user',
    }).then(function (response) {
      setRanking(
        response.data.sort(function (a, b) {
          return b.points - a.points;
        })
      );
    });
    axios({
      method: 'get',
      url: 'https://sebasrestapi.azurewebsites.net/match',
    }).then(function (response) {
      setAMatches(response.data);
    });
  }, []);

  return (
    <div className="mx-auto min-h-screen flex flex-col justify-between">
      {/* Header */}
      <div
        className={`mx-12 h-[40vh] rounded-b-3xl overflow-hidden relative`}
        style={styles.header}
      >
        <div
          className={`bg-purple-700/50 absolute top-0 left-0 w-full h-full`}
        ></div>
        <nav className="h-20 flex items-center px-12 relative z-20">
          <div className="container flex flex-wrap justify-between items-center mx-auto">
            {/* Brand */}
            <span className="flex items-center">
              <span className="self-center text-xl font-black whitespace-nowrap">
                Qatar 2022 Predictions
              </span>
            </span>
            <ul className={`flex gap-4 items-center`}>
              <UserDropdown setShowUserD={setShowUserD} />
            </ul>
          </div>
        </nav>
        <div className="absolute bottom-0 left-0 w-full mb-12 z-10">
          <div className="flex px-12 gap-8 items-center">
            <div className={`w-32 h-32 rounded-full bg-green-500`}></div>
            <div className={``}>
              <h1 className={`text-5xl font-black`}>Welcome User</h1>
              <p className={`text-white/50  text-xl text-left`}>@user</p>
            </div>
          </div>
          <div className={`mx-12 flex justify-end gap-6 items-center`}>
            <TabButton text={`ranking`} />
            <TabButton text={`matches`} />
            <TabButton text={`history`} />
          </div>
        </div>
      </div>
      <div className={`max-w-7xl mx-auto flex flex-col items-center`}>
        <h1 className={`capitalize text-5xl my-8 font-bold`}>{activeTab}</h1>
        {/* Ranking */}
        <div
          className={`border rounded-2xl py-8 ${
            activeTab === 'ranking' ? '' : 'hidden'
          }`}
        >
          <table class="table-auto text-left">
            <thead>
              <tr>
                <th className={`px-8 py-2 text-xl`}>#</th>
                <th className={`px-8 py-2 text-xl`}>Name</th>
                <th className={`px-8 py-2 text-xl`}>Score</th>
              </tr>
            </thead>
            <tbody>
              {ranking.map((r, i) => {
                return (
                  <tr key={i + 1}>
                    <td className={`px-8 py-2`}>{i + 1}</td>
                    <td className={`px-8 py-2`}>
                      {r.name + ' ' + r.last_name}
                    </td>
                    <td className={`px-8 py-2`}>{r.points}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* Matches */}
        <div
          className={`grid grid-cols-3 grid-flow-row gap-6 w-full ${
            activeTab === 'matches' ? '' : 'hidden'
          }`}
        >
          {aMatches.map((m, i) => {
            return (
              <div
                key={i}
                className={`border rounded-2xl flex flex-col w-full gap-4 items-center p-8`}
              >
                <h3 className={`font-semibold text-3xl`}>{m.group}</h3>
                <div className={`flex gap-4`}>
                  <label className="capitalize text-xl">{m.local}</label>
                  <input
                    type="text"
                    className="bg-neutral-800 rounded-xl h-8 w-12 text-center"
                  />
                  <span className="font-bold flex items-center">VS</span>
                  <input
                    type="text"
                    className="bg-neutral-800 rounded-xl h-8 w-12 text-center"
                  />
                  <label className="capitalize text-xl">{m.visit}</label>
                </div>
                <div className={`flex flex-col gap-4`}>
                  <button className="bg-green-500 rounded-2xl px-4 py-2 capitalize">
                    apply prediction
                  </button>
                  <span>
                    {m.month + '-' + m.day + ' ' + m.hour + ':' + m.minutes}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        {/* History */}
        <div
          className={`grid grid-cols-2 grid-flow-row gap-8 w-full ${
            activeTab === 'history' ? '' : 'hidden'
          }`}
        >
          <div>
            <h4 className="text-4xl font-bold mb-8">Pending Matches</h4>
            <div className="grid grid-cols-1 grid-flow-row gap-4">
              <div
                className={`border rounded-2xl flex flex-col w-full gap-2 items-center p-4`}
              >
                <h3 className={`font-bold text-3xl`}>Group B</h3>
                <div className={`flex gap-4`}>
                  <label className="capitalize text-xl">argentina</label>
                  <span className="text-xl">
                    ( <span className="font-bold text-xl">2</span> )
                  </span>
                  <span className="font-bold flex items-center">VS</span>
                  <span className="text-xl">
                    ( <span className="font-bold text-xl">3</span> )
                  </span>
                  <label className="capitalize text-xl">Poland</label>
                </div>
                <div className={`flex flex-col gap-4`}>
                  <button className="bg-orange-500 rounded-2xl px-4 py-2 capitalize">
                    edit prediction
                  </button>
                  <span>11-12-2022 16:30</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-4xl font-bold mb-8">Completed Matches</h4>
            <div className="grid grid-cols-1 grid-flow-row gap-4">
              <div
                className={`border rounded-2xl flex flex-col w-full gap-2 items-center p-4`}
              >
                <h3 className={`font-bold text-3xl`}>Group H</h3>
                <div className={`flex gap-4`}>
                  <label className="capitalize text-xl">germany</label>
                  <span className="text-xl">
                    ({' '}
                    <span className="font-bold text-xl text-green-500">4</span>{' '}
                    )
                  </span>
                  <span className="font-bold flex items-center">VS</span>
                  <span className="text-xl">
                    ( <span className="font-bold text-xl text-red-500">1</span>{' '}
                    )
                  </span>
                  <label className="capitalize text-xl">poland</label>
                </div>
                <div className={`flex flex-col gap-4`}>
                  <span>11-12-2022 16:30</span>
                  <span className="text-2xl font-black">Score 2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-20"></div>
      <Footer />
    </div>
  );
}
