import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import Question from './src/components/question';
import Phrase from './src/components/phrase';
import Button from './src/components/button';
import firestore from '@react-native-firebase/firestore';

const App = () => {
  const [questions, setQuestions] = useState<Array<any>>([]);
  const [questionCurrent, setQuestionCurrent] = useState<any>({
    phraseEnglish: '',
    phraseGerman: '',
    answerEnglish: '',
    answerGerman: '',
    wordsEnglish: [],
    wordsGerman: [],
  });
  const [answered, setAnswered] = useState<Array<any>>([]);
  const [wordSelected, setWordSelected] = useState<string>('');
  const [buttonState, setButtonState] = useState<string>('disable');
  const [loading, setLoading] = useState<boolean>(false);

  async function getData() {
    const snapshot = await firestore().collection('questions').get();
    return snapshot.docs.map(doc => doc.data());
  }

  async function initQuest() {
    setLoading(true);

    const data = await getData();

    if (data) {
      const randomQuestion = data[Math.floor(Math.random() * data.length)];

      setQuestions(data);
      setAnswered([randomQuestion]);
      setQuestionCurrent(randomQuestion);
    }
    setLoading(false);
  }

  function getAwnser(value: string) {
    if (value === '') {
      setWordSelected(value);
      setButtonState('disable');
    } else {
      setWordSelected(value);
      setButtonState('check');
    }
  }

  function awnserCheck() {
    if (questions.length === answered.length) {
      console.log('===============');
      console.log('Questions Reset!');
      awnserReset();
    } else if (wordSelected === questionCurrent.answerGerman) {
      setButtonState('correct');
    } else {
      setButtonState('incorrect');
    }
  }

  function awnserNext() {
    const notAnswered = questions.filter(function (x) {
      return !answered.find(function (y) {
        // eslint-disable-next-line dot-notation
        return (y['id'] as any) === (x['id'] as any);
      });
    });

    const randomQuestion =
      notAnswered[Math.floor(Math.random() * notAnswered.length)];

    setButtonState('disable');
    setWordSelected('');
    setQuestionCurrent(randomQuestion as any);
    setAnswered([...answered, randomQuestion]);
  }

  function awnserReset() {
    setButtonState('disable');
    setWordSelected('');
    initQuest();
  }

  useEffect(() => {
    initQuest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <View style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.title}>Fill in the missing word</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.title}>Fill in the missing word</Text>
          <Question
            phraseEnglish={questionCurrent.phraseEnglish}
            answerEnglish={questionCurrent.answerEnglish}
          />
          <Phrase
            phraseGerman={questionCurrent.phraseGerman}
            wordsEnglish={questionCurrent.wordsEnglish}
            wordsGerman={questionCurrent.wordsGerman}
            wordToHidden={questionCurrent.answerGerman}
            wordHighlighted={wordSelected}
            getHighlighted={getAwnser}
          />
          <Button
            state={buttonState}
            wordCorrect={questionCurrent.answerGerman}
            onPressedCheck={() => awnserCheck()}
            onPressedNext={() => awnserNext()}
            onPressedReset={() => awnserReset()}
          />
        </View>
      </View>
    );
  }
};

export default App;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#76DAFE',
  },
  container: {
    flex: 1,
    marginTop: '40%',
    backgroundColor: '#3C6C82',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
  },
  title: {
    position: 'absolute',
    color: 'white',
    paddingTop: '15%',
    paddingBottom: '5%',
    fontSize: 12,
  },
});
