import React from "react";
import { View, Text, StyleSheet } from "react-native";

function CovidDataCard(props) {
  return (
    <View style={styles.coviddata}>
      <Text style={styles.covidDataH1}>{props.field}</Text>
      <Text style={styles.covidDataH2}>{props.count}</Text>
    </View>
  );
}

export default CovidDataCard;

const styles = StyleSheet.create({
  coviddata: {
    flexDirection: "row",
    height: 100,
    borderColor: "black",
    marginBottom: 5,
    borderWidth: 1,
    padding: 10,
  },
  covidDataH1: {
    fontSize: 18,
    // borderColor: "black",
    // borderWidth: 1,
    flexDirection: "column",
    width: "30%",
    alignSelf: "center",
  },
  covidDataH2: {
    flexDirection: "column",
    // borderColor: colors.red,
    // borderWidth: 1,
    flex: 1,
    alignSelf: "center",
    textAlign: "center",
  },
});
