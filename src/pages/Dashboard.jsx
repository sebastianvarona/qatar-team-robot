import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import background from '../images/qatarbg5.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [showUserD, setShowUserD] = useState(false);
  const [activeTab, setActiveTab] = useState('');
  const [ranking, setRanking] = useState([]);
  const [aMatches, setAMatches] = useState([]);
  const [pMatches, setPMatches] = useState([]);
  const [puntosLocal, setPuntosLocal] = useState(0);
  const [puntosVisitante, setPuntosVisitante] = useState(0);
  const [msgMatches, setMsgMatches] = useState('');

  const styles = {
    header: {
      backgroundImage: `url('${background}')`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    },
  };

  let navigate = useNavigate();
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
            <button
              onClick={() => {
                window.sessionStorage.removeItem('userId');
                navigate(`/sign-in`);
              }}
              className="block hover:bg-purple-700 py-2 px-4"
            >
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

  const createPrediction = (m) => {
    axios
      .post('https://sebasrestapi.azurewebsites.net/prediction', {
        matchId: m._id,
        userId: window.sessionStorage.getItem('userId'),
        local_goals: puntosLocal,
        visit_goals: puntosVisitante,
      })
      .then(function (response) {
        console.log(response);
        if (response.status === 201) {
          setMsgMatches('Created successfully');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
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

    axios({
      method: 'get',
      url:
        'https://sebasrestapi.azurewebsites.net/prediction/running/' +
        window.sessionStorage.getItem('userId'),
    }).then(function (response) {
      setPMatches(response.data);
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
        <span className={`my-4`}>{msgMatches}</span>
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
                    onChange={(e) => {
                      setPuntosLocal(e.target.value);
                    }}
                    type="text"
                    className="bg-neutral-800 rounded-xl h-8 w-12 text-center"
                  />
                  <span className="font-bold flex items-center">VS</span>
                  <input
                    onChange={(e) => {
                      setPuntosVisitante(e.target.value);
                    }}
                    type="text"
                    className="bg-neutral-800 rounded-xl h-8 w-12 text-center"
                  />
                  <label className="capitalize text-xl">{m.visit}</label>
                </div>
                <div className={`flex flex-col gap-4`}>
                  <button
                    onClick={() => {
                      createPrediction(m);
                    }}
                    className="bg-green-500 rounded-2xl px-4 py-2 capitalize"
                  >
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
              {pMatches.map((m, i) => {
                if (m.prediction.isFinished === false) {
                  return (
                    <div
                      key={i}
                      className={`border rounded-2xl flex flex-col w-full gap-2 items-center p-4`}
                    >
                      <h3 className={`font-bold text-3xl`}>{m.match.group}</h3>
                      <div className={`flex gap-4`}>
                        <label className="capitalize text-xl">
                          {m.match.local}
                        </label>
                        <span className="text-xl">
                          ({' '}
                          <span className="font-bold text-xl">
                            {m.prediction.local_goals}
                          </span>{' '}
                          )
                        </span>
                        <span className="font-bold flex items-center">VS</span>
                        <span className="text-xl">
                          ({' '}
                          <span className="font-bold text-xl">
                            {m.prediction.visit_goals}
                          </span>{' '}
                          )
                        </span>
                        <label className="capitalize text-xl">
                          {m.match.visit}
                        </label>
                      </div>
                      <div className={`flex flex-col gap-4`}>
                        <button className="bg-orange-500 rounded-2xl px-4 py-2 capitalize">
                          edit prediction
                        </button>
                        <span>
                          {m.match.month +
                            '-' +
                            m.match.day +
                            ' ' +
                            m.match.hour +
                            ':' +
                            m.match.minutes}
                        </span>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div>
            <h4 className="text-4xl font-bold mb-8">Completed Matches</h4>
            <div className="grid grid-cols-1 grid-flow-row gap-4">
              {pMatches.map((m, i) => {
                if (m.prediction.isFinished === true) {
                  return (
                    <div
                      key={i}
                      className={`border rounded-2xl flex flex-col w-full gap-2 items-center p-4`}
                    >
                      <h3 className={`font-bold text-3xl`}>{m.match.group}</h3>
                      <div className={`flex gap-4`}>
                        <label className="capitalize text-xl">
                          {m.match.local}
                        </label>
                        <span className="text-xl">
                          ({' '}
                          <span
                            className={`font-bold text-xl ${
                              m.prediction.isLocalGoalsGuessed
                                ? 'text-green-500'
                                : 'text-red-500'
                            }`}
                          >
                            {m.prediction.local_goals}
                          </span>{' '}
                          )
                        </span>
                        <span className="font-bold flex items-center">VS</span>
                        <span className="text-xl">
                          ({' '}
                          <span
                            className={`font-bold text-xl ${
                              m.prediction.isVisitGoalsGuessed
                                ? 'text-green-500'
                                : 'text-red-500'
                            }`}
                          >
                            {m.prediction.visit_goals}
                          </span>{' '}
                          )
                        </span>
                        <label className="capitalize text-xl">
                          {m.match.visit}
                        </label>
                      </div>
                      <div className={`flex flex-col gap-4`}>
                        <span>
                          {m.match.month +
                            '-' +
                            m.match.day +
                            ' ' +
                            m.match.hour +
                            ':' +
                            m.match.minutes}
                        </span>
                        <span className="text-2xl font-black">
                          {m.prediction.totalPoints}
                        </span>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="h-20"></div>
      <Footer />
    </div>
  );
}
