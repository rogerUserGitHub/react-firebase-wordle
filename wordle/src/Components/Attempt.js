import React, { useState, useEffect } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

const style = {
  row: `flex`,
  text: `ml-2 cursor-pointer`,
  button: `cursor-pointer flex items-center`,
  container: `flex row p-8`,
  inputBox: `h-20 w-20 border p-3 border-gray-200 bg-black text-white text-3xl text-center`,
  inputBoxGreen: `h-20 w-20 border p-3 border-black-500 bg-green-500 text-black text-3xl text-center`,
  inputBoxRed: `h-20 w-20 border p-3 border-black-500 bg-red-500 text-black text-3xl text-center`,
  inputBoxOrange: `h-20 w-20 border p-3 border-black-500 bg-orange-500 text-black text-3xl text-center`,
};

const Attempt = ({ word, guess, isGuessed, setStyling }) => {
  const [attempt, setAttempt] = useState([]);
  const [styleChange, setStyleChange] = useState([]);

  const [disableRow1, setDisableRow1] = useState(false);
  const [disableRow2, setDisableRow2] = useState(false);
  const [disableRow3, setDisableRow3] = useState(false);
  const [disableRow4, setDisableRow4] = useState(false);
  const [disableRow5, setDisableRow5] = useState(false);
  const [disableRow6, setDisableRow6] = useState(false);

  const stringLetters = word.split('');

  const handleInput = (letterInput, index) => {
    let arrayOfInputLetters = [...attempt];

    if (index !== -1) {
      arrayOfInputLetters[index] = letterInput;
    }
    setAttempt(arrayOfInputLetters);

    if (arrayOfInputLetters.length === 5) {
      checkMatch(arrayOfInputLetters);
      setDisableRow1(true);
    }
    if (arrayOfInputLetters.length === 10) {
      console.log('spring in 10');
      checkMatch(arrayOfInputLetters);
    }
  };

  // populate string array with colors based on match
  const checkMatch = array => {
    let arrayOfStyleChanges = [...styleChange];
    console.log(array);
    console.log(arrayOfStyleChanges);

    for (let i = 0; i < array.length; i++) {
      if (array[i] === stringLetters[i]) {
        arrayOfStyleChanges[i] = 'green';
      } else if (array[i] === '') {
        arrayOfStyleChanges[i] = 'black';
      } else {
        arrayOfStyleChanges[i] = 'red';
      }
    }
    setStyleChange(arrayOfStyleChanges);
  };

  // set style of boxes based on styleChange const
  const determineStyle = indexNumber => {
    if (styleChange[indexNumber] === 'green') {
      return style.inputBoxGreen;
    } else if (styleChange[indexNumber] === 'red') {
      return style.inputBoxRed;
    } else if (styleChange[indexNumber] === 'black') {
      return style.inputBox;
    } else {
      return style.inputBox;
    }
  };

  /*
   * side effects
   */
  //   useEffect(() => {
  //     console.log('trigg');
  //   }, [styleChange]);

  /*
   * render
   */
  return (
    <div className={style.container}>
      <form onSubmit={null}>
        <div>
          <input
            className={determineStyle(0)}
            onChange={e => handleInput(e.target.value, 0)}
            type='text'
            maxLength={1}
            id={1}
            disabled={disableRow1}
          />
          <input
            className={determineStyle(1)}
            onChange={e => handleInput(e.target.value, 1)}
            type='text'
            maxLength={1}
            id={2}
            disabled={disableRow1}
          />
          <input
            className={determineStyle(2)}
            onChange={e => handleInput(e.target.value, 2)}
            type='text'
            maxLength={1}
            id={3}
            disabled={disableRow1}
          />
          <input
            className={determineStyle(3)}
            onChange={e => handleInput(e.target.value, 3)}
            type='text'
            maxLength={1}
            id={4}
            disabled={disableRow1}
          />
          <input
            className={determineStyle(4)}
            onChange={e => handleInput(e.target.value, 4)}
            type='text'
            maxLength={1}
            id={5}
            disabled={disableRow1}
          />
          <input
            className={determineStyle(5)}
            onChange={e => handleInput(e.target.value, 5)}
            type='text'
            maxLength={1}
            id={6}
          />
          <input
            className={determineStyle(6)}
            onChange={e => handleInput(e.target.value, 6)}
            type='text'
            maxLength={1}
            id={7}
          />
          <input
            className={determineStyle(7)}
            onChange={e => handleInput(e.target.value, 7)}
            type='text'
            maxLength={1}
            id={8}
          />
          <input
            className={determineStyle(8)}
            onChange={e => handleInput(e.target.value, 8)}
            type='text'
            maxLength={1}
            id={9}
          />
          <input
            className={determineStyle(9)}
            onChange={e => handleInput(e.target.value, 9)}
            type='text'
            maxLength={1}
            id={10}
          />
          <input
            className={determineStyle(10)}
            onChange={e => handleInput(e.target.value, 10)}
            type='text'
            maxLength={1}
            id={11}
          />
          <input
            className={style.inputBox}
            // onChange={e => setEmail(e.target.value)}
            // className='border p-3'
            type='text'
            maxLength={1}
            id={12}
          />
          <input
            className={style.inputBox}
            // onChange={e => setEmail(e.target.value)}
            // className='border p-3'
            type='text'
            maxLength={1}
            id={13}
          />
          <input
            className={style.inputBox}
            // onChange={e => setEmail(e.target.value)}
            // className='border p-3'
            type='text'
            maxLength={1}
            id={14}
          />
          <input
            className={style.inputBox}
            // onChange={e => setEmail(e.target.value)}
            // className='border p-3'
            type='text'
            maxLength={1}
            id={15}
          />
          <input
            className={style.inputBox}
            // onChange={e => setEmail(e.target.value)}
            // className='border p-3'
            type='text'
            maxLength={1}
            id={16}
          />
          <input
            className={style.inputBox}
            // onChange={e => setEmail(e.target.value)}
            // className='border p-3'
            type='text'
            maxLength={1}
            id={17}
          />
          <input
            className={style.inputBox}
            // onChange={e => setEmail(e.target.value)}
            // className='border p-3'
            type='text'
            maxLength={1}
            id={18}
          />
          <input
            className={style.inputBox}
            // onChange={e => setEmail(e.target.value)}
            // className='border p-3'
            type='text'
            maxLength={1}
            id={19}
          />
          <input
            className={style.inputBox}
            // onChange={e => setEmail(e.target.value)}
            // className='border p-3'
            type='text'
            maxLength={1}
            id={20}
          />
          <input
            className={style.inputBox}
            // onChange={e => setEmail(e.target.value)}
            // className='border p-3'
            type='text'
            maxLength={1}
            id={21}
          />
        </div>
      </form>
    </div>
  );
};

export default Attempt;
