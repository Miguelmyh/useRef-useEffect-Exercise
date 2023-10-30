import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import { v4 as uuid } from "uuid";

const Deck = () => {
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [visibility, setVisibility] = useState("block");
  useEffect(() => {
    const newDeck = async () => {
      const resp = await axios.get(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
      );
      setDeck({ ...resp.data });
    };
    newDeck();
  }, []);

  const drawCard = async () => {
    try {
      const resp = await axios.get(
        `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
      );
      //resp.data.cards is an array of cards,
      // i am taking the first card because I am drawing only 1 card per button
      console.log(resp.data);
      if (resp.data.remaining === 0) {
        throw new Error("no more cards to draw");
      }
      setCards((oldCards) => [...oldCards, { ...resp.data.cards[0] }]);
    } catch (err) {
      alert(err);
    }
  };

  const shuffleDeck = async () => {
    try {
      setVisibility("hidden");
      await axios.get(
        `https://deckofcardsapi.com/api/deck/${deck.deck_id}/shuffle`
      );
      setCards([]);
      setVisibility("visible");
    } catch (e) {
      alert(e);
    }
  };

  function renderDrawBtnIfOk() {
    if (!deck) return null;

    return (
      <button onClick={drawCard} style={{ visibility: visibility }}>
        Draw card
      </button>
    );
  }

  function renderShuffleBtnIfOk() {
    if (!deck) return null;
    return (
      <button onClick={shuffleDeck} style={{ visibility: visibility }}>
        SHUFFLE DECK
      </button>
    );
  }

  return (
    <>
      <h1>Deck game</h1>
      {renderDrawBtnIfOk()}
      {renderShuffleBtnIfOk()}
      {cards.map((card) => (
        <Card
          key={uuid()}
          value={card.value}
          suits={card.suits}
          image={card.image}
        />
      ))}
    </>
  );
};
export default Deck;
