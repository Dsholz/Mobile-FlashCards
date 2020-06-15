import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { saveDeckTitle } from '../utils/helpers'
import { addNewDeck } from '../actions/decks'
import { connect } from 'react-redux'

class NewDeck extends Component {
  state = {
    value: ''
  }

  handleChange = (text) => {
    this.setState(() => ({ value: text }))
  }

  handleSubmit = () => {
    const { value } = this.state
    const { dispatch, navigation } = this.props

    saveDeckTitle(value)
      .then(() => {
        dispatch(addNewDeck(value))
      })

    navigation.navigate('IndividualDeck', {
      id: value
    })

    this.setState(() => ({ value: '' }))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.handleChange(text)}
          value={this.state.value}
          placeholder='Enter Deck Title'
        />
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={this.handleSubmit}>
          <Text style={{ color: '#fff' }}>Create New Deck</Text>
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
    height: 40,
    width: '80%',
    padding: 10,
    borderColor: 'gray',
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 25
  },
  text: {
    fontSize: 45,
    alignItems: "center",
    color: 'gray'
  },
  submitBtn: {
    alignItems: "center",
    width: '80%',
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#332E30'
  }
})

export default connect()(NewDeck)