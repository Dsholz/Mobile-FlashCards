export const RECIEVE_ALL_DECKS = 'RECIEVE_ALL_DECKS'
export const ADD_NEW_DECK = 'ADD_NEW_DECK'
export const ADD_NEW_CARD = 'ADD_NEW_CARD'

export const addNewDeck = (title) => {
  return {
    type: ADD_NEW_DECK,
    title,
    deck: {
      title,
      questions: []
    }
  }
}

export const addNewCard = (title, card) => {
  return {
    type: ADD_NEW_CARD,
    title,
    card
  }
}

export const recieveAllDecks = (decks) => {
  return {
    type: RECIEVE_ALL_DECKS,
    decks
  }
}