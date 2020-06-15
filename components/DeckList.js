import React, { Component } from 'react'
import { StatusBar, StyleSheet, ScrollView } from 'react-native'
import DeckItem from './DeckItem'
import { getDecks } from '../utils/helpers'
import { connect } from 'react-redux'
import { recieveAllDecks } from '../actions/decks'
import { createStackNavigator } from '@react-navigation/stack'
import * as Permissions from 'expo-permissions'
import { Notifications } from 'expo'
import { setReminderNotification, subscribeToNotifications } from '../utils/notifications'

const { Navigator, Screen } = createStackNavigator()

class DeckList extends Component {
  componentDidMount() {
    const { dispatch } = this.props

    getDecks()
      .then((data) => {
        dispatch(recieveAllDecks(JSON.parse(data)))
      })

    subscribeToNotifications()
      .then(setReminderNotification)
  }

  render() {
    const { deckslist, navigation } = this.props

    return (
      <ScrollView style={{ flex: 1 }}>
        <StatusBar backgroundColor='transparent' barStyle='dark-content' />
        {deckslist.map((deck) => (
          <DeckItem key={deck} id={deck} navigation={navigation} />
        ))}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#332E30',
    color: '#fff',
    textTransform: "uppercase",
    padding: 20
  }
})

const mapStateToProps = ({ decks }) => {
  return {
    deckslist: decks ? Object.keys(decks) : null
  }
}

export default connect(mapStateToProps)(DeckList)