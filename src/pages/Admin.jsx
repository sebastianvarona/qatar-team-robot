import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import background from '../images/qatarbg5.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const [showUserD, setShowUserD] = useState(false);
  const [showGroupD, setShowGroupD] = useState(false);
  const [aMatches, setAMatches] = useState([]);
  const [group, setGroup] = useState('');
  const [local, setLocal] = useState('');
  const [visitante, setVisitante] = useState('');
  const [mes, setMes] = useState(0);
  const [dia, setDia] = useState(0);
  const [horas, setHoras] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [lg, setLG] = useState(0);
  const [vg, setVG] = useState(0);
  const [msg, setMsg] = useState('');

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
  const GroupDropdown = () => {
    return (
      <>
        {/* Dropdown */}
        <div
          onClick={() => {
            setShowGroupD(false);
          }}
          className={`absolute top-0 left-0 z-20 h-screen w-screen ${
            showGroupD ? '' : 'hidden'
          }`}
        ></div>
        <div className="relative z-30">
          <button
            onClick={() => {
              setShowGroupD(!showGroupD);
            }}
            className={`bg-neutral-800 capitalize px-4 transition rounded-full p-1`}
          >
            select group
          </button>

          <div
            className={`absolute top-10 left-0 overflow-hidden bg-neutral-700 shadow-sm rounded-lg ${
              showGroupD ? '' : 'hidden'
            }`}
          >
            <button
              onClick={() => {
                setGroup('A');
              }}
              className="block hover:bg-neutral-800 py-1 px-4 whitespace-nowrap"
            >
              Group A
            </button>
            <button
              onClick={() => {
                setGroup('B');
              }}
              className="block hover:bg-neutral-800 py-1 px-4 whitespace-nowrap"
            >
              Group B
            </button>
            <button
              onClick={() => {
                setGroup('C');
              }}
              className="block hover:bg-neutral-800 py-1 px-4 whitespace-nowrap"
            >
              Group C
            </button>
            <button
              onClick={() => {
                setGroup('D');
              }}
              className="block hover:bg-neutral-800 py-1 px-4 whitespace-nowrap"
            >
              Group D
            </button>
            <button
              onClick={() => {
                setGroup('E');
              }}
              className="block hover:bg-neutral-800 py-1 px-4 whitespace-nowrap"
            >
              Group E
            </button>
            <button
              onClick={() => {
                setGroup('F');
              }}
              className="block hover:bg-neutral-800 py-1 px-4 whitespace-nowrap"
            >
              Group F
            </button>
            <button
              onClick={() => {
                setGroup('G');
              }}
              className="block hover:bg-neutral-800 py-1 px-4 whitespace-nowrap"
            >
              Group G
            </button>
            <button
              onClick={() => {
                setGroup('H');
              }}
              className="block hover:bg-neutral-800 py-1 px-4 whitespace-nowrap"
            >
              Group H
            </button>
          </div>
        </div>
      </>
    );
  };

  const handleSubmit = () => {
    axios
      .post('https://sebasrestapi.azurewebsites.net/match', {
        local: local,
        visit: visitante,
        day: dia,
        month: mes,
        hour: horas,
        minutes: minutos,
        group: 'Grupo ' + group,
      })
      .then(function (response) {
        console.log(response);
        if (response.status === 201) {
          setMsg('Registrado correctamente');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getMatches = () => {
    axios({
      method: 'get',
      url: 'https://sebasrestapi.azurewebsites.net/match',
    }).then(function (response) {
      setAMatches(response.data);
    });
  };
  const endMatch = (m) => {
    axios
      .post('https://sebasrestapi.azurewebsites.net/match/finish', {
        _id: m._id,
        local: m.local,
        visit: m.visit,
        day: m.day,
        month: m.month,
        hour: m.hour,
        minutes: m.minutes,
        group: m.group,
        local_goals: lg,
        visit_goals: vg,
        is_finished: true,
      })
      .then(function (response) {
        console.log(response);
        if (response.status === 201) {
          setMsg('Registrado correctamente');
          getMatches();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getMatches();
  }, []);

  return (
    <div className="mx-auto">
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
            <div className={``}>
              <h1 className={`text-5xl font-black`}>Welcome Admin</h1>
            </div>
          </div>
        </div>
      </div>
      <div className={`max-w-7xl mx-auto flex flex-col items-center pt-8`}>
        {/* Add match */}
        <div className={`grid grid-cols-2 grid-flow-row gap-6 w-full`}>
          <div
            className={`border rounded-2xl flex flex-col w-full gap-4 items-center p-8`}
          >
            <h3 className={`font-semibold text-3xl`}>Group {group}</h3>
            <GroupDropdown />
            <div className={`flex gap-4`}>
              <input
                onChange={(e) => {
                  setLocal(e.target.value);
                }}
                type="text"
                className="bg-neutral-800 rounded-xl h-8 w-36 text-center"
              />
              <span className="font-bold flex items-center">VS</span>
              <input
                onChange={(e) => {
                  setVisitante(e.target.value);
                }}
                type="text"
                className="bg-neutral-800 rounded-xl h-8 w-36 text-center"
              />
            </div>
            <div className={`flex gap-4`}>
              <label className="flex items-center">Mes</label>
              <input
                onChange={(e) => {
                  setMes(e.target.value);
                }}
                type="text"
                className="bg-neutral-800 rounded-xl h-8 w-12 text-center"
              />
              <label className="flex items-center">Dia</label>
              <input
                onChange={(e) => {
                  setDia(e.target.value);
                }}
                type="text"
                className="bg-neutral-800 rounded-xl h-8 w-12 text-center"
              />
            </div>
            <div className={`flex gap-4`}>
              <label className="flex items-center">Horas</label>
              <input
                onChange={(e) => {
                  setHoras(e.target.value);
                }}
                type="text"
                className="bg-neutral-800 rounded-xl h-8 w-12 text-center"
              />
              <label className="flex items-center">Minutos</label>
              <input
                onChange={(e) => {
                  setMinutos(e.target.value);
                }}
                type="text"
                className="bg-neutral-800 rounded-xl h-8 w-12 text-center"
              />
            </div>
            <div className={`flex flex-col gap-4`}>
              <button
                onClick={() => {
                  handleSubmit();
                }}
                className="bg-green-500 rounded-2xl px-4 py-2 capitalize"
              >
                add match
              </button>
            </div>
            <span className={`my-2`}>{msg}</span>
          </div>
          <div
            className={`border rounded-2xl flex flex-col w-full gap-4 items-center p-8`}
          >
            <h3 className={`font-semibold text-3xl`}>Matches in progress</h3>
            <div className={`w-full`}>
              <table class="table-auto text-left">
                <tbody>
                  {aMatches.map((m, i) => {
                    return (
                      <tr>
                        <td className={`px-4 py-2`}>{i + 1}</td>
                        <td className={`px-4 py-2`}>
                          <div className={`w-full gap-4 items-center`}>
                            <div className={`flex gap-4`}>
                              <label className="capitalize text-lg">
                                {m.local}
                              </label>
                              <input
                                onChange={(e) => {
                                  setLG(e.target.value);
                                }}
                                type="text"
                                className="bg-neutral-800 rounded-xl h-8 w-12 text-center"
                              />
                              <span className="font-bold flex items-center">
                                VS
                              </span>
                              <input
                                onChange={(e) => {
                                  setVG(e.target.value);
                                }}
                                type="text"
                                className="bg-neutral-800 rounded-xl h-8 w-12 text-center"
                              />
                              <label className="capitalize text-xl">
                                {m.visit}
                              </label>
                            </div>
                          </div>
                        </td>
                        <td className={`px-4 py-2`}>
                          <button
                            onClick={() => {
                              endMatch(m);
                            }}
                            className="bg-green-500 rounded-2xl px-4 py-2 capitalize"
                          >
                            apply
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="h-20"></div>
      <Footer />
    </div>
  );
}
