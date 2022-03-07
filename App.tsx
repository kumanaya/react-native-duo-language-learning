/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import Question from './src/components/question';
import Phrase from './src/components/phrase';
import Button from './src/components/button';

interface IFirebase {
  id: number;
  phrase: string;
  answerEnglish: string;
  answerGerman: string;
  words: Array<string>;
}

const firebase = [
  {
    id: 1,
    phrase: 'The house is small.',
    answerEnglish: 'house',
    answerGerman: 'hause',
    words: ['folgen', 'schaf', 'bereiden', 'hause'],
  },
  {
    id: 2,
    phrase: 'Go and find the driver who arrived here yesterday',
    answerEnglish: 'who',
    answerGerman: 'wer',
    words: ['err', 'wer', 'wessen', 'wen'],
  },
  {
    id: 3,
    phrase: 'I met her in tuesday.',
    answerEnglish: 'in',
    answerGerman: 'in',
    words: ['in', 'auf', 'an', 'aus'],
  },
];

const App = () => {
  const [questions, setQuestions] = useState<Array<IFirebase>>([]);
  const [questionCurrent, setQuestionCurrent] = useState<IFirebase>({
    id: 0,
    phrase: '',
    answerEnglish: '',
    answerGerman: '',
    words: [],
  });
  const [answered, setAnswered] = useState<Array<IFirebase>>([]);
  const [wordSelected, setWordSelected] = useState<string>('');
  const [buttonState, setButtonState] = useState<string>('disable');
  const [loading, setLoading] = useState<boolean>(false);

  function loadData() {
    setLoading(true);
    setQuestions(firebase);
    initQuest();
  }

  function initQuest() {
    const randomQuestion =
      firebase[Math.floor(Math.random() * firebase.length)];

    setAnswered([randomQuestion]);
    setQuestionCurrent(randomQuestion);
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
    if (wordSelected === questionCurrent.answerGerman) {
      setButtonState('correct');
    } else {
      setButtonState('incorrect');
    }
  }

  function awnserNext() {
    const notAnswered = questions.filter(function (cv) {
      return !answered.find(function (e) {
        // eslint-disable-next-line dot-notation
        return (e['id'] as any) === (cv['id'] as any);
      });
    });

    const randomQuestion =
      notAnswered[Math.floor(Math.random() * notAnswered.length)];

    setButtonState('disable');
    setWordSelected('');
    setQuestionCurrent(randomQuestion as any);
    setAnswered([...[randomQuestion]]);
  }

  function awnserReset() {
    setButtonState('disable');
    setWordSelected('');
    initQuest();
  }

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.title}>Fill in the missing word</Text>
          <Question
            phrase={questionCurrent.phrase}
            word={questionCurrent.answerEnglish}
          />
          <Phrase
            phrase={questionCurrent.phrase}
            words={questionCurrent.words}
            wordToHidden={questionCurrent.answerEnglish}
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
