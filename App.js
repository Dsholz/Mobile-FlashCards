import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'
import decks from './src/reducers/decks'
import DeckNavigator from './src/components/DeckNavgator'
import IndividualDeck from './src/components/IndividualDeck';
import Quiz from './src/components/Quiz'
import NewCard from './src/components/NewCard'

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