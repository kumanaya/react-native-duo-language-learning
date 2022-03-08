import React, {useState} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';

export function Tooltip({
  wordEnglish,
  wordGerman,
}: {
  wordEnglish: string;
  wordGerman: string;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  function onPressed() {
    setShowTooltip(true);
    setTimeout(function () {
      setShowTooltip(false);
    }, 1000);
  }

  if (showTooltip && wordGerman[0] !== '_') {
    return (
      <Pressable onPress={onPressed}>
        <View style={styles.container}>
          <Text style={styles.text}>{wordEnglish}</Text>
          <View style={styles.arrow} />
        </View>
        <View style={styles.wordView}>
          <Text style={styles.word}>{wordGerman}</Text>
        </View>
      </Pressable>
    );
  } else {
    return (
      <Pressable onPress={onPressed}>
        <View style={styles.wordView}>
          <Text style={styles.word}>{wordGerman}</Text>
        </View>
      </Pressable>
    );
  }
}

export default Tooltip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    position: 'relative',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    bottom: '190%',
    marginBottom: -35,
  },
  text: {
    textAlignVertical: 'center',
    textAlign: 'center',
    padding: 8,
    zIndex: 1,
  },
  arrow: {
    position: 'absolute',
    top: '80%',
    left: '50%',
    marginLeft: -5,
    borderWidth: 5,
    borderColor: 'white',
    transform: [{rotate: '45deg'}],
  },
  wordView: {
    paddingHorizontal: '2%',
  },
  word: {
    position: 'relative',
    color: 'white',
    fontSize: 19,
  },
});
