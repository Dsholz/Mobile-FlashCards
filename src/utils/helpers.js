import AsyncStorage from '@react-native-community/async-storage'

const STORAGE_KEY = 'Mobile_Flashcards_Decks'

export const getDecks = async () => {
  return await AsyncStorage.getItem(STORAGE_KEY)
}

export const saveDeckTitle = async (title) => {
  return await AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
    [title]: {
      title,
      questions: []
    }
  }))
}

export const addCardToDeck = async (title, card) => {
  const decks = await AsyncStorage.getItem(STORAGE_KEY)
  const parseddata = JSON.parse(decks)

  return await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({
    ...parseddata,
    [title]: {
      title,
      questions: [
        ...parseddata[title]['questions'],
        card
      ]
    }
  }))
}