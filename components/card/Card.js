import { Pressable, Text, StyleSheet } from "react-native";
import React from "react";

const styles = StyleSheet.create({
  card: {
    width: 100,
    height: 100,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#42476d',
    borderWidth: 6,
    borderColor: '#353b68'
  },
  matched: {
    borderColor: 'white',
  },
  text: {
    color: 'white',
    fontSize: 46
  }
})

const Card = ({ onPress, isTurnedOver, isMatched, children }) => {
  return (
    <Pressable style={{
      ...styles.card,
      ...(isMatched ? styles.matched : {})
    }} onPress={onPress}>
      <Text style={styles.text}>{(isTurnedOver || isMatched) ? children : '?'}</Text>
    </Pressable>
  );
};

export default Card;
