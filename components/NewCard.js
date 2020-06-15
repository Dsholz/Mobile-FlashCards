import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { addCardToDeck } from '../utils/helpers'
import { connect } from 'react-redux'
import { addNewCard } from '../actions/decks'

class NewCard extends Component {
  state = {
    question: '',
    answer: ''
  }

  handleChangeQuestion = (text) => {
    this.setState(() => ({
      question: text
    }))
  }

  handleChangeAnswer = (text) => {
    this.setState(() => ({
      answer: text
    }))
  }

  addCard = () => {
    const { question, answer } = this.state
    const { dispatch, route, navigation } = this.props

    console.log(route.params.id)


    addCardToDeck(route.params.id, {
      question,
      answer
    }).then(() => {
      dispatch(addNewCard(route.params.id, {
        question,
        answer
      }))
    })

    navigation.goBack()
  }

  render() {
    const { question, answer } = this.state

    return (
      <View style={styles.container}>
        <TextInput
          name='question'
          value={question}
          style={[styles.textInput]}
          placeholder='Enter Question Here...'
          onChangeText={this.handleChangeQuestion}
        />
        <TextInput
          name='answer'
          value={answer}
          style={styles.textInput}
          placeholder='Enter Answer Here...'
          onChangeText={this.handleChangeAnswer}
        />
        <TouchableOpacity
          disabled={(question && answer) ? false : true}
          style={styles.submitBtn}
          onPress={this.addCard}>
          <Text style={styles.text}>Add Card</Text>
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
  textInput: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderRadius: 7,
    padding: 10,
    marginBottom: 60
  },
  submitBtn: {
    width: '80%',
    alignItems: "center",
    borderRadius: 7,
    backgroundColor: '#332E30',
    padding: 15
  },
  text: {
    color: '#fff'
  }
})

export default connect()(NewCard)