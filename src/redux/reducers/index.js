import {combineReducers} from 'redux';
import appReducer from './appReducer';
import CheckReducer from './checkReducer';
import alarmReducer from './alarmReducer';
import question from './question';
import userReducer from './userReducer';
import notificationReducer from './notification';
export default combineReducers({
  CHECK: CheckReducer,
  USER: userReducer,
  ALARM: alarmReducer,
  QUESTIONS: question,
  NOTIFICATION: notificationReducer,
  APPSTATE: appReducer,
});
