import React from 'react';
import {StyleSheet, View} from 'react-native';
import Selectable from '../selectable';

import Tooltip from '../tooltip';

export function Phrase({
  phraseGerman,
  wordsEnglish,
  wordsGerman,
  wordToHidden,
  wordHighlighted,
  getHighlighted,
}: {
  phraseGerman: string;
  wordsEnglish: Array<string>;
  wordsGerman: Array<string>;
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

  const renderWordSelectable = (w: any, index: any) => {
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
      return (
        <View style={styles.wordView}>
          <Tooltip wordEnglish={wordsEnglish[index]} wordGerman={w} />
        </View>
      );
    }
  };

  const renderWordSplited = (w: any, index: any) => {
    return (
      <View style={styles.wordView}>
        <Tooltip wordEnglish={wordsEnglish[index]} wordGerman={w} />
      </View>
    );
  };

  const selectableList = (
    <View style={styles.selectableList}>
      <View style={styles.selectableItem}>
        {wordsGerman.map((word, index) => {
          return (
            <View key={index} style={styles.selectableItem}>
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
    const wordsSplited = phraseGerman.split(' ');
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

    const wordsSplited = phraseGerman
      .replace(wordToHidden, underline)
      .split(' ');

    phraseComponent = (
      <View style={styles.phrase}>
        {React.Children.map(wordsSplited, renderWordSplited)}
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
    flexWrap: 'wrap',
  },
  wordView: {
    paddingHorizontal: '2%',
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
