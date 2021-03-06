import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import Reactotron from 'reactotron-react-native';
import thunk from 'redux-thunk';
import {
  createReactNavigationReduxMiddleware,
  createNavigationReducer
} from 'react-navigation-redux-helpers';
import { fetchMiddleware, configureMergeState } from 'redux-recompose';
import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';
import {
  seamlessImmutableReconciler,
  seamlessImmutableTransformCreator
} from 'redux-persist-seamless-immutable';

import auth from './auth/reducer';

import Navigator from '@screens';

const transformerConfig = {
  whitelistPerReducer: {
auth: ['currentUser']  }
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
  stateReconciler: seamlessImmutableReconciler,
  transforms: [seamlessImmutableTransformCreator(transformerConfig)]
};

const nav = createNavigationReducer(Navigator);

configureMergeState((state, diff) => state.merge(diff));

const reducers = combineReducers({
auth,
nav
});

const persistedReducer = persistReducer(persistConfig, reducers);

const middlewares = [];
const enhancers = [];

/* ------------- React Navigation Middleware ------------- */
middlewares.push(createReactNavigationReduxMiddleware(state => state.nav));

/* ------------- Thunk Middleware ------------- */
middlewares.push(thunk);

/* ------------- Redux-Recompose Middleware ------------- */
middlewares.push(fetchMiddleware);

/* ------------- Assemble Middleware ------------- */
enhancers.push(applyMiddleware(...middlewares));

if (__DEV__) enhancers.push(Reactotron.createEnhancer());

// in dev mode, we'll create the store through Reactotron
const store = createStore(persistedReducer
, compose(...enhancers));

export default store;
