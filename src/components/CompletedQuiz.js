import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { FontAwesome5, Entypo } from '@expo/vector-icons';

class CompletedQuiz extends Component {
  backToDeck = () => {
    const { navigation, id } = this.props

    navigation.navigate('IndividualDeck', {
      id
    })
  }

  render() {
    const { restartQuiz, percentage, correctOptions, total } = this.props
    return (
      <View style={styles.container}>
        {correctOptions < total
          ? <FontAwesome5 name="sad-tear" size={80} color="red" />
          : <Entypo name="emoji-happy" size={80} color="green" />}
        <Text style={{ fontSize: 25, marginBottom: 15 }}>Correct Answers: {percentage}</Text>
        <TouchableOpacity
          onPress={restartQuiz}
          style={[styles.button, { marginBottom: 25 }]}>
          <Text>Restart Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.backToDeck}
          style={[styles.button, { backgroundColor: '#332E30' }]}>
          <Text style={{ color: '#fff' }}>Back to Deck</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
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
  }
})

export default CompletedQuiz