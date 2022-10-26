import {initializeApp} from 'firebase/app';
import {Firestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBMVB6oRpWEDpuY9Y2RWfYnahcbqv5avsM',
  authDomain: 'duolingo-6b8ac.firebaseapp.com',
  projectId: 'duolingo-6b8ac',
  storageBucket: 'duolingo-6b8ac.appspot.com',
  messagingSenderId: '111977299443',
  appId: '1:111977299443:web:208393a4838abe0f8aa686',
};

const app = initializeApp(firebaseConfig);

const db = Firestore(app);

export const QuestionsRef = db.collection('questions');
