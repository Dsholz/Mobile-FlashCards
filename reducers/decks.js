import { RECIEVE_ALL_DECKS, ADD_NEW_DECK, ADD_NEW_CARD } from '../actions/decks'

export default function decks(state = {}, action) {
  switch (action.type) {
    case RECIEVE_ALL_DECKS:
      return action.decks
    case ADD_NEW_DECK:
      return {
        ...state,
        [action.title]: action.deck
      }
    case ADD_NEW_CARD:
      return {
        ...state,
        [action.title]: {
          ...state[action.title],
          questions: state[action.title]['questions'].concat(action.card)
        }
      }
    default:
      return state
  }
}