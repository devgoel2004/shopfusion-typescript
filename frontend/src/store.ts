import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import {
  userReducer,
  profileReducer,
  updateReducer,
  forgotPasswordReducer,
  allUsersReducer,
  userDetailsReducer,
} from "./reducers/userReducer";

const reducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  update: updateReducer,
  forgotPassword: forgotPasswordReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
});

const initialState = {};
const middleware = [thunk];

const store = createStore(reducer, initialState, applyMiddleware(...middleware));

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;
export default store;