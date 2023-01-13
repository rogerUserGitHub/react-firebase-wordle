import React, { useState, useEffect } from 'react';
import { db } from 'C:/Users/RDIRKX87/source/repos/react-firebase-wordle/wordle/src/firebase.js';
import { collection, getDocs } from 'firebase/firestore';
import 'firebase/firestore';
import { UserAuth } from '../Context/AuthContext';
import Rating from '../Components/Rating.js';
import AverageRating from '../Components/AverageRating.js';
import Badge from '../Components/Badge.js';
import ResponsiveAppBar from '../Components/AppBar.js';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import ScoreboardIcon from '@mui/icons-material/Scoreboard';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import StarIcon from '@mui/icons-material/Star';
import ImageAvatars from '../Components/Avatar';
import Footer from '../Components/Footer';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const style = {
  bg: `p-7 bg-gradient-to-r from-[#13171f] to-[#3c2342]`,
  container: `max-w-[650px] m-auto rounded-md shadow-2xl bg-slate-300`,
  container22: `flex flex-wrap bg-slate-200`,
  heading: `text-3xl font-bold text-center`,
  container33: `flex bg-slate-100 space-x-4 shadow-xl`,
  item: `bg-blue-200 p-3 rounded-md`,
  avatar: `content-end`,
  //
  container2: `bg-slate-250 max-w-[1000px] m-auto rounded-md shadow-xl pb-10 p-4 pl-12`,
  container3: `bg-slate-250 container max-w-[1000px]`,
  container4: `max-w-[1000px] m-auto rounded-md pb-10 p-4`,
  container5: `bg-slate-250 max-w-[1000px] m-auto rounded-md shadow-xl pb-10 p-4 pl-12`,
  welcome: `text-2l font-bold text-center p-1`,

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
  const [averageRating, setAverageRating] = useState(4);
  const [bestScore, setBestScore] = useState(0);
  const [numberOfFinishedGames, setNumberOfFinishedGames] = useState(0);
  const [numberOfUnfinishedGames, setnumberOfUnfinishedGames] = useState(0);
  const [numberTotalProfiles, setNumberTotalProfiles] = useState(0);
  const [numberTotalGames, setNumberTotalGames] = useState();
  const [percentageProgress, setPercentageProgress] = useState(70);
  const [winRatePerc, setWinRatePerc] = useState(0);
  const [badge, setBadge] = useState('bronze');
  const [screenName, setScreenName] = useState('');
  const [docId, setDocId] = useState('');

  const setValues = profileData => {
    setScreenName(profileData?.screenName);
    setAvatar(profileData?.avatar);
  };

  console.log(numberTotalGames);

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

  const renderProfileData = () => {
    const colRef = collection(db, 'profile');
    let result;

    getDocs(colRef)
      .then(snapshot => {
        let profileData = [];
        snapshot?.docs?.forEach(doc => {
          profileData?.push({ ...doc?.data(), id: doc.id });
        });
        const totalNumberProfiles = profileData.length;
        setNumberTotalProfiles(totalNumberProfiles);
        result = profileData?.find(obj => obj?.uid === user?.uid);
        setValues(result);
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  const fetchGameRecords = async () => {
    const colRef = collection(db, 'gamerecords');
    let gamerecordsOfLoggedInUser = [];

    await getDocs(colRef)
      .then(snapshot => {
        let gameRecords = [];
        snapshot?.docs?.forEach(doc => {
          gameRecords?.push({ ...doc?.data(), id: doc.id });
        });
        const totalNumberGames = gameRecords.length;
        setNumberTotalGames(totalNumberGames);
        gameRecords?.forEach(record => {
          if (record?.uid === user?.uid) {
            gamerecordsOfLoggedInUser.push(record);
          }
        });
        setGameRecords(gamerecordsOfLoggedInUser);
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  const fetchRatings = () => {
    const colRef = collection(db, 'ratings');

    getDocs(colRef)
      .then(snapshot => {
        let gameRecords = [];
        snapshot?.docs?.forEach(doc => {
          gameRecords?.push({ ...doc?.data(), id: doc.id });
        });
        const sumAllRatings = gameRecords
          ?.map(doc => doc.numberOfStars)
          .reduce((acc, curr) => acc + curr, 0);
        const average = sumAllRatings / gameRecords?.length;
        setAverageRating(average);
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
    setBestScore(bestScore);
    setNumberOfFinishedGames(countFinishedGames);
    setnumberOfUnfinishedGames(countUnfinishedGames);
    setWinRatePerc(Math.floor((countFinishedGames / gamerecords?.length) * 100));
  };

  const determineBadgeAndProgress = () => {
    const numberGames = gamerecords?.length;

    if (numberGames) {
      switch (numberGames) {
        case numberGames < 10:
          setBadge('bronze');
          setPercentageProgress((numberGames / 10) * 100);
          break;
        case numberGames < 20:
          setBadge('silver');
          setPercentageProgress(((numberGames - 10) / 10) * 100);
          break;
        case numberGames < 30:
          setBadge('gold');
          setPercentageProgress(((numberGames - 20) / 10) * 100);
          break;
        case numberGames < 40:
          setBadge('platinum');
          setPercentageProgress(((numberGames - 30) / 10) * 100);
          break;
        default:
          setBadge('bronze');
          setPercentageProgress(20);
          break;
      }
    }
  };

  //   /*
  //    * side effects
  //    */
  useEffect(() => {
    determineBestScore();
  }, [gamerecords]);

  useEffect(() => {
    fetchGameRecords();
    fetchRatings();
  }, [user]);

  useEffect(() => {
    renderProfileData();
  }, [user]);

  useEffect(() => {
    determineBadgeAndProgress();
  }, []);

  return (
    <>
      <ResponsiveAppBar avatar={avatar} logout={logout} />
      <div className={style.bg}>
        <div className={style.container}>
          <h3 className={style.heading}>Player Stats</h3>
          <div className='container mx-auto '>
            <div className='grid grid-cols-1 md:grid-cols-2 '>
              <div className='bg-gray-800 pt-14 '>
                <Badge badge={badge} />
                <Box sx={{ flexGrow: 1 }}>
                  <BorderLinearProgress
                    variant='determinate'
                    value={percentageProgress}
                  />
                </Box>
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
                <p className='text-white font-mono font-bold'>{bestScore} / 6 tries</p>
                <p className='text-[30px] text-blue-600 font-mono'>
                  <WorkspacePremiumIcon /> % win rate{' '}
                </p>
                <p className='text-white font-mono font-bold'>{winRatePerc}</p>
                <p className='text-[30px] text-blue-600 font-mono'>
                  <StarIcon /> rank{' '}
                </p>
                <p className='text-white font-mono font-bold'>xxxxx</p>
              </div>
            </div>

            <div className='container mx-auto'>
              <h3 className={style.heading}>App Stats</h3>
              <div className='grid grid-cols-1 md:grid-cols-2'>
                <div className='p-4 bg-gray-700 text-green-700'>
                  <p className='text-[30px] text-blue-700 font-mono'>
                    # of active users
                  </p>
                  <p>{numberTotalProfiles}</p>
                </div>
                <div className='p-4 bg-gray-700 text-green-700'>
                  <p className='text-[30px] text-blue-700 font-mono'>
                    # of games played
                  </p>
                  <p>{numberTotalGames}</p>
                </div>
              </div>
            </div>
          </div>

          {/* <div className={style.containerKeyStats}>
            <h3 className={style.heading}>Other</h3>
            <div className='container mx-auto'>
              <div className='grid grid-cols-1 md:grid-cols-2'>
                <div className='bg-gray-200 pl-14 pt-14'>
                  <ImageAvatars avatar={'pic8'} />
                </div>
                <div className='p-4 bg-green-100'>
                  <p className='text-[30px] text-blue-700 font-mono'># of Games</p>
                  <p className='text-red-500 font-mono'>{gamerecords?.length}</p>
                  <p className='text-[30px] text-blue-700 font-mono'>Best Score</p>
                  <p className='text-red-500 font-mono'>{bestScore}</p>
                  <p className='text-[30px] text-blue-700 font-mono'>% Win Rate </p>
                  <p className='text-red-500 font-mono'>{winRatePerc}</p>
                  <p className='text-[30px] text-blue-700 font-mono'>Rank </p>
                  <p className='text-red-500 font-mono'>xxxxx</p>
                </div>
              </div>
            </div>
          </div> */}

          {/* <div className={style.containerKeyStats}>
            <div className='container mx-auto'>
              <h3 className={style.heading}>Game Stats</h3>
              <div className='grid grid-cols-1 md:grid-cols-2'>
                <div className='p-4 bg-gray-200 text-gray-700'>
                  <p className='text-[30px] text-blue-600 font-mono'># of users</p>
                  <p>{numberTotalProfiles}</p>
                </div>
                <div className='p-4 bg-gray-200 text-gray-700'>
                  <p className='text-[30px] text-blue-600 font-mono'>
                    # of games played
                  </p>
                  <p>{numberTotalGames}</p>
                </div>
              </div>
            </div>
          </div> */}

          {/* <div className='container mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1'>
              <div className='p-4 bg-gray-200 text-gray-700'>
                <p>Left Column</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              <div className='p-4 bg-gray-200 text-gray-700'>
                <p>Right Column</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
          </div>

          <div className='container mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1'>
              <div className='p-4 bg-gray-200 text-gray-700'>
                <p>Left Column xxxx</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              <div className='p-4 bg-gray-200 text-gray-700'>
                <p>Right Column xxxx</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
          </div> */}

          {/* <div className='container mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-4'>
              <div className='p-4 bg-gray-200 text-gray-700'>
                <p>Left Column</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              <div className='p-4 bg-gray-200 text-gray-700'>
                <p>Right Column</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              <div className='p-4 bg-gray-200 text-gray-700'>
                <p>Right Column</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              <div className='p-4 bg-gray-200 text-gray-700'>
                <p>Right Column</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
          </div> */}

          <h3 className={style.heading}>Word of the day</h3>
          <div className='container mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-2'>
              <div className='bg-gray-200 pl-14 pt-14'>
                <ImageAvatars avatar={'pic8'} />
              </div>
              <div className='p-4 bg-green-100'>
                <p className='text-[30px] text-blue-700 font-mono'># of Games</p>
                <p className='text-red-500 font-mono'>{gamerecords?.length}</p>
                <p className='text-[30px] text-blue-700 font-mono'>Best Score</p>
                <p className='text-red-500 font-mono'>{bestScore}</p>
                <p className='text-[30px] text-blue-700 font-mono'>% Win Rate </p>
                <p className='text-red-500 font-mono'>{winRatePerc}</p>
                <p className='text-[30px] text-blue-700 font-mono'>Rank </p>
                <p className='text-red-500 font-mono'>xxxxx</p>
              </div>
            </div>
          </div>

          <div className='container mx-auto'>
            <h3 className={style.heading}>Rating</h3>
            <div className='grid grid-cols-1 md:grid-cols-2'>
              <div className='p-4 bg-gray-200 text-gray-700'>
                <p>Your Rating</p>
                <Rating />
              </div>
              <div className='p-4 bg-gray-200 text-gray-700'>
                <p>Average Rating</p>
                <AverageRating average={averageRating} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Dashboard;
