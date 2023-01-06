import React, { useState, useEffect } from 'react';
import { db } from 'C:/Users/RDIRKX87/source/repos/react-firebase-wordle/wordle/src/firebase.js';
import { collection, updateDoc, doc, getDocs } from 'firebase/firestore';
import 'firebase/firestore';
import { UserAuth } from '../Context/AuthContext';
import Footer from '../Components/Footer.js';
import ResponsiveAppBar from '../Components/AppBar.js';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import ImageAvatars from '../Components/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const style = {
  bg: `h-screen w-screen p-7 bg-gradient-to-r from-[#2F89ED] to-[#1CB5E0]`,
  container: `flex-wrap bg-slate-100 max-w-[1000px] m-auto rounded-md shadow-xl p-4 `,
  container2: `bg-slate-250 max-w-[1000px] m-auto rounded-md shadow-xl pb-10 p-4`,
  container3: `bg-slate-250 container max-w-[1000px]`,
  container4: `max-w-[1000px] m-auto rounded-md pb-10 p-4`,
  welcome: `text-2l font-bold text-center p-1`,
  heading: `text-3xl font-bold text-center text-gray-800 p-1`,
  avatar: `text-3xl font-bold text-center text-gray-800 p-1`,
  form: `flex justify-between`,
  input: `border w-full text-xl`,
  button: `border p-4 ml-2 bg-blue-200`,
  logoutButton: `inline-flex items-center justify-center p-0.5  text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-grey-500 to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800`,
  logOutButtonSpan: `px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0`,
};

const Profile = () => {
  const { user, logout } = UserAuth();
  const [avatar, setAvatar] = useState(1);
  const [screenName, setScreenName] = useState('');
  const [age, setAge] = useState();
  const [country, setCountry] = useState('');
  const [language, setLanguage] = useState('');
  const [docId, setDocId] = useState('');

  const setValues = profileData => {
    setAge(profileData?.age);
    setScreenName(profileData?.screenName);
    setCountry(profileData?.country);
    setLanguage(profileData?.language);
    setAvatar(profileData?.avatar);
  };

  console.log(user);

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

  const updateProfile = async () => {
    await updateDoc(doc(db, 'profile', docId), {
      screenName: screenName,
      age: age,
      country: country,
      language: language,
      avatar: avatar,
    });
    alert('Profile has been updated');
  };

  /*
   * side effects
   */
  useEffect(() => {
    renderProfileData();
  }, [user]);

  return (
    <>
      <ResponsiveAppBar logout={logout} />
      <div className={style.bg}>
        <div className={style.container}>
          <div className={style.container2}>
            <Box
              component='form'
              sx={{
                '& .MuiTextField-root': { m: 2, width: '45ch' },
              }}
              noValidate
              autoComplete='off'
            >
              <ImageAvatars className={style.avatar} />
              <TextField
                disabled
                id='filled-disabled'
                helperText='age'
                variant='filled'
                value={user?.email}
              />
              <TextField
                id='filled'
                helperText='screen name'
                variant='filled'
                placeholder='screen name'
                value={screenName}
                InputProps={{ inputProps: { max: 25 } }}
                onChange={e => setScreenName(e.target.value)}
              />
              <TextField
                id='standard-helperText'
                variant='filled'
                helperText='age'
                value={age}
                InputProps={{ inputProps: { min: 5, max: 99 } }}
                onChange={e => setAge(e.target.value)}
              />
              <TextField
                id='filled'
                helperText='country'
                variant='filled'
                value={country}
                placeholder='country'
                onChange={e => setCountry(e.target.value)}
              />
            </Box>
            <div className={style.container4}>
              <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id='demo-simple-select-autowidth-label'>
                  Language
                </InputLabel>
                <Select
                  labelId='demo-simple-select-autowidth-label'
                  id='demo-simple-select-autowidth'
                  value={language}
                  onChange={e => setLanguage(e.target.value)}
                  autoWidth
                  label='country'
                >
                  <MenuItem value={'Dutch'}>Dutch</MenuItem>
                  <MenuItem value={'English'}>English</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className={style.container4} onClick={updateProfile}>
              <Button variant='outlined'>Update profile</Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
