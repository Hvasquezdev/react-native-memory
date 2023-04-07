import { StatusBar } from "expo-status-bar";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { shuffleArray } from "./utils/index";
import Card from "./components/card/Card";
import { LinearGradient } from "expo-linear-gradient";
import { useGameManager } from "./hooks/useGameManager";

const cards = ["👻", "🐻", "🍔", "⚽", "🚀", "🦧"];
const board = shuffleArray([...cards, ...cards]);

export default function App() {
  const {
    handleCardTap,
    isCardTurnedOver,
    isCardMatched,
    isWinner,
    resetGame,
  } = useGameManager(board);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#6bba62", "#9ae17b"]}
        style={styles.background}
      />

      <Text style={styles.title}>
        {isWinner ? "Congratulations! 🎉" : "Memory"}
      </Text>
      <StatusBar style="light" />

      <View style={styles.board}>
        {board.map((card, index) => (
          <Card
            key={index}
            isTurnedOver={isCardTurnedOver(index)}
            isMatched={isCardMatched(index)}
            onPress={() => handleCardTap(index)}
          >
            {card}
          </Card>
        ))}
      </View>

      {isWinner ? (
        <Pressable style={styles.resetButton} onPress={resetGame}>
          <Text style={styles.resetButtonText}>Reset Game</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    color: "white",
    fontWeight: "900",
    letterSpacing: 0.55,
  },
  board: {
    gap: 16,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 32,
    paddingHorizontal: 8,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  resetButton: {
    backgroundColor: "white",
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  resetButtonText: {
    fontSize: 18,
    fontWeight: "900",
    textTransform: "uppercase",
    color: "#6bba62",
    letterSpacing: 0.55,
  },
});
