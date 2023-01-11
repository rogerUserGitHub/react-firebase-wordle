import { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { db } from 'C:/Users/RDIRKX87/source/repos/react-firebase-wordle/wordle/src/firebase.js';
import { collection, addDoc, updateDoc, doc, getDocs } from 'firebase/firestore';
import { Timestamp } from '@firebase/firestore';
import { UserAuth } from '../Context/AuthContext';

const labels = {
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function HoverRating() {
  const { user } = UserAuth();

  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
  const [userAlreadyRated, setUserAlreadyRated] = useState(false);

  console.log(value);
  console.log(userAlreadyRated);

  const getRatingData = async () => {
    const colRef = collection(db, 'ratings');
    let result = [];

    await getDocs(colRef)
      .then(snapshot => {
        let ratingData = [];
        snapshot.docs.forEach(doc => {
          ratingData?.push({ ...doc?.data(), id: doc.id });
        });
        console.log(ratingData);

        ratingData?.forEach(record => {
          if (record?.uid === user?.uid) {
            console.log('spring eriiiin');
            result.push(record);
            setUserAlreadyRated(true);
            setValue(record?.numberOfStars);
          }
        });
        console.log(result[0]);
        console.log(result?.uid);
        console.log(result);
        console.log(result.length);
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  const creatRatingRecord = async () => {
    var timestamp = Timestamp.fromDate(new Date());
    console.log('springt in createecord');
    await addDoc(collection(db, 'ratings'), {
      uid: user.uid,
      date: timestamp,
      numberOfStars: value,
    });
  };

  /*
   * side effects
   */
  useEffect(() => {
    getRatingData();
  }, [user]);

  //   useEffect(() => {
  //     if (!userAlreadyRated) {
  //       console.log(userAlreadyRated);
  //       creatRatingRecord();
  //     }
  //   }, [userAlreadyRated]);

  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name='hover-feedback'
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
          creatRatingRecord();
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />}
        disabled={userAlreadyRated}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
}