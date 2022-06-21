//=======================================================Action Types Constants
const USER_AUTHORIZE = 'USER_SIGN_IN',
  USER_LOGOUT = 'USER_LOGOUT',
  FETCHING_LOADING = 'FETCHING_LOADING',
  REGISTER_FOR_LINKEDIN = 'REGISTER_FOR_LINKEDIN',
  USER_REFRESH = 'USER_REFRESH',
  CAL_ADD = 'CAL_ADD',
  CAL_SUB = 'CAL_SUB',
  CAL_APPEND = 'CAL_APPEND',
  CAL_DIFF = 'CAL_DIFF',
  CAL_CART = 'CAL_CART',
  CARTITEMUPDATE = 'CARTITEMUPDATE',
  PRODUCTINC = 'PRODUCTINC',
  PRODUCTDEC = 'PRODUCTDEC',
  USERLOGGED = 'USERLOGGED',
  SELECTEDUSER = 'SELECTEDUSER',
  USERDATA = 'USERDATA',
  LOGOUT = 'LOGOUT',
  ADDQUESTION = 'ADDQUESTION',
  SELECTIONBACKEND = 'SELECTIONBACKEND',
  SELECTIONBACKENDS = 'SELECTIONBACKENDS',
  ADDHORSE = 'ADDHORSE',
  ALARMMORNING = 'ALARMMORNING',
  ALARMAFTERNOON = 'ALARMAFTERNOON',
  ALARMEVENING = 'ALARMEVENING',
  ALARMNIGHT = 'ALARMNIGHT',
  QUESTION = 'QUESTION',
  QUESTIONS = 'QUESTIONS',
  CLEARSELBACKENDS = 'CLEARSELBACKENDS',
  DELETEMORNING = 'DELETEMORNING',
  DELETEAFTERNOON = 'DELETEAFTERNOON',
  DELETEEVENING = 'DELETEEVENING',
  DELETENIGHT = 'DELETENIGHT',
  UPDATE = 'UPDATE',
  FCM = 'FCM',
  VERIFY = 'VERIFY',
  EMPTYQUESTION = 'EMPTYQUESTION',
  SELECTQUESTION = 'SELECTQUESTION',
  SELECTQUESTIONS = 'SELECTQUESTIONS',
  SAVEPASSWORD = 'SAVEPASSWORD',
  REMEMBER = 'REMEMBER',
  NOTIFICATIONALERT = 'NOTIFICATIONALERT';
UPDATE_MORNING = 'UPDATE_MORNING';
CHECKMAIL = 'CHECKMAIL';
//========================================================Dispatchers
const userAuthorize = payload => async dispatch => {
  dispatch({type: USER_AUTHORIZE, payload});
  return '';
};
const userRefresh = payload => dispatch => {
  dispatch({type: USER_REFRESH, payload});
};
const userLKAuthorize = payload => dispatch => {
  dispatch({type: REGISTER_FOR_LINKEDIN, payload});
};
const logout = () => dispatch => {
  dispatch({type: USER_LOGOUT});
};
const setLoader = payload => dispatch => {
  dispatch({type: FETCHING_LOADING, payload});
};
const add = () => dispatch => {
  dispatch({type: CAL_ADD});
};
const sub = () => dispatch => {
  dispatch({type: CAL_SUB});
};
const append = payload => dispatch => {
  dispatch({type: CAL_APPEND, payload});
};
const question = payload => dispatch => {
  dispatch({type: QUESTION, payload});
};
const questions = payload => dispatch => {
  dispatch({type: QUESTIONS, payload});
};
const clearQuestion = () => dispatch => {
  dispatch({type: CLEARSELBACKENDS});
};
const addquestion = () => dispatch => {
  dispatch({type: ADDQUESTION});
};
const emptyquestion = () => dispatch => {
  console.log('first i calle');
  dispatch({type: EMPTYQUESTION});
};
const selectquestion = payload => dispatch => {
  dispatch({type: SELECTQUESTION, payload});
};
const selectquestions = payload => dispatch => {
  dispatch({type: SELECTQUESTIONS, payload});
};
const selectquestionbackend = payload => dispatch => {
  dispatch({type: SELECTIONBACKEND, payload});
};
const selectquestionbackends = payload => dispatch => {
  dispatch({type: SELECTIONBACKENDS, payload});
};
const diff = payload => dispatch => {
  dispatch({type: CAL_DIFF, payload});
};
const cart = payload => dispatch => {
  dispatch({type: CAL_CART, payload});
};
const cartItemUpdate = payload => dispatch => {
  dispatch({type: CARTITEMUPDATE, payload});
};
const increament = payload => dispatch => {
  dispatch({type: PRODUCTINC, payload});
};
const decrement = payload => dispatch => {
  dispatch({type: PRODUCTDEC, payload});
};
const logged = payload => dispatch => {
  dispatch({type: USERLOGGED, payload});
};
const checkmail = payload => dispatch => {
  dispatch({type: CHECKMAIL, payload});
};
const logoutuser = payload => dispatch => {
  dispatch({type: LOGOUT, payload});
};
const selecteduser = payload => dispatch => {
  dispatch({type: SELECTEDUSER, payload});
};
const addhorse = payload => dispatch => {
  // console.log('payload inside action', payload);
  dispatch({type: ADDHORSE, payload});
};
const alarmmorning = payload => dispatch => {
  console.log('payyyyyyyyyyyyyyyyyyy', payload);
  // const updateArray = alarmdata.filter(item => {
  //         return item.id !== res.id;
  //       });
  //     var  newarry = [...updateArray, alarmdata];
  //       console.log('new ararararara', newarry);
  dispatch({type: ALARMMORNING, payload});
};
//ustad logic me bata deta hon mujhe ni samjh arahi iski tm khud try kro\usta
// sb sy phly redux me sy sary reminder lay kr ao aur jo edit kr rahy ho usko filter kro id ki base pr
// return item.id!== update.id
//ye array tmhen de ga us array me [..updateed array,updated item]
//jo filter array gay us wo wo wala item ni hoga jo phly tha////ye lagana kdr ha filter redux me bhjny sy phly filter kro aur usy remove kro jisy edit kr rahy ho phr jo edit hokay new data hai us ...update arry jo filter dy ga plus update item wo bhjo

