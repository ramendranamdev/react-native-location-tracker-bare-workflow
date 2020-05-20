import React, {Component, useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Logo from '../components/Logo';
import {AuthContext} from './../Context/AuthContext';
import {Button} from 'react-native-paper';
import {getUserProfile} from '../core/Api';
import {getItemFromAsyncStorage} from '../core/utils';

// const { signOut } = React.useContext(AuthContext);

export default function Profile() {
  const {signOut} = React.useContext(AuthContext);
  let [userid, setUserid] = useState('');
  let [user, setUser] = useState(null);
  let [username, setUsername] = useState(null);
  useEffect(() => {
    getItemFromAsyncStorage('user').then(item => {
      setUsername(item.name);
      setUser(item);
    });
  });

  useEffect(() => {
    if (user) {
      const USER = JSON.parse(user);
      console.log('USER PROFILE:::::', username);
      setUsername(user.name);
      // getUserProfile(USER.token).then((result) => {
      //   let data = result.data;
      //   console.log("DATA::::::::", data);
      // });
    }
  }, [user]);

  if (user == null) {
    return (
      <View style={styles.container}>
        <View style={styles.header} />
        <Image style={styles.avatar} source={require('../assets/avatar.png')} />

        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>John Doe</Text>
            <Text style={styles.info}>UX Designer / Mobile developer</Text>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum
              electram expetendis, omittam deseruisse consequuntur ius an,
            </Text>

            {/* <TouchableOpacity style={styles.buttonContainer}>
            <Text>Edit your profile</Text>
          </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {
                signOut();
              }}>
              <Text>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header} />
          <Image
            style={styles.avatar}
            source={require('../assets/avatar.png')}
          />

          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{user}</Text>
              <Text style={styles.info}>UX Designer / Mobile developer</Text>
              <Text style={styles.description}>
                Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum
                electram expetendis, omittam deseruisse consequuntur ius an,
              </Text>

              {/* <TouchableOpacity style={styles.buttonContainer}>
            <Text>Edit your profile</Text>
          </TouchableOpacity> */}
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                  signOut();
                }}>
                <Text>Sign Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00BFFF',
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
  },
  info: {
    fontSize: 16,
    color: '#00BFFF',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
});
