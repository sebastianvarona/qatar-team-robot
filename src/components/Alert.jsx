import React from 'react';

export default function Alert(props) {
  return (
    <div
      className={`absolute z-10 w-screen h-screen top-0 left-0 bg-black/50 flex justify-center items-center ${
        props.visible === true ? '' : 'hidden'
      }`}
    >
      <div className={`bg-white rounded-2xl`}>
        <h1 className={`text-4xl font-bold`}>{props.msg}</h1>
      </div>
    </div>
  );
}
