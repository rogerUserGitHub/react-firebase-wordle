import React, { useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
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
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ImageAvatars from '../Components/Avatar';
import Button from '@mui/material/Button';

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

  console.log(user);

  /*
   * side effects
   */

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
                label='username'
                defaultValue='username'
                variant='filled'
                value={user?.email}
              />
              <TextField
                id='filled'
                label='screen name'
                variant='filled'
                placeholder='screen name'
              />
              <TextField
                id='filled-age'
                label='age'
                variant='filled'
                placeholder='age'
                type='number'
                InputProps={{ inputProps: { min: 5, max: 99 } }}
              />
              <TextField
                id='filled'
                label='country'
                variant='filled'
                placeholder='country'
              />
            </Box>
            <div className={style.container4}>
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
