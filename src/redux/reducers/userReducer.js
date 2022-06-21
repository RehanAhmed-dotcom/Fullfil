import {ActionType} from '../actions';
const InitialCalState = {
  isLoggedIn: false,
  showmov:false,
  verified: false,
  userData: {},
  fcmtoken: '',
  checked: false,
  passwoord: '',
  notificationSymbol: false,
  checkdata:{}
};

export default (state = InitialCalState, {type, payload}) => {
  switch (type) {
    case ActionType.USERLOGGED: {
      // console.log('hhhh', 'Why m i calling');
      return {
        ...state,
        isLoggedIn: true,
        showmov: true,

        userData: {...payload},
      };
    }

    case ActionType.  CHECKMAIL: {
      // console.log('hhhh', 'Why m i calling');
      return {
        ...state,
        // isLoggedIn: true,
        checkdata: {...payload},
      };
    }
    case ActionType.VERIFY: {
      return {
        ...state,
        verified: true,
      };
    }
    case ActionType.LOGOUT: {
      return {
        ...state,
        isLoggedIn: payload,
      };
    }
    case ActionType.UPDATE: {
      return {
        ...state,
        userData: {...payload},
      };
    }
    case ActionType.FCM: {
      //console.log('avc', fcmtoken);
      return {
        ...state,
        fcmtoken: payload,
      };
    }
    case ActionType.SAVEPASSWORD: {
      return {
        ...state,
        passwoord: payload,
      };
    }
    case ActionType.REMEMBER: {
      return {
        ...state,
        checked: payload,
      };
    }
    case ActionType.NOTIFICATIONALERT: {
      // console.log("true,false",notificationSymbol);
      return {
        ...state,
        notificationSymbol: payload,
      };
    }
    default:
      return state;
  }
};
