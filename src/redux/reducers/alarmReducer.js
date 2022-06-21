import {ActionType} from '../actions';
const InitialAlarmState = {
  Morning: [],
  Afternoon: [],
  Evening: [],
  Night: [],
  updatemorning: [],
};
export default (state = InitialAlarmState, {type, payload}) => {
  switch (type) {
    case ActionType.ALARMMORNING: {
      // return state.map(item => {
      //   if (item.id === payload.id) {  // Match the item by id and update its title
      //     return {
      //       ...item,
      //       title: payload.title
      //     };
      //   }
      //   return item;
      // });
      return {...state, Morning: [...state.Morning, ...payload]};
    }
    case ActionType.ALARMAFTERNOON: {
      return {...state, Afternoon: [...state.Afternoon, ...payload]};
    }
    case ActionType.ALARMEVENING: {
      return {...state, Evening: [...state.Evening, ...payload]};
    }
    case ActionType.ALARMNIGHT: {
      // console.log('me too');
      return {...state, Night: [...state.Night, ...payload]};
    }
    case ActionType.UPDATE_MORNING: {
      // console.log('me too');
      return {...state, updatemorning: [...state.updatemorning, ...payload]};
    }
    case ActionType.DELETEAFTERNOON: {
      const newArr = state.Afternoon.filter(item => item.id != payload);
      return {...state, Afternoon: newArr};
    }
    case ActionType.DELETEMORNING: {
      const newArr = state.Morning.filter(item => item.id != payload);
      return {...state, Morning: newArr};
    }
    case ActionType.DELETEEVENING: {
      const newArr = state.Evening.filter(item => item.id != payload);
      return {...state, Evening: newArr};
    }
    case ActionType.DELETENIGHT: {
      const newArr = state.Night.filter(item => item.id != payload);
      return {...state, Night: newArr};
    }
    default:
      return state;
  }
};
