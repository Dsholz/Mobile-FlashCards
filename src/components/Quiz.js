import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import EmptyDeck from './EmptyDeck'
import CompletedQuiz from './CompletedQuiz'
import { clearAllNotifications, setReminderNotification } from '../utils/notifications'

class Quiz extends Component {
  state = {
    displayQuestionAnswer: false,
    correctAnswers: 0
  }

  answerQuestion = (questionAnswer) => {
    const { navigation, route } = this.props

    clearAllNotifications()
      .then(setReminderNotification)

    navigation.navigate('Quiz', {
      answeredIndex: route.params.answeredIndex + 1
    })

    this.setState((prevState) => ({
      correctAnswers: questionAnswer === 'Correct' ? prevState.correctAnswers + 1 : prevState.correctAnswers,
      displayQuestionAnswer: false
    }))
  }

  toggleQuestion = () => {
    this.setState((prevState) => ({
      displayQuestionAnswer: !prevState.displayQuestionAnswer
    }))
  }

  restartQuiz = () => {
    const { navigation, route } = this.props

    navigation.navigate('Quiz', {
      id: route.params.id,
      answeredIndex: 0
    })

    this.setState(() => ({
      correctAnswers: 0
    }))
  }

  render() {
    const { questions } = this.props.deck
    const { answeredIndex, id } = this.props.route.params
    const { displayQuestionAnswer, correctAnswers } = this.state
    const { navigation } = this.props

    if (questions.length === 0) {
      return (<EmptyDeck />)
    }

    if (questions.length === answeredIndex) {
      return (
        <CompletedQuiz
          id={id}
          navigation={navigation}
          restartQuiz={this.restartQuiz}
          correctOptions={correctAnswers}
          total={questions.length}
          percentage={`${correctAnswers} / ${questions.length}`} />
      )
    }
    const { question, answer } = questions[answeredIndex]
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.indexText}>{answeredIndex + 1} / {questions.length}</Text>
        <View style={styles.container}>
          <Text style={styles.text}>
            {displayQuestionAnswer ? answer : question}
          </Text>
          <TouchableOpacity onPress={this.toggleQuestion}>
            <Text style={{ color: '#ED2831' }}>
              {displayQuestionAnswer ? 'Show Question' : 'Show Answer'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.answerQuestion('Correct')}
            style={[styles.answerButton, { backgroundColor: '#3AE856', marginBottom: 40 }]}>
            <Text style={{ color: '#fff' }}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.answerQuestion('Incorrect')}
            style={[styles.answerButton, { backgroundColor: '#ED2831' }]}>
            <Text style={{ color: '#fff' }}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  },
  indexText: {
    fontSize: 24,
    paddingLeft: 12,
    paddingTop: 12
  },
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: 100,
    paddingBottom: 100
  },
  answerButton: {
    width: '75%',
    alignItems: "center",
    borderRadius: 7,
    padding: 15
  }
})

const mapStateToProps = ({ decks }, { route }) => {
  const id = route.params.id
  const deck = decks[id]

  return {
    deck
  }
}

export default connect(mapStateToProps)(Quiz)