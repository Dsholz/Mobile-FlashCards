import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'
import DeckList from './DeckList'
import NewDeck from './NewDeck'

const DeckListOptions = {
  tabBarIcon: ({ focused }) => <MaterialCommunityIcons name="cards" size={24} color={focused ? '#42D1F6' : 'black'} />
}

const NewDeckOptions = {
  tabBarIcon: ({ focused }) => <AntDesign name="pluscircle" size={24} color={focused ? '#42D1F6' : 'black'} />
}

const { Navigator, Screen } = createBottomTabNavigator()

class DeckNavigator extends Component {
  render() {
    return (
      <Navigator
        tabBarOptions={{
          activeTintColor: '#42D1F6',
        }}>
        <Screen name='DeckList' component={DeckList} options={DeckListOptions} />
        <Screen name='NewDeck' component={NewDeck} options={NewDeckOptions} />
      </Navigator>
    )
  }
}

export default DeckNavigator