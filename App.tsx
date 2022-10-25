import type {DocumentData} from 'firebase/firestore';

import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import Question from './src/components/question';
import Phrase from './src/components/phrase';
import Button from './src/components/button';

interface IQuestion {
  id?: number;
  phraseEnglish: string;
  phraseGerman: string;
  answerEnglish: string;
  answerGerman: string;
  wordsEnglish: [];
  wordsGerman: [];
}

const App = () => {
  const [questions, setQuestions] = useState<DocumentData[]>([]);
  const [current, setCurrent] = useState<IQuestion>({
    phraseEnglish: '',
    phraseGerman: '',
    answerEnglish: '',
    answerGerman: '',
    wordsEnglish: [],
    wordsGerman: [],
  });
  const [answered, setAnswered] = useState<Array<IQuestion>>([]);
  const [selected, setSelected] = useState<string>('');
  const [button, setButton] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const initQuest = async () => {
    setLoading(true);
    try {
      const questionsData = await getData();

      if (questionsData) {
        const randomQuestion = questionRandomized(questionsData);
        setQuestions(questionsData);
        setCurrent(randomQuestion);
        setAnswered([randomQuestion]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getData = async (): Promise<DocumentData[]> => {
    const snapshot = await firestore().collection('questions').get();
    return snapshot.docs.map(doc => doc.data());
  };

  const questionRandomized = (data: DocumentData[]): any => {
    return data[Math.floor(Math.random() * data.length)];
  };

  const getAwnser = (value: string) => {
    if (value === '') {
      setSelected(value);
      setButton('disable');
    } else {
      setSelected(value);
      setButton('check');
    }
  };

  const awnserCheck = () => {
    if (questions.length === answered.length) {
      console.log('===============');
      console.log('Questions Reset!');
      awnserReset();
    } else if (selected === current.answerGerman) {
      setButton('correct');
    } else {
      setButton('incorrect');
    }
  };

  const filterNotAnswered = () => {
    return questions.filter(function (q) {
      return !answered.find(function (a) {
        // eslint-disable-next-line dot-notation
        return q['id'] === a['id'];
      });
    });
  };

  const awnserNext = () => {
    const notAnswered = filterNotAnswered();

    const randomQuestion = questionRandomized(notAnswered);

    setButton('disable');
    setSelected('');
    setCurrent(randomQuestion as any);
    setAnswered([...answered, randomQuestion]);
  };

  const awnserReset = () => {
    setButton('disable');
    setSelected('');
    initQuest();
  };

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
  }

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Fill in the missing word</Text>
        <Question
          phraseEnglish={current.phraseEnglish}
          answerEnglish={current.answerEnglish}
        />
        <Phrase
          phraseGerman={current.phraseGerman}
          wordsEnglish={current.wordsEnglish}
          wordsGerman={current.wordsGerman}
          wordToHidden={current.answerGerman}
          wordHighlighted={selected}
          getHighlighted={getAwnser}
        />
        <Button
          state={button}
          wordCorrect={current.answerGerman}
          onPressedCheck={() => awnserCheck()}
          onPressedNext={() => awnserNext()}
          onPressedReset={() => awnserReset()}
        />
      </View>
    </View>
  );
};

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

export default App;
