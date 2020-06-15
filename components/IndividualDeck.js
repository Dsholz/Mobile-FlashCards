import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class IndividualDeck extends Component {
  navigateToCard = () => {
    const { navigation, route } = this.props

    navigation.navigate('NewCard', {
      id: route.params.id
    })
  }

  navigateToQuiz = () => {
    const { navigation, route } = this.props

    navigation.navigate('Quiz', {
      id: route.params.id,
      answeredIndex: 0
    })
  }

  render() {
    const { title, questions } = this.props.deck

    return (
      <View style={styles.deckDetails}>
        <Text style={styles.text}>{title}</Text>
        <Text style={[styles.text, { fontWeight: '100' }]}>{title ? questions.length : 0} Cards</Text>
        <TouchableOpacity
          onPress={this.navigateToCard}
          style={[styles.button, { marginBottom: 25 }]}>
          <Text>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.navigateToQuiz}
          style={[styles.button, { backgroundColor: '#332E30' }]}>
          <Text style={{ color: '#fff' }}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  deckDetails: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    width: '60%',
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderRadius: 7,
  },
  text: {
    fontSize: 30,
    marginBottom: 15
  }
})

const mapStateToProps = ({ decks }, { route }) => {
  const { id } = route.params
  const currentDeck = decks[id]

  return {
    deck: currentDeck ? currentDeck : {}
  }
}

export default connect(mapStateToProps)(IndividualDeck)