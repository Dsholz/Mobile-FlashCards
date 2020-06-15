import React from 'react'
import { View, Text } from 'react-native'

const EmptyDeck = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingLeft: 10 }}>
    <Text style={{ fontSize: 35 }}>Sorry, you cannot take the quiz because there are no cards in the deck.</Text>
  </View>
)

export default EmptyDeck