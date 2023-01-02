import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

const style = {
  li: `flex justify-between bg-slate-200 p-4 my-2 capitalize`,
  liComplete: `flex justify-between bg-slate-400 p-4 my-2 capitalize`,
  row: `flex`,
  text: `ml-2 cursor-pointer`,
  textComplete: `ml-2 cursor-pointer line-through`,
  button: `cursor-pointer flex items-center`,
  container: `flex row p-8`,
  inputBox: `h-20 w-20 border border-gray-200 bg-black text-white text-3xl text-center`,
};

const Attempt = ({ word, guess, isGuessed }) => {
  const teller = 1;

  return (
    <div className={style.container}>
      <form onSubmit={null}>
        <div>
          <input
            className={style.inputBox}
            // onChange={e => setEmail(e.target.value)}
            // className='border p-3'
            type='email'
            maxLength={1}
          />
          <input
            className={style.inputBox}
            // onChange={e => setEmail(e.target.value)}
            // className='border p-3'
            type='email'
          />
          <input
            className={style.inputBox}
            // onChange={e => setEmail(e.target.value)}
            // className='border p-3'
            type='email'
          />
          <input
            className={style.inputBox}
            // onChange={e => setEmail(e.target.value)}
            // className='border p-3'
            type='email'
          />
          <input
            className={style.inputBox}
            // onChange={e => setEmail(e.target.value)}
            // className='border p-3'
            type='email'
          />
          <input
            className={style.inputBox}
            // onChange={e => setEmail(e.target.value)}
            // className='border p-3'
            type='email'
          />
          <input
            className={style.inputBox}
            // onChange={e => setEmail(e.target.value)}
            // className='border p-3'
            type='email'
          />
          <input
            className={style.inputBox}
            // onChange={e => setEmail(e.target.value)}
            // className='border p-3'
            type='email'
          />
        </div>
      </form>
    </div>
  );
};

export default Attempt;
