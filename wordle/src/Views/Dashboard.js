import React, { useState, useEffect } from 'react';
import { db } from 'C:/Users/RDIRKX87/source/repos/react-firebase-wordle/wordle/src/firebase.js';
import { collection, updateDoc, doc, getDocs } from 'firebase/firestore';
import 'firebase/firestore';
import { UserAuth } from '../Context/AuthContext';
import Footer from '../Components/Footer.js';
import ResponsiveAppBar from '../Components/AppBar.js';
import AvatarDialog from '../Components/AvatarDialog.js';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import ImageAvatars from '../Components/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import CountryList from '../Utils/CountryList';

const style = {
  bg: `h-screen w-screen p-7 bg-gradient-to-r from-[#2F89ED] to-[#1CB5E0]`,
  container: `max-w-[600px] m-auto rounded-md shadow-2xl`,
  container22: `flex flex-wrap bg-slate-200 p-4`,
  container33: `flex bg-slate-100 space-x-4 p-4 shadow-xl`,
  item: `bg-blue-200 p-3 rounded-md`,
  //
  container2: `bg-slate-250 max-w-[1000px] m-auto rounded-md shadow-xl pb-10 p-4 pl-12`,
  container3: `bg-slate-250 container max-w-[1000px]`,
  container4: `max-w-[1000px] m-auto rounded-md pb-10 p-4`,
  container5: `bg-slate-250 max-w-[1000px] m-auto rounded-md shadow-xl pb-10 p-4 pl-12`,
  welcome: `text-2l font-bold text-center p-1`,
  heading: `text-3xl font-bold text-center text-gray-800 p-1`,
  avatar: `text-3xl font-bold text-center text-gray-800 p-1`,
  avatarDialog: `p-5`,
  form: `flex justify-between`,
  input: `border w-full text-xl`,
  button: `pt-8`,
  logoutButton: `inline-flex items-center justify-center p-0.5  text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-grey-500 to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800`,
  logOutButtonSpan: `px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0`,
};

const Dashboard = () => {
  const { user, logout } = UserAuth();
  const [avatar, setAvatar] = useState('');
  const [gamerecords, setGameRecords] = useState([]);
  const [bestScore, setBesetScore] = useState(0);
  const [numberOfFinishedGames, setNumberOfFinishedGames] = useState(0);
  const [numberOfUnfinishedGames, setnumberOfUnfinishedGames] = useState(0);
  const [screenName, setScreenName] = useState('');
  const [docId, setDocId] = useState('');

  const setValues = profileData => {
    setScreenName(profileData?.screenName);
    setAvatar(profileData?.avatar);
  };

  //   console.log(user);
  //   console.log(screenName);

  const renderProfileData = () => {
    const colRef = collection(db, 'profile');
    let result;

    getDocs(colRef)
      .then(snapshot => {
        let profileData = [];
        snapshot?.docs?.forEach(doc => {
          profileData?.push({ ...doc?.data(), id: doc.id });
        });
        result = profileData?.find(obj => obj?.uid === user?.uid);
        setDocId(result?.id);
        setValues(result);
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  const fetchGameRecords = () => {
    const colRef = collection(db, 'gamerecords');
    let gamerecordsOfLoggedInUser = [];

    getDocs(colRef)
      .then(snapshot => {
        let gameRecords = [];
        snapshot?.docs?.forEach(doc => {
          gameRecords?.push({ ...doc?.data(), id: doc.id });
        });
        gameRecords?.forEach(record => {
          if (record?.uid === user?.uid) {
            gamerecordsOfLoggedInUser.push(record);
          }
        });
        console.log(gamerecordsOfLoggedInUser);
        setGameRecords(gamerecordsOfLoggedInUser);
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  const determineBestScore = () => {
    let bestScore = 6;
    let countFinishedGames = 0;
    let countUnfinishedGames = 0;

    for (let i = 0; i < gamerecords?.length; i++) {
      if (bestScore > gamerecords[i]?.numberOfTries) {
        bestScore = gamerecords[i]?.numberOfTries;
      }
      if (gamerecords[i].isFinished === true) {
        countFinishedGames = countFinishedGames + 1;
      } else {
        countUnfinishedGames = countUnfinishedGames + 1;
      }
    }
    setBesetScore(bestScore);
    setNumberOfFinishedGames(countFinishedGames);
    setnumberOfUnfinishedGames(countUnfinishedGames);
  };

  //   /*
  //    * side effects
  //    */
  useEffect(() => {
    determineBestScore();
  }, [gamerecords]);

  useEffect(() => {
    fetchGameRecords();
  }, [user]);

  useEffect(() => {
    renderProfileData();
  }, [user]);

  return (
    <>
      <ResponsiveAppBar avatar={avatar} logout={logout} />
      <div className={style.bg}>
        <div className={style.container}>
          <p className={style.heading}>Game stats</p>
          <div className={style.container22}>
            <div className={style.container33}>
              <div className={style.item}>Number of games played: </div>
              <div className={style.item}>{gamerecords?.length}</div>
            </div>
            <div className={style.container33}>
              <div className={style.item}>Best score </div>
              <div className={style.item}>{bestScore}</div>
            </div>
            <div className={style.container33}>
              <div className={style.item}>Number of games finished </div>
              <div className={style.item}>
                {numberOfFinishedGames} / {gamerecords?.length}
              </div>
            </div>
          </div>
          <div className={style.container22}>
            <div className={style.item}>
              ewefwefwefwfwewewewefwefwefefwfewewffewwefweffwewf
            </div>
            <div className={style.item}>wefwefwffew</div>
            <div className={style.item}>wefwefwffew</div>
          </div>
          <div className={style.container22}>
            <div className={style.item}>
              ewefwefwefwfwewewewefwefwefefwfewewffewwefweffwewf
            </div>
            <div className={style.item}>wefwefwffew</div>
            <div className={style.item}>wefwefwffew</div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Dashboard;
