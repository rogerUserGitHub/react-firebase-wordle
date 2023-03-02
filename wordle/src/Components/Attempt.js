import React, { useState, useEffect } from 'react';
import { AutoTabProvider } from 'react-auto-tab';

import Keyboard from './Keyboard';

const style = {
  container: `flex row pl-8 pt-1 pr-4`,
  inputContainer: `grid grid-cols-5 gap-2`,
  inputBox: `h-full w-full min-h-[20px] border p-3 border-gray-200 bg-black text-white text-3xl text-center`,
  inputBoxGreen: `h-full w-full min-h-[20px] border p-3 border-black-500 bg-green-500 text-black text-3xl text-center`,
  inputBoxRed: `h-full w-full min-h-[20px] border p-3 border-black-500 bg-red-500 text-black text-3xl text-center`,
  inputBoxOrange: `h-full w-full min-h-[20px] border p-3 border-black-500 bg-orange-500 text-black text-3xl text-center`,
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

  const inputs = [
    { id: 1, disabled: disableRow1, valueIndex: 0 },
    { id: 2, disabled: disableRow1, valueIndex: 1 },
    { id: 3, disabled: disableRow1, valueIndex: 2 },
    { id: 4, disabled: disableRow1, valueIndex: 3 },
    { id: 5, disabled: disableRow1, valueIndex: 4 },
    { id: 6, disabled: disableRow2, valueIndex: 5 },
    { id: 7, disabled: disableRow2, valueIndex: 6 },
    { id: 8, disabled: disableRow2, valueIndex: 7 },
    { id: 9, disabled: disableRow2, valueIndex: 8 },
    { id: 10, disabled: disableRow2, valueIndex: 9 },
    { id: 11, disabled: disableRow3, valueIndex: 10 },
    { id: 12, disabled: disableRow3, valueIndex: 11 },
    { id: 13, disabled: disableRow3, valueIndex: 12 },
    { id: 14, disabled: disableRow3, valueIndex: 13 },
    { id: 15, disabled: disableRow3, valueIndex: 14 },
    { id: 16, disabled: disableRow4, valueIndex: 15 },
    { id: 17, disabled: disableRow4, valueIndex: 16 },
    { id: 18, disabled: disableRow4, valueIndex: 17 },
    { id: 19, disabled: disableRow4, valueIndex: 18 },
    { id: 20, disabled: disableRow4, valueIndex: 19 },
    { id: 21, disabled: disableRow5, valueIndex: 20 },
    { id: 22, disabled: disableRow5, valueIndex: 21 },
    { id: 23, disabled: disableRow5, valueIndex: 22 },
    { id: 24, disabled: disableRow5, valueIndex: 23 },
    { id: 25, disabled: disableRow5, valueIndex: 24 },
    { id: 26, disabled: disableRow6, valueIndex: 25 },
    { id: 27, disabled: disableRow6, valueIndex: 26 },
    { id: 28, disabled: disableRow6, valueIndex: 27 },
    { id: 29, disabled: disableRow6, valueIndex: 28 },
    { id: 30, disabled: disableRow6, valueIndex: 29 },
  ];

  const passIsGuessedBack = () => {
    isGuessed(true);
  };

  const passNumberOfTriesBack = () => {
    handleNumberOfTries();
  };

  const handleInput = (letterInput, index) => {
    let arrayOfInputLetters = [...attempt];

    if (index !== -1) {
      arrayOfInputLetters[index] = letterInput.toLowerCase();
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
          <div className={style.inputContainer}>
            {/* <AutoTabProvider> */}
            {inputs.map(input => (
              <input
                key={input.id}
                className={determineStyle(input.valueIndex)}
                onChange={e => handleInput(e.target.value, input.valueIndex)}
                type='text'
                maxLength={1}
                id={input.id}
                disabled={input.disabled}
                tabbable='true'
              />
            ))}
            {/* </AutoTabProvider> */}
          </div>
        </form>
      </div>
      <Keyboard attempt={attempt} styleChange={styleChange} />
    </>
  );
};

export default Attempt;
