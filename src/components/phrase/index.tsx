/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Selectable from '../selectable';

export function Phrase({
  phrase,
  words,
  wordToHidden,
  wordHighlighted,
  getHighlighted,
}: {
  phrase: string;
  words: Array<string>;
  wordToHidden: string;
  wordHighlighted: string;
  getHighlighted: (value: string) => void;
}) {
  function handleSelectable(_word: string) {
    if (_word === wordHighlighted) {
      getHighlighted('');
    } else {
      getHighlighted(_word);
    }
  }

  const renderWordSelectable = (w: any) => {
    if (wordToHidden.indexOf(w) > -1) {
      return (
        <View style={styles.selectable}>
          <Selectable
            word={wordHighlighted}
            onPressed={() => handleSelectable(wordHighlighted)}
            isPressed={false}
          />
        </View>
      );
    } else {
      return <Text style={styles.word}>{w} </Text>;
    }
  };

  const selectableList = (
    <View style={styles.selectableList}>
      <View style={styles.selectableItem}>
        {words.map((word, index) => {
          return (
            <View style={styles.selectableItem}>
              <Selectable
                word={word}
                onPressed={() => handleSelectable(word)}
                isPressed={wordHighlighted === word ? true : false}
              />
            </View>
          );
        })}
      </View>
    </View>
  );

  var phraseComponent;

  if (wordHighlighted.length > 1) {
    const wordsSplited = phrase.split(' ');

    phraseComponent = (
      <View style={styles.phrase}>
        {React.Children.map(wordsSplited, renderWordSelectable)}
      </View>
    );
  } else {
    var underline = '_';

    var i = wordToHidden.length + 5;
    while (i--) {
      underline = underline + '_';
    }

    phrase = phrase.replace(wordToHidden, underline);

    phraseComponent = (
      <View style={styles.phrase}>
        <Text style={styles.word}>{phrase}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {phraseComponent}
      {selectableList}
    </View>
  );
}

export default Phrase;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  phraseView: {
    position: 'absolute',
    flexDirection: 'row',
    flexWrap: 'wrap',
    top: '25%',
  },
  phrase: {
    flexDirection: 'row',
    position: 'absolute',
    top: '25%',
    paddingHorizontal: 20,
    flexWrap: 'wrap',
  },
  selectable: {
    paddingHorizontal: 7,
    flexWrap: 'wrap',
  },
  word: {
    color: 'white',
    fontSize: 19,
  },
  selectableList: {
    position: 'absolute',
    flex: 1,
    top: '34%',
  },
  selectableItem: {
    padding: 10,
    flexWrap: 'wrap',
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: 'row',
  },
});
