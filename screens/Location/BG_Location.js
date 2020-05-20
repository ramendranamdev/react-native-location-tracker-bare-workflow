import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, ToastAndroid } from "react-native";

import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import useInterval from "react-useinterval";
import * as MediaLibrary from "expo-media-library";

const LOCATION_TASK_NAME = "background-location-task";
let background_location = null;

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  console.log("Task Manager");

  if (error) {
    // Error occurred - check `error.message` for more details.
    console.log(error.message);
    return;
  }
  if (data) {
    const { locations } = data;
    // do something with the locations captured in the background
    background_location = locations[locations.length - 1];
    console.log(background_location);
    ToastAndroid.show("BG Location Update", ToastAndroid.SHORT);
  }
});

function BG_Location(props) {
  const [loadfont, setloadfont] = useState(true);
  const [permission_status, setpermission_status] = useState("undetermined");
  const [acc, setacc] = useState(-1);
  const [altitude, setaltitude] = useState(-1);
  const [heading, setheading] = useState(-1);
  const [latitude, setlatitude] = useState(-1);
  const [longitude, setlonggitude] = useState(-1);
  const [speed, setspeed] = useState(-1);
  const [time, settime] = useState("");
  const [updatePeriod, setupdatePeriod] = useState(null);
  const [address, setaddress] = useState(null);
  const [card_collapse1, setcard_collapse1] = useState(false);
  const [card_collapse2, setcard_collapse2] = useState(false);
  const [record, setrecord] = useState(false);
  const [storagePermission, setstoragePermission] = useState("denied");

  initializeApp = async () => {
    const { status } = await Location.requestPermissionsAsync();
    setpermission_status(status);

    const grantStorage = await MediaLibrary.requestPermissionsAsync();
    setstoragePermission(grantStorage.status);
    console.log("Permissions granted");
  };

  useEffect(() => {
    initializeApp();

    return () => stop_update_location();
  }, []);

  useInterval(() => {
    update_location();
    console.log("UseInterval");

    if (background_location != null) {
      console.log(background_location);
    }
  }, updatePeriod);

  update_location = async () => {
    Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.High,
    }).then(() => {
      console.log("up");
    });

    if (background_location) {
      const e = background_location.coords;
      setacc(e.accuracy);
      setaltitude(e.altitude);
      setheading(e.heading);
      setlatitude(e.latitude);
      setlonggitude(e.longitude);
      setspeed(e.speed);
      settime(Date(background_location.timestamp).toLocaleString());
    }
  };

  stop_update_location = async () => {
    setupdatePeriod(null);
    const taskRegistered = await TaskManager.isTaskRegisteredAsync(
      LOCATION_TASK_NAME
    );
    if (taskRegistered) {
      await TaskManager.unregisterTaskAsync(LOCATION_TASK_NAME);
    }
  };

  display_record = () => {
    let text = "";
    props.locations_store.map((item) => {
      text =
        text +
        item.time +
        "," +
        item.latitude.toString() +
        "," +
        item.longitude.toString() +
        "\n";
    });
    alert(text);
  };

  if (permission_status !== "granted" || storagePermission !== "granted") {
    return (
      <View style={styles.container}>
        <Text>App needs location and storage permission granted</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "#D0D3D4" }}>Realtime GPS +</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 10,
        }}
      >
        <Button
          title="Update Location"
          small
          style={{ width: 150, justifyContent: "center" }}
          onPress={() => setupdatePeriod(1000)}
        ></Button>
        <Button
          title="Stop Update"
          small
          style={{ width: 150, justifyContent: "center" }}
          onPress={() => stop_update_location()}
        ></Button>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 10,
        }}
      >
        <Button
          title="New Record"
          small
          style={{ width: 150, justifyContent: "center" }}
          onPress={() => {
            // props.dispatch(deleteLocations());
            setupdatePeriod(1000);
            setrecord(true);
          }}
        ></Button>
        <Button
          title="Continue Record"
          small
          style={{ width: 150, justifyContent: "center" }}
          onPress={() => {
            setupdatePeriod(1000);
            setrecord(true);
          }}
        ></Button>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 10,
        }}
      >
        <Button
          title="Stop Record"
          small
          style={{ width: 150, justifyContent: "center" }}
          onPress={() => {
            stop_update_location();
            setrecord(false);
          }}
        ></Button>
        <Button
          title="Show Record"
          small
          style={{ width: 150, justifyContent: "center" }}
          onPress={() => display_record()}
        ></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
});

export default BG_Location;
