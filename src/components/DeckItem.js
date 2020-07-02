import React, { Component } from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

class DeckItem extends Component {
  navigateToView = () => {
    const { navigation, id } = this.props

    navigation.navigate('IndividualDeck', {
      id
    })
  }

  render() {
    const { title, questions } = this.props.deck
    const { id } = this.props

    return (
      <TouchableOpacity onPress={this.navigateToView} style={styles.deckItem}>
        <Text>{title}</Text>
        <Text>{questions.length} Cards</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  deckItem: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1
  }
})

const mapStateToProps = ({ decks }, { id }) => {
  const pickedDeck = decks ? decks[id] : {}

  return {
    deck: pickedDeck ? pickedDeck : {}
  }
}

export default connect(mapStateToProps)(DeckItem)