import React, { useState, useEffect } from 'react';
import { db } from '../firebase.js';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import 'firebase/firestore';
import { UserAuth } from '../Context/AuthContext';
import Rating from '../Components/Rating.js';
import AverageRating from '../Components/AverageRating.js';
import Badge from '../Components/Badge.js';
import ResponsiveAppBar from '../Components/AppBar.js';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import ScoreboardIcon from '@mui/icons-material/Scoreboard';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import Footer from '../Components/Footer';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const style = {
  bg: `h-[calc(100vh-100px)] overflow-auto p-7 bg-gradient-to-r from-[#aba6ff] to-[#42d9d6]`,
  container: `max-w-[650px]  m-auto rounded-md shadow-2xl bg-slate-300`,
  container22: `flex flex-wrap bg-slate-200`,
  heading: `text-3xl font-bold text-center`,
  container33: `flex bg-slate-100 space-x-4 shadow-xl`,
  item: `bg-blue-200 p-3 rounded-md`,
  avatar: `content-end`,
};

const Dashboard = () => {
  const { user, logout } = UserAuth();
  const [avatar, setAvatar] = useState('');
  const [language, setLanguage] = useState('');
  const [gamerecords, setGameRecords] = useState([]);
  const [averageRating, setAverageRating] = useState(4);
  const [bestScore, setBestScore] = useState(0);
  const [numberTotalGames, setNumberTotalGames] = useState();
  const [percentageProgress, setPercentageProgress] = useState(70);
  const [winRatePerc, setWinRatePerc] = useState(0);
  const [badge, setBadge] = useState('');
  const [screenName, setScreenName] = useState('');

  const setValues = profileData => {
    setScreenName(profileData?.screenName);
    setAvatar(profileData?.avatar);
    setLanguage(profileData?.language);
  };

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
  }));

  const renderProfileData = async () => {
    const docRef = doc(db, 'profile', user?.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setValues(docSnap?.data());
    } else {
      console.log('No such document!');
    }
  };

  const fetchGameRecords = async () => {
    try {
      const colRef = collection(db, 'gamerecords');
      const snapshot = await getDocs(colRef);

      let gameRecords = [];
      let gamerecordsOfLoggedInUser = [];

      snapshot.forEach(doc => {
        gameRecords.push({ ...doc.data(), id: doc.id });
      });

      setNumberTotalGames(gameRecords.length);

      gameRecords.forEach(record => {
        if (record.uid === user.uid) {
          gamerecordsOfLoggedInUser.push(record);
        }
      });

      setGameRecords(gamerecordsOfLoggedInUser);
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchRatings = async () => {
    try {
      const colRef = collection(db, 'ratings');
      const snapshot = await getDocs(colRef);

      const gameRecords = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      const sumAllRatings = gameRecords.reduce(
        (acc, curr) => acc + curr.numberOfStars,
        0
      );
      const average = sumAllRatings / gameRecords.length;
      setAverageRating(average);
    } catch (err) {
      console.log(err.message);
    }
  };

  const determineBestScore = () => {
    const finishedGames = gamerecords.filter(game => game.isFinished);
    const bestScore = finishedGames.reduce(
      (min, game) => Math.min(min, game.numberOfTries),
      6
    );
    const winRatePerc = Math.floor((finishedGames.length / gamerecords.length) * 100);
    setBestScore(bestScore);
    if (winRatePerc) {
      setWinRatePerc(winRatePerc);
    } else {
      setWinRatePerc(0);
    }
  };

  const determineBadgeAndProgress = () => {
    const numberGames = gamerecords.length;
    if (numberGames < 10) {
      setBadge('bronze');
      setPercentageProgress((numberGames / 10) * 100);
    } else if (numberGames > 9 && numberGames < 20) {
      setBadge('silver');
      setPercentageProgress(((numberGames - 10) / 10) * 100);
    } else if (numberGames > 19 && numberGames < 30) {
      setBadge('gold');
      setPercentageProgress(((numberGames - 20) / 10) * 100);
    } else {
      setBadge('platinum');
      setPercentageProgress(((numberGames - 30) / 10) * 100);
    }
  };

  /*
   * side effects
   */
  useEffect(() => {
    determineBestScore();
    determineBadgeAndProgress();
  }, [gamerecords]);

  useEffect(() => {
    fetchGameRecords();
    fetchRatings();
    renderProfileData();
  }, [user]);

  return (
    <>
      <ResponsiveAppBar avatar={avatar} language={language} logout={logout} />
      <div className={style.bg}>
        <div className={style.container}>
          <h3 className={style.heading}>Player Stats</h3>
          <div className='container mx-auto '>
            <div className='grid grid-cols-1 md:grid-cols-2'>
              <div className='bg-gray-800 p-14 '>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Badge badge={badge} />
                </Box>
                <Box sx={{ justifyContent: 'center' }}>
                  <BorderLinearProgress
                    variant='determinate'
                    value={percentageProgress}
                  />
                </Box>
                <p className='text-center text-white font-mono font-bold'>
                  {percentageProgress} %
                </p>
              </div>
              <div className='p-4 bg-gray-800'>
                <p className='text-[30px] text-blue-600 font-mono'>
                  {' '}
                  <VideogameAssetIcon /> # of games
                </p>
                <p className='text-white font-mono font-bold'>{gamerecords?.length}</p>
                <p className='text-[30px] text-blue-600 font-mono'>
                  <ScoreboardIcon /> best score
                </p>
                {gamerecords.length > 0 ? (
                  <p className='text-white font-mono font-bold'>
                    {bestScore} / 6 tries
                  </p>
                ) : (
                  <p className='text-white font-mono font-bold'>
                    Play your first game!
                  </p>
                )}
                <p className='text-[30px] text-blue-600 font-mono'>
                  <WorkspacePremiumIcon /> % win rate{' '}
                </p>
                <p className='text-white font-mono font-bold'>{winRatePerc}</p>
              </div>
            </div>
            <div className='container mx-auto'>
              <h3 className={style.heading}>App Stats</h3>
              <div className='grid grid-cols-1 md:grid-cols-1'>
                <div className='p-4 bg-gray-800'>
                  <p className='text-[30px] text-blue-700 font-mono text-center'>
                    # of games played
                  </p>
                  <p className='text-white font-mono font-bold text-center'>
                    {numberTotalGames}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <h3 className={style.heading}>Rating</h3>
          <div className='grid grid-cols-1 md:grid-cols-2'>
            <div className='p-4 bg-gray-200 text-gray-700'>
              <p>Your Rating</p>
              <Rating />
            </div>
            <div className='p-4 pb-20 bg-gray-200 text-gray-700'>
              <p>Average rating of all users</p>
              <AverageRating average={averageRating} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
