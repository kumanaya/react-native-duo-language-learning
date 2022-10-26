import React from 'react';
import {StyleSheet, View} from 'react-native';
import generateUnderline from '../../utils/generateUnderline';

import Selectable from '../Selectable';
import Tooltip from '../Tooltip';

interface IWordSelectable {
  wordToHidden: string;
  wordHighlighted: string;
  wordsEnglish: Array<string>;
  handleSelectable: (word: string) => void;
  word: string;
  index: number;
}

interface IWordSplited {
  wordsEnglish: Array<string>;
  word: string;
  index: number;
}

interface ISelectableList {
  wordHighlighted: string;
  wordsGerman: Array<string>;
  handleSelectable: (word: string) => void;
}

interface IPhrase {
  phraseGerman: string;
  wordsEnglish: Array<string>;
  wordsGerman: Array<string>;
  wordToHidden: string;
  wordHighlighted: string;
  getHighlighted: (value: string) => void;
}

const WordSelectable: React.FC<IWordSelectable> = ({
  wordToHidden,
  wordHighlighted,
  wordsEnglish,
  handleSelectable,
  word,
  index,
}) => {
  if (wordToHidden.indexOf(word) > -1) {
    return (
      <View style={styles.selectable}>
        <Selectable
          word={wordHighlighted}
          onPressed={() => handleSelectable(wordHighlighted)}
          isPressed={false}
        />
      </View>
    );
  }
  return (
    <View style={styles.wordView}>
      <Tooltip wordEnglish={wordsEnglish[index]} wordGerman={word} />
    </View>
  );
};

const WordSplited: React.FC<IWordSplited> = ({wordsEnglish, word, index}) => (
  <View style={styles.wordView}>
    <Tooltip wordEnglish={wordsEnglish[index]} wordGerman={word} />
  </View>
);

const SelectableList: React.FC<ISelectableList> = ({
  wordsGerman,
  handleSelectable,
  wordHighlighted,
}) => (
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

const Phrase: React.FC<IPhrase> = ({
  phraseGerman,
  wordsEnglish,
  wordsGerman,
  wordToHidden,
  wordHighlighted,
  getHighlighted,
}) => {
  const handleSelectable = (word: string) => {
    if (word === wordHighlighted) {
      getHighlighted('');
      return;
    }
    getHighlighted(word);
  };

  if (wordHighlighted.length > 1) {
    const wordsGermanSplited = phraseGerman.split(' ');
    return (
      <View style={styles.container}>
        <View style={styles.phrase}>
          {wordsGermanSplited.map((item, index) => (
            <WordSelectable
              key={index}
              wordToHidden={wordToHidden}
              wordHighlighted={wordHighlighted}
              wordsEnglish={wordsEnglish}
              handleSelectable={handleSelectable}
              word={item}
              index={index}
            />
          ))}
        </View>
        <SelectableList
          wordsGerman={wordsGerman}
          handleSelectable={handleSelectable}
          wordHighlighted={wordHighlighted}
        />
      </View>
    );
  }

  const wordSplited = phraseGerman
    .replace(wordToHidden, generateUnderline(wordToHidden.length))
    .split(' ');

  return (
    <View style={styles.container}>
      <View style={styles.phrase}>
        {wordSplited.map((item, index) => (
          <WordSplited
            key={index}
            wordsEnglish={wordsEnglish}
            word={item}
            index={index}
          />
        ))}
      </View>
      <SelectableList
        wordsGerman={wordsGerman}
        handleSelectable={handleSelectable}
        wordHighlighted={wordHighlighted}
      />
    </View>
  );
};

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
