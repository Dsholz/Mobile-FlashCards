import * as React from 'react';
import { Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import decks from './reducers/decks'
import logger from './middleware/logger';
import DeckNavigator from './components/DeckNavgator'
import IndividualDeck from './components/IndividualDeck';
import Quiz from './components/Quiz'
import NewCard from './components/NewCard'

const { Navigator, Screen } = createStackNavigator()

const store = createStore(combineReducers({ decks }))

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigator
          initialRouteName='DeckNavigator'>
          <Screen
            name='DeckNavigator'
            component={DeckNavigator}
            options={{
              headerTitle: 'Mobile FlashCards',
              headerStyle: {
                backgroundColor: '#42D1F6'
              },
              headerTintColor: '#f7f7f7'
            }} />
          <Screen
            name='IndividualDeck'
            component={IndividualDeck}
            options={({ route }) => ({
              title: route.params.id
            })} />
          <Screen
            name='NewCard'
            component={NewCard}
            options={({ route }) => ({
              title: `Add Card To ${route.params.id}`,
            })} />
          <Screen
            name='Quiz'
            component={Quiz}
            options={({ route }) => ({
              title: `${route.params.id} Quiz`,
            })} />
        </Navigator>
      </NavigationContainer>
    </Provider>
  );
}