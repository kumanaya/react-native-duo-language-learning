import React from 'react';
import {StyleSheet, Text} from 'react-native';

export function Question({
  phraseEnglish,
  answerEnglish,
}: {
  phraseEnglish: string;
  answerEnglish: string;
}) {
  const words = phraseEnglish.split(' ');
  const wordsToHighlight = answerEnglish;

  const renderWord = (w: any) => {
    if (wordsToHighlight.indexOf(w) > -1) {
      return <Text style={styles.questionCorrect}>{w} </Text>;
    } else {
      return <Text>{w} </Text>;
    }
  };

  const component = (
    <Text style={styles.question}>{React.Children.map(words, renderWord)}</Text>
  );

  return component;
}

export default Question;

const styles = StyleSheet.create({
  question: {
    position: 'absolute',
    top: '15%',
    color: 'white',
    paddingBottom: '5%',
    fontSize: 19,
  },
  questionCorrect: {
    color: 'white',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
