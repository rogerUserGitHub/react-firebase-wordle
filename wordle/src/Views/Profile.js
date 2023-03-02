import React, { useState, useEffect } from 'react';
import { db } from '../firebase.js';
import { updateDoc, doc, getDoc } from 'firebase/firestore';
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
  bg: 'h-[calc(100vh-100px)] overflow-auto p-7 bg-gradient-to-r from-[#aba6ff] to-[#42d9d6]',
  container:
    'flex container bg-slate-100 max-w-[450px] m-auto rounded-md shadow-xl pb-200 ',
  container2: 'bg-slate-250 max-w-auto rounded-md shadow-xl',
  container4: 'max-w-auto m-auto rounded-md pb-10 p-4 ',
  container5: 'bg-slate-250 rounded-md shadow-xl pb-4 p-4',
  welcome: 'text-2xl font-bold text-center p-1',
  heading: 'text-3xl font-bold text-center text-gray-800 p-1',
  avatar: 'text-3xl font-bold text-center text-gray-800 p-1',
  input: 'border w-full text-xl',
  button: 'pt-8',
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

  const renderProfileData = async () => {
    const docRef = doc(db, 'profile', user?.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setValues(docSnap.data());
    } else {
      console.log('No such document!');
    }
  };

  const updateProfile = async () => {
    await updateDoc(doc(db, 'profile', user?.uid), {
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
      <ResponsiveAppBar avatar={avatar} language={language} logout={logout} />
      <div className={style.bg}>
        <div className={style.container}>
          <div className={style.container2}>
            <Box
              component='form'
              sx={{
                '& .MuiTextField-root': {
                  m: 'auto',
                  width: '80%',
                  paddingTop: '2em',
                },
                textAlign: 'center',
              }}
              noValidate
              autoComplete='off'
            >
              <div className={style.container5}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <ImageAvatars avatar={avatar} />
                </Box>
                <AvatarDialog determineAvatar={determineAvatar} />
              </div>
              <Box sx={{ maxWidth: 'auto' }}>
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
                  type='number'
                  InputProps={{ inputProps: { min: 5, max: 99 } }}
                  onChange={e => setAge(e.target.value)}
                />
              </Box>
            </Box>
            <Box
              component='form'
              sx={{
                '& .MuiTextField-root': { m: 'auto', width: '45ch' },
                textAlign: 'center',
              }}
              noValidate
              autoComplete='off'
            >
              <div className={style.container4}>
                <FormControl sx={{ width: '85%', paddingBottom: 5 }}>
                  <InputLabel id='demo-simple-select-autowidth-label'>
                    Country
                  </InputLabel>
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
                <FormControl sx={{ width: '85%' }}>
                  <InputLabel id='demo-simple-select-autowidth-label'>
                    WordJam Language
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-autowidth-label'
                    id='demo-simple-select-autowidth'
                    value={language}
                    onChange={e => setLanguage(e.target.value)}
                    autoWidth
                    label='WordJam Language'
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
            </Box>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
