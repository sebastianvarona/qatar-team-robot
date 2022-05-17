import React from 'react';
import background from '../images/qatarbg1.jpg';
import tournamentsBackground from '../images/qatarbg2.jpg';
import LandingLayout from '../components/LandingLayout';

export default function Home() {
  const styles = {
    header: {
      backgroundImage: `url(${background})`,
      backgroundPosition: 'center',
    },
    tournaments: {
      backgroundImage: `url(${tournamentsBackground})`,
      backgroundPosition: 'top',
    },
  };
  return (
    <LandingLayout>
      {/* HEADER */}
      <div className={`h-screen pt-20 px-12 pb-12 relative mb-20`}>
        <div
          className={`w-full h-full rounded-2xl bg-top bg-cover overflow-hidden`}
          style={styles.header}
        >
          <div
            className={`w-full h-full flex flex-col justify-center bg-purple-700/50`}
          >
            <h2 className={`text-6xl font-extrabold text-purple-300`}>
              Take control of your
            </h2>
            <h1 className={`text-8xl font-black italic text-shadow-lg`}>
              Predictions
            </h1>
          </div>
        </div>
      </div>

      {/* What is connect n play */}
      <div className={`mb-20`}>
        <h3 className={`font-black text-4xl mb-6`}>
          What is Qatar 2022 Predictions
        </h3>
        <p className={`text-white/75 text-xl max-w-2xl mx-auto`}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id corrupti
          quod officia iste aliquam veniam. Temporibus omnis consectetur aliquid
          illum? Tempora maxime nostrum mollitia eos dolorum, eaque eligendi sit
          iusto.
        </p>
      </div>

      {/* FEATURES */}
      <div className={`mb-20 grid grid-cols-3 gap-6 mx-10`}>
        <FeatureComponent
          title="Verified Matches"
          icon={
            <svg
              className="w-16 h-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          }
        />
        <FeatureComponent
          title="Users Ranking"
          icon={
            <svg
              className="w-16 h-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
              />
            </svg>
          }
        />
        <FeatureComponent
          title="Follow the matches you want"
          icon={
            <svg
              className="w-16 h-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          }
        />
      </div>

      {/* TOURNAMENTS */}
      <div className={`pt-20 px-12 relative mb-20`}>
        <div
          className={`w-full h-full rounded-2xl bg-top bg-cover overflow-hidden`}
          style={styles.tournaments}
        >
          <div
            className={`w-full h-full grid grid-cols-2 gap-6 justify-center bg-purple-700/50 px-12 py-32`}
          >
            <h3 className={`text-6xl font-extrabold text-purple-100 text-left`}>
              Keep an eye in your
              <br />
              matches
            </h3>
            <p
              className={`h-full flex items-center text-purple-100 text-left text-xl`}
            >
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Distinctio fuga rem vero possimus dolorum dolor dolores, culpa sed
              quaerat.
            </p>
          </div>
        </div>
      </div>

      {/* Ranking */}
      <div className={`pt-20 px-12 relative mb-20`}>
        <div
          className={`w-full h-full grid grid-cols-2 gap-6 justify-center px-12 pb-12`}
        >
          <p
            className={`h-full flex items-center text-purple-100 text-right text-xl`}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
            officia ut illum aperiam, ipsum quam ipsam saepe at magnam natus
            esse eligendi inventore quod ab nostrum rem adipisci minus sint.
          </p>
          <h3 className={`text-6xl font-extrabold text-purple-100 text-right`}>
            Participate in
            <br />
            the ranking
          </h3>
        </div>
      </div>
    </LandingLayout>
  );
}

const FeatureComponent = (props) => {
  return (
    <div className={`flex flex-col items-center`}>
      <div>{props.icon}</div>
      <h4 className={`text-2xl font-black pt-2 text-white/75`}>
        {props.title}
      </h4>
    </div>
  );
};
