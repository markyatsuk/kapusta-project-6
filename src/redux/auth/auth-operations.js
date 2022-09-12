import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Notiflix from 'notiflix';

axios.defaults.baseURL = 'https://finantial-book-kapusta.herokuapp.com/api';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const googleApi = createAsyncThunk('/auth/google', credentials => {
  try {
    return credentials;
  } catch (error) {
    console.log(error);
  }
});

const register = createAsyncThunk('/auth/register', async credentials => {
  try {
    const { data } = await axios.post('/auth/register', credentials);
    // token.set(data.token);
    Notiflix.Notify.success('Success! Now you can login ✔', {
      timeout: 1500,
    });
    return data;
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('This user is already registered ⚠', {
      timeout: 1500,
    });
  }
});

const logIn = createAsyncThunk('/auth/login', async credentials => {
  try {
    const { data } = await axios.post('/auth/login', credentials);
    token.set(data.data.token);
    Notiflix.Notify.success('Welcome ✔', {
      timeout: 1500,
    });
    return data.data;
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('Wrong login or password ❗', {
      timeout: 1500,
    });
  }
});

const logOut = createAsyncThunk('/auth/logout', async () => {
  try {
    await axios.get('/auth/logout');
    token.unset();
  } catch (error) {
    console.log(error);
  }
});

const fetchCurrentUser = createAsyncThunk(
  '/auth/current',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue();
    }

    token.set(persistedToken);
    try {
      const { data } = await axios.get('/auth/current');
      // console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

const updateBalance = createAsyncThunk(
  '/users/balance',
  async (credentials, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue();
    }

    token.set(persistedToken);
    try {
      const { data } = await axios.put('/users/balance', credentials);
      Notiflix.Notify.success('Balance updated', {
        timeout: 2000,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

// const getCurrentUser = createAsyncThunk('/auth/current', async () => {
//   try {
//     await axios.get('/auth/current');
//     token.unset();
//   } catch (error) {
//     console.log(error);
//   }
// });

const authOperations = {
  register,
  logOut,
  logIn,
  fetchCurrentUser,
  googleApi,
  updateBalance,
};

export default authOperations;
