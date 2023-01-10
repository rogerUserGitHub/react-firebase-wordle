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
  container: `flex-wrap bg-slate-100 max-w-[1000px] m-auto rounded-md shadow-xl`,
  container2: `bg-slate-250 max-w-[1000px] m-auto rounded-md shadow-xl pl-12`,
  container3: `bg-slate-250 container max-w-[1000px]`,
  container4: `max-w-[1000px] m-auto rounded-md pb-10 p-4`,
  container5: `bg-slate-250 max-w-[1000px] m-auto rounded-md shadow-xl pb-4 p-4 pl-12`,
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

const Profile = () => {
  const { user, logout } = UserAuth();
  const [avatar, setAvatar] = useState('');
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
  console.log(screenName);

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

  const determineAvatar = avatarChoice => {
    setAvatar(avatarChoice);
  };

  /*
   * side effects
   */
  useEffect(() => {
    renderProfileData();
  }, [user]);

  return (
    <>
      <ResponsiveAppBar avatar={avatar} logout={logout} />
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
              <div className={style.container5}>
                <ImageAvatars className={style.avatar} avatar={avatar} />
                <AvatarDialog determineAvatar={determineAvatar} />
              </div>
              <TextField
                disabled
                id='filled-disabled'
                helperText='email / username'
                variant='filled'
                value={user?.email}
              />
              <TextField
                id='filled'
                helperText='screen name'
                variant='filled'
                placeholder='screen name (max. 25 characters)'
                value={screenName}
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
            </Box>
            <div className={style.container4}>
              <FormControl sx={{ minWidth: 440, paddingRight: 4, paddingBottom: 5 }}>
                <InputLabel id='demo-simple-select-autowidth-label'>Country</InputLabel>
                <Select
                  labelId='demo-simple-select-autowidth-label'
                  id='demo-simple-select-autowidth'
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  autoWidth
                  label='Country'
                >
                  {CountryList.map(country => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 400 }}>
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
              <div className={style.button}>
                <Button
                  variant='outlined'
                  onClick={updateProfile}
                  disabled={screenName?.length > 25 || age > 99 || age < 6}
                >
                  Update profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
