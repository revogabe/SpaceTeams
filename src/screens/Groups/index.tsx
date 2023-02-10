import { StyleSheet, Text, View } from "react-native"

export function Groups() {
  return (
    <View style={styles.container}>
      <Text style={styles.textContainer}>Groups</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
    alignItems: "center",
    justifyContent: "center",
  },

  textContainer: {
    color: "#fff",
    fontSize: 24,
  },
})