const alarmafternoon = payload => dispatch => {
  dispatch({type: ALARMAFTERNOON, payload});
};
const alarmevening = payload => dispatch => {
  dispatch({type: ALARMEVENING, payload});
};
const alarmnight = payload => dispatch => {
  console.log('i called');
  dispatch({type: ALARMNIGHT, payload});
};
const deletemorning = payload => dispatch => {
  dispatch({type: DELETEMORNING, payload});
};
const deleteafternoon = payload => dispatch => {
  dispatch({type: DELETEAFTERNOON, payload});
};
const deleteevening = payload => dispatch => {
  dispatch({type: DELETEEVENING, payload});
};
const deletenight = payload => dispatch => {
  dispatch({type: DELETENIGHT, payload});
};
const userdata = payload => dispatch => {
  dispatch({type: USERDATA, payload});
};
const update = payload => dispatch => {
  dispatch({type: UPDATE, payload});
};
const verify = payload => dispatch => {
  dispatch({type: VERIFY, payload});
};
const fcm = payload => dispatch => dispatch({type: FCM, payload});
const savepassword = payload => dispatch => {
  dispatch({type: SAVEPASSWORD, payload});
};
const remember = payload => dispatch => {
  dispatch({type: REMEMBER, payload});
};
const notificationAlert = payload => dispatch => {
  dispatch({type: NOTIFICATIONALERT, payload});
};
const updatemorning = payload => dispatch => {
  dispatch({type: UPDATE_MORNING, payload});
};
//========================================================Exporter
const ActionType = {
  CHECKMAIL,
  UPDATE_MORNING,
  FETCHING_LOADING,
  USER_REFRESH,
  USER_LOGOUT,
  USER_AUTHORIZE,
  REGISTER_FOR_LINKEDIN,
  CAL_SUB,
  ADDQUESTION,
  CAL_ADD,
  CAL_APPEND,
  EMPTYQUESTION,
  SELECTIONBACKEND,
  SELECTIONBACKENDS,
  SELECTQUESTIONS,
  SELECTQUESTION,
  CAL_DIFF,
  CAL_CART,
  CARTITEMUPDATE,
  PRODUCTINC,
  PRODUCTDEC,
  USERLOGGED,
  LOGOUT,
  USERDATA,
  SELECTEDUSER,
  DELETEMORNING,
  DELETEEVENING,
  DELETEAFTERNOON,
  DELETENIGHT,
  ADDHORSE,
  QUESTION,
  QUESTIONS,
  ALARMMORNING,
  ALARMAFTERNOON,
  ALARMEVENING,
  CLEARSELBACKENDS,
  ALARMNIGHT,
  UPDATE,
  FCM,
  VERIFY,
  REMEMBER,
  SAVEPASSWORD,
  NOTIFICATIONALERT,
};
export {
  updatemorning,
  ActionType,
  userLKAuthorize,
  logout,
  setLoader,
  userAuthorize,
  userRefresh,
  clearQuestion,
  add,
  sub,
  append,
  questions,
  question,
  diff,
  emptyquestion,
  selectquestions,
  selectquestion,
  cart,
  verify,
  selectquestionbackend,
  selectquestionbackends,
  cartItemUpdate,
  increament,
  decrement,
  logged,
  addquestion,
  logoutuser,
  userdata,
  selecteduser,
  addhorse,
  alarmmorning,
  deletemorning,
  deleteafternoon,
  deletenight,
  deleteevening,
  alarmafternoon,
  alarmevening,
  alarmnight,
  update,
  fcm,
  savepassword,
  remember,
  notificationAlert,
  checkmail,
};
