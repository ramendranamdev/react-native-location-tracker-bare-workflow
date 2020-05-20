import axios from 'axios';
import {emailValidator, passwordValidator} from './utils';
import {api_base_url} from './../config';

const base_url = api_base_url;
const content_type = 'Application/Json';
const register_user_url = base_url + '/users';
const login_url = base_url + '/login';
const location_data_url = base_url + '/location';

export const welcomeRoute = () => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(base_url + '/location/dataa', {'x-api-token': 'token'})
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export const getLocationData = token => {
  return new Promise((resolve, reject) => {
    axios
      .get(location_data_url + '/data', {
        headers: {'x-api-token': token},
      })
      .then(result => {
        resolve(result.data);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};

export const registerUser = (name, email, password) =>
  //Sanitize Data here first
  {
    return new Promise((resolve, reject) => {
      let user = {
        name,
        email,
        password,
      };
      axios
        .post(register_user_url, user, {
          'content-type': 'Application/Json',
        })
        .then(result => {
          //   console.log(result.data);
          resolve(result.data);
        })
        .catch(err => {
          reject(err);
        });
      //   console.log("Nothing Happend");
    });
  };

export const loginUser = (email, password) => {
  return new Promise((resolve, reject) => {
    let user = {
      email,
      password,
    };

    console.log('Login called');

    axios
      .post(login_url, user, {'content-type': 'Application/Json'})
      .then(result => {
        // console.log(result);
        const data = result.data;
        // console.log(data);

        resolve(data);
      })
      .catch(err => {
        console.log('HI i am error');

        reject(err);
      });
  });
};

export const covid19IndiaData = () => {
  return new Promise((resolve, reject) => {
    axios
      .get('https://api.rootnet.in/covid19-in/stats/latest')
      .then(ressult => {
        return result.data;
      })
      .catch(err => {
        console.log(err);
        return null;
      });
  });
};

export const getUserProfile = token => {
  return new Promise((resolve, reject) => {
    axios
      .get(base_url + `/users/currentUser`, {
        headers: {
          'x-api-token': token,
          'Cache-Control': 'no-cache',
        },
      })
      .then(result => {
        console.log(result.data);

        // resolve(result.data);
      })
      .catch(err => {
        console.log('Hi i am error');

        reject(err);
      });
  });
};
