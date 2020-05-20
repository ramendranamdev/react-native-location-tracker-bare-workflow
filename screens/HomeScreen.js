import * as React from 'react';
import {useState, useEffect, useRef} from 'react';
import {
  Platform,
  FlatList,
  ScrollView,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Button,
  AsyncStorage,
} from 'react-native';
// import {AuthContext} from '../Context/AuthContext';
// import {getLocationData} from '../core/Api';
import CovidDataCard from '../components/CovidDataCard';
// import {covid19IndiaData} from './../core/Api';

const covidData = [
  {
    field: 'Active',
    count: '50',
  },
  {
    field: 'Confirmed',
    count: '100',
  },
  {
    field: 'Recovered',
    count: '100',
  },
];

const instructions = Platform.select({
  ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
  android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
});

function HomeScreen({navigation}) {
  // const { signOut } = React.useContext(AuthContext);
  // let [token, setToken] = useState('');

  useEffect(() => {
    // _retrieveData();
    // retrieveItem('userToken')
    //   .then(data => {
    //     //this callback is executed when your Promise is resolved
    //     usertoken = data;
    //     setToken(data);
    //   })
    //   .catch(error => {
    //     //this callback is executed when your Promise is rejected
    //     console.log('Promise is rejected with error: ' + error);
    //   });
  });

  // async function retrieveItem(key) {
  //   try {
  //     const retrievedItem = await AsyncStorage.getItem(key);
  //     // const item = JSON.parse(retrievedItem);
  //     const item = retrievedItem;
  //     return item;
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  //   return;
  // }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.header_text}>COVID - 19 DATA</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.live}>
            <Text>Live</Text>
          </View>
          {covidData.map(item => {
            return (
              <CovidDataCard
                field={item.field}
                count={item.count}
                key={item.field}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;
const colors = {
  green: 'green',
  red: 'red',
  black: 'black',
  white: 'white',
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: '#F5FCFF',
    marginTop: 20,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  header: {
    flex: 1,
    padding: 10,
    alignSelf: 'center',
  },
  header_text: {
    marginTop: 20,
    fontSize: 30,
  },
  live: {
    height: 50,
    color: '#d7d3de',
    // borderColor: "red",
    // borderWidth: 1,
    padding: 10,
  },
});
