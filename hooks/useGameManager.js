import { useCallback, useEffect, useMemo, useState } from "react"

export const useGameManager = (board = []) => {
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  useEffect(() => {
    if (selectedCards.length < 2) return;

    if (board[selectedCards[0]] === board[selectedCards[1]]) {
      setMatchedCards([...matchedCards, ...selectedCards]);
      setSelectedCards([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      setSelectedCards([]);
    }, 500);

    return () => clearTimeout(timeoutId)
  }, [selectedCards]);

  const handleCardTap = useCallback((index = 0) => {
    if (selectedCards.length >= 2 || selectedCards.includes(index)) return;

    setSelectedCards([...selectedCards, index]);
  }, [selectedCards, setSelectedCards]);
  
  const isCardTurnedOver = useCallback((index = 0) => {
    return selectedCards.includes(index);
  }, [selectedCards])

  const isCardMatched = useCallback((index = 0) => {
    return matchedCards.includes(index);
  }, [matchedCards]);

  const isWinner = useMemo(() => {
    return board.length > 0 && board.length === matchedCards.length;
  }, [board, matchedCards]);

  const resetGame = useCallback(() => {
    setMatchedCards([]);
    setSelectedCards([]);
  }, [isWinner]);

  return {
    isWinner,
    selectedCards,
    matchedCards,
    handleCardTap,
    isCardMatched,
    isCardTurnedOver,
    resetGame
  }
}