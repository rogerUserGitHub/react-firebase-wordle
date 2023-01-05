import React, { useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import Todo from 'C:/Users/RDIRKX87/source/repos/react-firebase-wordle/wordle/src/Components/Todo.js';
import { db } from 'C:/Users/RDIRKX87/source/repos/react-firebase-wordle/wordle/src/firebase.js';
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
  where,
} from 'firebase/firestore';
import { UserAuth } from '../Context/AuthContext';
import Footer from '../Components/Footer.js';
import Attempt from '../Components/Attempt.js';
import DialogWindow from '../Components/DialogWindow.js';
import { Timestamp } from '@firebase/firestore';
import ResponsiveAppBar from '../Components/AppBar.js';

const style = {
  bg: `h-screen w-screen p-7 bg-gradient-to-r from-[#2F89ED] to-[#1CB5E0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  container2: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-2 pt-2 mt-5 flex flex-col items-center`,
  welcome: `text-2l font-bold text-center p-1`,
  heading: `text-3xl font-bold text-center text-gray-800 p-1`,
  form: `flex justify-between`,
  input: `border w-full text-xl`,
  button: `border p-4 ml-2 bg-blue-200`,
  logoutButton: `inline-flex items-center justify-center p-0.5  text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-grey-500 to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800`,
  logOutButtonSpan: `px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0`,
};

const Homepage = () => {
  const [wordList, setWordList] = useState([]);
  const [word, setWord] = useState('');
  const [isGuessed, setIsGuessed] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [numberOfTries, setNumberOfTries] = useState(0);

  const { user, logout } = UserAuth();

  const createGameRecord = async e => {
    var timestamp = Timestamp.fromDate(new Date());
    await addDoc(collection(db, 'gamerecords'), {
      date: timestamp,
      numberOfTries: numberOfTries,
      uid: user.uid,
      word: word,
      isFinished: isFinished,
    });
  };

  // read todo in firebase
  // useEffect(() => {
  //   if (user.email !== '') {
  //     const recordRef = collection(db, 'todos');
  //     const q = query(recordRef, where('user', '==', user.uid));

  //     const unsubscribe = onSnapshot(q, querySnapshot => {
  //       let todosArr = [];
  //       querySnapshot.forEach(doc => {
  //         todosArr.push({ ...doc?.data(), id: doc?.id });
  //       });
  //       setTodos(todosArr);
  //     });
  //     return () => unsubscribe();
  //   } else {
  //     setTodos([]);
  //   }
  // }, [user]);

  // update todo in firebase
  const toggleComplete = async todo => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed,
    });
  };

  // delete todo
  const deleteTodo = async itemId => {
    await deleteDoc(doc(db, 'todos', itemId));
  };

  const handleGuess = boolean => {
    setIsGuessed(boolean);
    setIsFinished(true);
  };

  const handleNumberOfTries = () => {
    setNumberOfTries(numberOfTries + 1);
  };

  const handleFinish = boolean => {
    setIsGuessed(boolean);
  };

  /*
   * side effects
   */
  useEffect(() => {
    fetch('./data/WordList.json')
      .then(response => response.json())
      .then(json => {
        const randomNumber = Math.floor(Math.random() * json.length);
        setWord(json[randomNumber]);
        setWordList(json);
      });
    console.log('fetch json');
  }, []);

  /*
   * side effects
   */
  useEffect(() => {
    if (isFinished || numberOfTries === 6) {
      createGameRecord();
    }
  }, [isFinished, numberOfTries]);

  console.log(isGuessed);
  console.log(numberOfTries);

  return (
    <>
      {/* <ResponsiveAppBar /> */}
      <div className={style.bg}>
        <div className={style.container}>
          <h2 className={style.welcome}>Welcome {user.email}</h2>
          <h3 className={style.heading}>Wordle</h3>
          <Attempt
            word={word}
            handleNumberOfTries={handleNumberOfTries}
            isGuessed={handleGuess}
            isFinished={handleFinish}
          />
        </div>
        {/* <div className={style.container2}>
          <button className={style.logoutButton} onClick={logout}>
            <span className={style.logOutButtonSpan}>Sign out</span>
          </button>
        </div> */}
      </div>
      <DialogWindow isGuessed={isGuessed} numberOfTries={numberOfTries} />
      <Footer />
    </>
  );
};

export default Homepage;
