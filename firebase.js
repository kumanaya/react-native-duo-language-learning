import {initializeApp} from 'firebase/app';
import {Firestore} from 'firebase/firestore';

const firebaseConfig = {};

const app = initializeApp(firebaseConfig);

const db = Firestore(app);

export const QuestionsRef = db.collection('questions');
