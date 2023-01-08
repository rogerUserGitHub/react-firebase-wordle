import React, { useState, useEffect } from 'react';
import Keyboard from './Keyboard';

const style = {
  row: `flex`,
  text: `ml-2 cursor-pointer`,
  button: `cursor-pointer flex items-center`,
  container: `flex row pl-8 pt-1`,
  inputBox: `h-20 w-20 border p-3 border-gray-200 bg-black text-white text-3xl text-center`,
  inputBoxGreen: `h-20 w-20 border p-3 border-black-500 bg-green-500 text-black text-3xl text-center`,
  inputBoxRed: `h-20 w-20 border p-3 border-black-500 bg-red-500 text-black text-3xl text-center`,
  inputBoxOrange: `h-20 w-20 border p-3 border-black-500 bg-orange-500 text-black text-3xl text-center`,
};

const Attempt = ({ word, handleNumberOfTries, isGuessed }) => {
  const [attempt, setAttempt] = useState([]);
  const [lastAttempt, setLastAttempt] = useState([]);
  const [styleChange, setStyleChange] = useState([]);

  const [disableRow1, setDisableRow1] = useState(false);
  const [disableRow2, setDisableRow2] = useState(true);
  const [disableRow3, setDisableRow3] = useState(true);
  const [disableRow4, setDisableRow4] = useState(true);
  const [disableRow5, setDisableRow5] = useState(true);
  const [disableRow6, setDisableRow6] = useState(true);

  const stringLetters = word.split('');

  const passIsGuessedBack = () => {
    isGuessed(true);
  };

  const passNumberOfTriesBack = () => {
    handleNumberOfTries();
  };

  const handleInput = (letterInput, index) => {
    let arrayOfInputLetters = [...attempt];

    if (index !== -1) {
      arrayOfInputLetters[index] = letterInput;
    }
    setAttempt(arrayOfInputLetters);

    // eslint-disable-next-line default-case
    switch (arrayOfInputLetters.length) {
      case 5:
        checkMatch(arrayOfInputLetters);
        setDisableRow2(false);
        handleNumberOfTries();
        break;
      case 10:
        checkMatch(arrayOfInputLetters);
        setDisableRow3(false);
        passNumberOfTriesBack();
        break;
      case 15:
        checkMatch(arrayOfInputLetters);
        setDisableRow4(false);
        passNumberOfTriesBack();
        break;
      case 20:
        checkMatch(arrayOfInputLetters);
        setDisableRow5(false);
        passNumberOfTriesBack();
        break;
      case 25:
        checkMatch(arrayOfInputLetters);
        setDisableRow6(false);
        passNumberOfTriesBack();
        break;
      case 30:
        checkMatch(arrayOfInputLetters);
        passNumberOfTriesBack();
        break;
    }
  };

  // populate string array with colors based on match
  const checkMatch = arrayOfLetters => {
    let arrayOfStyleChanges = [...styleChange];
    let teller = 0;

    for (let i = 0; i < arrayOfLetters.length; i++) {
      // teller required, otherwise word lenght will be out of bounds
      if (teller === 5) {
        teller = 0;
      }
      if (arrayOfLetters[i] === '') {
        arrayOfStyleChanges[i] = 'black';
      }
      if (arrayOfLetters[i] !== stringLetters[teller]) {
        arrayOfStyleChanges[i] = 'red';
      }
      if (stringLetters.includes(arrayOfLetters[i])) {
        arrayOfStyleChanges[i] = 'orange';
      }
      if (arrayOfLetters[i] === stringLetters[teller]) {
        arrayOfStyleChanges[i] = 'green';
      }
      teller++;
    }
    setStyleChange(arrayOfStyleChanges);
  };

  // set style of boxes based on styleChange const
  const determineStyle = indexNumber => {
    if (styleChange[indexNumber] === 'green') {
      return style.inputBoxGreen;
    } else if (styleChange[indexNumber] === 'red') {
      return style.inputBoxRed;
    } else if (styleChange[indexNumber] === 'orange') {
      return style.inputBoxOrange;
    } else if (styleChange[indexNumber] === 'black') {
      return style.inputBox;
    } else {
      return style.inputBox;
    }
  };

  /*
   * side effects
   */
  useEffect(() => {
    if (styleChange?.length > 5) {
      setLastAttempt(styleChange?.slice(-5));
    } else {
      setLastAttempt(styleChange);
    }
  }, [styleChange]);

  useEffect(() => {
    if (lastAttempt.filter(v => v === 'green').length === 5) {
      passIsGuessedBack();
      console.log('finished');
    }
  }, [lastAttempt]);

  /*
   * render
   */
  return (
    <>
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
              disabled={disableRow2}
            />
            <input
              className={determineStyle(6)}
              onChange={e => handleInput(e.target.value, 6)}
              type='text'
              maxLength={1}
              id={7}
              disabled={disableRow2}
            />
            <input
              className={determineStyle(7)}
              onChange={e => handleInput(e.target.value, 7)}
              type='text'
              maxLength={1}
              id={8}
              disabled={disableRow2}
            />
            <input
              className={determineStyle(8)}
              onChange={e => handleInput(e.target.value, 8)}
              type='text'
              maxLength={1}
              id={9}
              disabled={disableRow2}
            />
            <input
              className={determineStyle(9)}
              onChange={e => handleInput(e.target.value, 9)}
              type='text'
              maxLength={1}
              id={10}
              disabled={disableRow2}
            />
            <input
              className={determineStyle(10)}
              onChange={e => handleInput(e.target.value, 10)}
              type='text'
              maxLength={1}
              id={11}
              disabled={disableRow3}
            />
            <input
              className={determineStyle(11)}
              onChange={e => handleInput(e.target.value, 11)}
              type='text'
              maxLength={1}
              id={12}
              disabled={disableRow3}
            />
            <input
              className={determineStyle(12)}
              onChange={e => handleInput(e.target.value, 12)}
              type='text'
              maxLength={1}
              id={13}
              disabled={disableRow3}
            />
            <input
              className={determineStyle(13)}
              onChange={e => handleInput(e.target.value, 13)}
              type='text'
              maxLength={1}
              id={14}
              disabled={disableRow3}
            />
            <input
              className={determineStyle(14)}
              onChange={e => handleInput(e.target.value, 14)}
              type='text'
              maxLength={1}
              id={15}
              disabled={disableRow3}
            />
            <input
              className={determineStyle(15)}
              onChange={e => handleInput(e.target.value, 15)}
              type='text'
              maxLength={1}
              id={16}
              disabled={disableRow4}
            />
            <input
              className={determineStyle(16)}
              onChange={e => handleInput(e.target.value, 16)}
              type='text'
              maxLength={1}
              id={17}
              disabled={disableRow4}
            />
            <input
              className={determineStyle(17)}
              onChange={e => handleInput(e.target.value, 17)}
              type='text'
              maxLength={1}
              id={18}
              disabled={disableRow4}
            />
            <input
              className={determineStyle(18)}
              onChange={e => handleInput(e.target.value, 18)}
              type='text'
              maxLength={1}
              id={19}
              disabled={disableRow4}
            />
            <input
              className={determineStyle(19)}
              onChange={e => handleInput(e.target.value, 19)}
              type='text'
              maxLength={1}
              id={20}
              disabled={disableRow4}
            />
            <input
              className={determineStyle(20)}
              onChange={e => handleInput(e.target.value, 20)}
              type='text'
              maxLength={1}
              id={21}
              disabled={disableRow5}
            />
            <input
              className={determineStyle(21)}
              onChange={e => handleInput(e.target.value, 21)}
              type='text'
              maxLength={1}
              id={11}
              disabled={disableRow5}
            />
            <input
              className={determineStyle(22)}
              onChange={e => handleInput(e.target.value, 22)}
              type='text'
              maxLength={1}
              id={12}
              disabled={disableRow5}
            />
            <input
              className={determineStyle(23)}
              onChange={e => handleInput(e.target.value, 23)}
              type='text'
              maxLength={1}
              id={13}
              disabled={disableRow5}
            />
            <input
              className={determineStyle(24)}
              onChange={e => handleInput(e.target.value, 24)}
              type='text'
              maxLength={1}
              id={14}
              disabled={disableRow5}
            />
            <input
              className={determineStyle(25)}
              onChange={e => handleInput(e.target.value, 25)}
              type='text'
              maxLength={1}
              id={15}
              disabled={disableRow6}
            />
            <input
              className={determineStyle(26)}
              onChange={e => handleInput(e.target.value, 26)}
              type='text'
              maxLength={1}
              id={16}
              disabled={disableRow6}
            />
            <input
              className={determineStyle(27)}
              onChange={e => handleInput(e.target.value, 27)}
              type='text'
              maxLength={1}
              id={17}
              disabled={disableRow6}
            />
            <input
              className={determineStyle(28)}
              onChange={e => handleInput(e.target.value, 28)}
              type='text'
              maxLength={1}
              id={18}
              disabled={disableRow6}
            />
            <input
              className={determineStyle(29)}
              onChange={e => handleInput(e.target.value, 29)}
              type='text'
              maxLength={1}
              id={19}
              disabled={disableRow6}
            />
          </div>
        </form>
      </div>
      <Keyboard attempt={attempt} styleChange={styleChange} />
    </>
  );
};

export default Attempt;
