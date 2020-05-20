import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";

const LOCATION_TASK_NAME = "background-location-task";

export default class BackgroundLocationAPI extends React.Component {
  onPress = async () => {
    const { status } = await Location.requestPermissionsAsync();
    if (status === "granted") {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 1000,
      }).then(() => {
        console.log("Good to go");
      });
    }
  };

  render() {
    return (
      <TouchableOpacity onPress={this.onPress}>
        <Text>Enable background location</Text>
      </TouchableOpacity>
    );
  }
}

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    // Error occurred - check `error.message` for more details.
    console.log("Err: ", error);
    return;
  }
  if (data) {
    const { locations } = data;
    console.log("Data", locations);
    // do something with the locations captured in the background
  }
});
