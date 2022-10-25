# Duo - Language learning

Duo is the language-learning platform developed in React Native with typescript.

## Features
- 🇺🇸 Questions in english
- 🇩🇪 Answer in german

## Benefits

Your brain will grow.
You will have better memory.
You will have better listening skills.
You will have higher verbal and non-verbal intelligence.
...

## UI/UX

<p align="center">
	<img src="https://github.com/kumanaya/react-native-duo-language-learning/blob/master/images/1.jpeg" width="200">
	&nbsp; &nbsp; &nbsp; &nbsp
	<img src="https://github.com/kumanaya/react-native-duo-language-learning/blob/master/images/2.jpeg" width="200">
    &nbsp; &nbsp; &nbsp; &nbsp
	<img src="https://github.com/kumanaya/react-native-duo-language-learning/blob/master/images/4.jpeg" width="200">
</p>

## Tech

Duo uses a number of projects to work properly:

- [React Native](https://reactnative.dev/) - Create apps for Android and iOS using React
- [Typescript](https://www.typescriptlang.org/) - TypeScript is a strongly typed programming language that builds on JavaScript,
- [Firebase](https://https://firebase.google.com/) - Firestore to get data in cloud

## Firebase

- Create firebase project into firebase console.
- Add. web app and (IOS & Android), save all files into respective location.
- Copy the web firebase config and add. into firebase.js file.
Example:
```
const firebaseConfig = {
  apiKey: '<apiKey>',
  authDomain: '<authDomain>',
  projectId: '<projectId>',
  storageBucket: '<storageBucket>',
  messagingSenderId: '<messagingSenderId>',
  appId: '<appId>',
};
```

## Firebase Store
- Example of questions structure:
[colection] questions > [documents] ids > [fields] docs

```
{
  "id": 1,
  "phraseEnglish": "Coffee and milk",
  "phraseGerman": "Kaffee und milch",
  "answerEnglish": "milk",
  "wordsEnglish": ["coffee", "and", "milk", "please"],
  "answerGerman": "milch",
  "wordsGerman": ["kaffee", "und", "milch", "bitte"]
}
```

## Installation

Install the dependencies

```sh
cd react-native-duo-language-learning
npm install
```

To use in IOS emulator

```sh
cd ios
pod install
```

### _Want to contribute? Great!_
