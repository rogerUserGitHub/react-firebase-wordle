import React, { useState, useEffect } from 'react';
import { db } from '../firebase.js';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { UserAuth } from '../Context/AuthContext';
import Footer from '../Components/Footer.js';
import Attempt from '../Components/Attempt.js';
import DialogWindow from '../Components/DialogWindow.js';
import { Timestamp } from '@firebase/firestore';
import ResponsiveAppBar from '../Components/AppBar.js';

const style = {
  bg: `h-screen w-screen p-7 bg-gradient-to-r from-[#aba6ff] to-[#42d9d6]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4 flex flex-wrap justify-center`,
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
  const [word, setWord] = useState('tests');
  const [language, setLanguage] = useState('');
  const [isGuessed, setIsGuessed] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [numberOfTries, setNumberOfTries] = useState(0);
  const [profileData, setProfileData] = useState({});
  const [avatar, setAvatar] = useState('');

  const { user, logout } = UserAuth();

  console.log(word);

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

  const getProfileData = async () => {
    const colRef = collection(db, 'profile');

    const docRef = doc(db, 'profile', user?.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setProfileData(docSnap?.data());
      setAvatar(docSnap?.data()?.avatar);
      setLanguage(docSnap?.data()?.language);
    } else {
      console.log('No such document!');
    }
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
    if (profileData?.language === 'English') {
      fetch('./data/WordList.json')
        .then(response => response.json())
        .then(json => {
          const randomNumber = Math.floor(Math.random() * json.length);
          setWord(json[randomNumber]);
        });
    } else {
      fetch('./data/WordListNL.json')
        .then(response => response.json())
        .then(json => {
          const randomNumber = Math.floor(Math.random() * json.length);
          setWord(json[randomNumber]);
        });
    }
  }, [language]);

  useEffect(() => {
    getProfileData();
  }, [user]);

  useEffect(() => {
    if (isFinished || numberOfTries === 6) {
      createGameRecord();
    }
  }, [isFinished, numberOfTries]);

  return (
    <>
      <ResponsiveAppBar avatar={avatar} language={language} logout={logout} />
      <div style={{ overflowY: 'overflow-auto', height: '100vh' }}>
        <div className={style.bg}>
          <div className={style.container}>
            <h2 className={style.welcome}>
              Welcome{' '}
              {profileData?.screenName !== null
                ? profileData?.screenName
                : profileData?.email}
            </h2>

            <Attempt
              word={word}
              handleNumberOfTries={handleNumberOfTries}
              isGuessed={handleGuess}
              isFinished={handleFinish}
            />
          </div>
        </div>
      </div>
      <DialogWindow isGuessed={isGuessed} numberOfTries={numberOfTries} />
      <Footer />
    </>
  );
};

export default Homepage;
