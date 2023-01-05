import React, { useState, useEffect } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

const style = {
  row: `flex`,
  text: `ml-2 cursor-pointer`,
  button: `cursor-pointer flex items-center`,
  container: `flex flex-wrap gap-1 p-4 justify-center`,
  letterBoxDefault: `p-3.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500`,
  letterBoxGreen: `p-3.5 text-xs font-semibold text-gray-800 bg-green-500 border border-green-500 rounded-lg dark:bg-green-500 dark:text-gray-100 dark:border-green-500`,
  letterBoxOrange: `p-3.5 text-xs font-semibold text-gray-800 bg-orange-500 border border-orange-500 rounded-lg dark:bg-orange-500 dark:text-orange-100 dark:border-orange-500`,
  letterBoxRed: `p-3.5 text-xs font-semibold text-red-800 bg-red-500 border border-red-500 rounded-lg dark:bg-red-500 dark:text-red-100 dark:border-red-500`,
};

const Keyboard = ({ attempt, styleChange }) => {
  const [dictionary, setDictionairy] = useState({});

  const attemptAndStyleChangeToDict = () => {
    const dictionaryCopy = { ...dictionary };

    for (let i = 0; i < attempt.length; i++) {
      dictionaryCopy[attempt[i]] = styleChange[i];
    }
    setDictionairy(dictionaryCopy);
  };

  const allocateColorsToKeyboard = letter => {
    const dictionaryCopy = { ...dictionary };

    if (styleChange.length < 1) {
      return style.letterBoxDefault;
    }

    const colorValue = dictionaryCopy[letter];

    if (colorValue) {
      if (colorValue === 'green') {
        return style.letterBoxGreen;
      }
      if (colorValue === 'orange') {
        return style.letterBoxOrange;
      }
      if (colorValue === 'red') {
        return style.letterBoxRed;
      }
    } else {
      return style.letterBoxDefault;
    }
  };

  /*
   * side effects
   */
  useEffect(() => {
    attemptAndStyleChangeToDict();
  }, [styleChange]);

  /*
   * render
   */
  return (
    <>
      <div className={style.container}>
        <kbd className={allocateColorsToKeyboard('q')}>Q</kbd>
        <kbd className={allocateColorsToKeyboard('w')}>W</kbd>
        <kbd className={allocateColorsToKeyboard('e')}>E</kbd>
        <kbd className={allocateColorsToKeyboard('r')}>R</kbd>
        <kbd className={allocateColorsToKeyboard('t')}>T</kbd>
        <kbd className={allocateColorsToKeyboard('y')}>Y</kbd>
        <kbd className={allocateColorsToKeyboard('u')}>U</kbd>
        <kbd className={allocateColorsToKeyboard('i')}>I</kbd>
        <kbd className={allocateColorsToKeyboard('o')}>O</kbd>
        <kbd className={allocateColorsToKeyboard('p')}>P</kbd>
        <kbd className={allocateColorsToKeyboard('a')}>A</kbd>
        <kbd className={allocateColorsToKeyboard('s')}>S</kbd>
        <kbd className={allocateColorsToKeyboard('d')}>D</kbd>
        <kbd className={allocateColorsToKeyboard('f')}>F</kbd>
        <kbd className={allocateColorsToKeyboard('g')}>G</kbd>
        <kbd className={allocateColorsToKeyboard('h')}>H</kbd>
        <kbd className={allocateColorsToKeyboard('j')}>J</kbd>
        <kbd className={allocateColorsToKeyboard('k')}>K</kbd>
        <kbd className={allocateColorsToKeyboard('l')}>L</kbd>
        <kbd className={allocateColorsToKeyboard('z')}>Z</kbd>
        <kbd className={allocateColorsToKeyboard('x')}>X</kbd>
        <kbd className={allocateColorsToKeyboard('c')}>C</kbd>
        <kbd className={allocateColorsToKeyboard('v')}>V</kbd>
        <kbd className={allocateColorsToKeyboard('b')}>B</kbd>
        <kbd className={allocateColorsToKeyboard('n')}>N</kbd>
        <kbd className={allocateColorsToKeyboard('m')}>M</kbd>
      </div>
    </>
  );
};

export default Keyboard;
