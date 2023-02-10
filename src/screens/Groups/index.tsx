import { StyleSheet, Text, View } from "react-native"
import { Container } from "./styles"

export function Groups() {
  return (
    <Container>
      <Text style={styles.text}>Groups</Text>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {},

  text: {
    color: "#fff",
    fontSize: 24,
  },
})
