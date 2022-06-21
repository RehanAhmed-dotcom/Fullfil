import Axios from 'axios';
const axios = Axios.create({
  baseURL: 'https://intechsol.co/fulfilled/api',
  headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
});
const authorizedHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: '',
};
const register = payload => {
  const request = `/register`;
  return axios
    .post(request, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in register', e);
      throw e;
    });
};

const checkemail = payload => {
  const request = '/check-user';
  return axios
    .post(request, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('check email', e);
    });
};

const login = payload => {
  const requrest = `/login`;
  return axios
    .post(requrest, payload)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch login', e);
    });
};
const forgotMail = payload => {
  const requrest = `/forgot`;
  return axios
    .post(requrest, payload)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch forgot', e);
    });
};
const edit = (payload, data1) => {
  const request = `/edit`;
  return axios
    .post(request, data1, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch edit', e);
    });
};
const verifyPin = payload => {
  const request = `/confirm`;
  return axios
    .post(request, payload)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch confirm', e);
    });
};
const viewJournal = payload => {
  const request = `/view-journal`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch view journal', e);
    });
};
const addJournal = payload => {
  const request = `/add-journal`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch add journal', e);
    });
};
const resetPassword = payload => {
  const request = `/reset`;
  return axios
    .post(request, payload)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch reset', e);
    });
};
const picsApi = () => {
  const request = `/home`;
  return axios
    .get(request)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in picsapi', e);
    });
};
const sourceApi = (payload, data1) => {
  const request = `/submit-source`;
  return axios
    .post(request, data1, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch source', e);
    });
};
const hungerGraph = payload => {
  console.log('payload', payload);
  const request = `/hunger-fullness-graph/${
    payload.date ? payload.date : null
  }`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in hunger graph', e);
    });
};
const mindGraph = payload => {
  console.log('payload', payload);
  const request = `/mind-fullness-graph/${
    payload.date1 ? payload.date1 : null
  }`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in mind graph', e);
    });
};
const orderList = payload => {
  const request = `/order`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in orderList', e);
    });
};
const deleteHistory = payload => {
  const request = `/delete-history`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in orderList', e);
    });
};
const requestList = payload => {
  const request = `/requested`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in orderList', e);
    });
};
const updateToken = payload => {
  const request = `/update-fcmtoken`;
  // const {Auth, ...rest} = payload;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in updateToken', e);
    });
};
const notificationList = payload => {
  const request = `/notification-list`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch notification list', e);
    });
};
const messageApi = payload => {
  const request = `/mail`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in mail', e);
    });
};

const viewMusic = payload => {
  const request = `/view-music`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in view music', e);
    });
};

const viewFlashCard = payload => {
  const request = `/view-flash_card`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in flash card', e);
    });
};

const addAffirmation = payload => {
  const request = `/add-affirmation`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in add affirmation', e);
    });
};

const viewAffirmation = payload => {
  const request = `/view-affirmation`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in view affirmation', e);
    });
};
const addtodoList = payload => {
  const request = `/add-todo`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(err => {
      console.log('in add todo', err);
    });
};
const viewTodoList = payload => {
  const request = `/view-todo`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in view affirmation', e);
    });
};

const deleteTodoList = payload => {
  const request = `/delete-todo`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(err => {
      console.log('in delete todo', err);
    });
};

const viewMeal = payload => {
  const request = `/view-meal-time`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in view meal', e);
    });
};
const addMeal = (payload, data1) => {
  // console.log('res check', JSON.stringify(data1));
  const request = `/add-meal`;
  return axios
    .post(request, data1, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      console.log('success');
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in add meal ', e);
    });
};
const addWater = (payload, data1) => {
  // console.log('res check', JSON.stringify(data1));
  const request = `/add-water`;
  return axios
    .post(request, data1, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in add water ', e);
    });
};
const addMovement = (payload, data1) => {
  console.log('res check', JSON.stringify(data1));
  const request = `/add-movement`;
  return axios
    .post(request, data1, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in add movement ', e);
    });
};

const viewMoment = payload => {
  const request = `/view-movement-time`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in view moment', e);
    });
};
const viewMomentbyId = payload => {
  const request = `/view-movement/${payload.movement_time}`;
  //console.log('lllll', payload);
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in view meal by id ', e);
      // return {data: []};
    });
};
const viewMealbyId = payload => {
  const request = `/view-meal/${payload.id}/${payload.date}`;
  //console.log('lllll', payload);
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in view meal by id catch', e);
      // return {data: []};
    });
};
const viewWaterbyId = payload => {
  const request = `/view-water/${payload.id}/${payload.date}`;
  //console.log('lllll', payload);
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in view water by id catch', e);
      // return {data: []};
    });
};
const graphtData = payload => {
  const request = `/store-graph-data`;
  console.log('payload', payload);
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in graph data', e);
      // return {data: []};
    });
};
const addNote = payload => {
  const request = `/add-note`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(err => {
      console.log('in add note', err);
    });
};
const deleteFood = payload => {
  const request = `/delete-meal`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(err => {
      console.log('in delete food', err);
    });
};
const deleteWater = payload => {
  const request = `/delete-water`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(err => {
      console.log('in delete food', err);
    });
};
const deleteMoment = payload => {
  const request = `/delete-movement`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(err => {
      console.log('in delete Moment', err);
    });
};
const viewNote = payload => {
  const request = `/view-note`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(err => {
      console.log('in view note', err);
    });
};
const sleepDate = payload => {
  const request = `/sleep-dates`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(err => {
      console.log('in sleep date', err);
    });
};
const sleepDateSpecific = payload => {
  console.log('payload', payload);
  const request = `/sleep-history/${payload.date}`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(err => {
      console.log('in sleep date specific', err);
    });
};
const sleepDelete = payload => {
  console.log('payload', payload);
  const request = `/delete-graph`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(err => {
      console.log('in sleep delete', err);
    });
};
const editProfile = (payload, data1) => {
  // console.log('res check', JSON.stringify(data1));
  const request = `/edit`;
  return axios
    .post(request, data1, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in edit profile ', e);
    });
};
const pdf = () => {
  const request = `/download-pdf`;
  return axios
    .get(request)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in pdf', e);
    });
};
const groundingPdf = () => {
  const request = `/grounding-download-pdf`;
  return axios
    .get(request)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in groundingpdf', e);
    });
};
const boxpdf = () => {
  const request = `/box-breathing-download-pdf`;
  return axios
    .get(request)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in boxpdf', e);
    });
};
const intuativepdf = () => {
  const request = `/intuitive-eating-download-pdf`;
  return axios
    .get(request)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in intuativepdf', e);
    });
};
const question = payload => {
  const request = `/view-question-type`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(err => {
      console.log('in question', err);
    });
};
const getSleep = payload => {
  const request = `/last-night-graph`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(err => {
      console.log('in get Sleep', err);
    });
};
const momentGraph = payload => {
  const request = `/joyful-movement-graph/${
    payload.date2 ? payload.date2 : null
  }`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(err => {
      console.log('err in graph movement ', err);
    });
};
const getweeklySleep = payload => {
  const request = `/weekly-sleep-graph`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(err => {
      console.log('in get Sleep weekly', err);
    });
};
const getweeklySleepGraph = payload => {
  const request = `/current-weekly-sleep-graph/${payload.period}`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(err => {
      console.log('in get Sleep weekly', err);
    });
};
const contact = payload => {
  const request = `/contact-us`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(err => {
      console.log('in contact', err);
    });
};
const history = payload => {
  const request = `/history/${payload.date}/${payload.cat}`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(err => {
      console.log('in history', err);
    });
};

// resia {"history":
// [{"date": "OCT 11, 2021", "id": 1, "option1": "0", "option10":
// null, "option2": "0", "option3": "1",
// "option4": "0", "option5": "0", "option6":
// null, "option7": null, "option8": null,
// "option9": null, "question": "I respect my body.",
//  "question_type_id": "1"}], "message":
//   "Quiz History", "status": "success"}

const getweeklyAverage = payload => {
  const request = `/weekly-average-graph`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(err => {
      console.log('in get Sleep weekly average', err);
    });
};
const questionsdata = payload => {
  const request = `/view-question/${payload.cat}?page=${payload.page}`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(err => {
      console.log('in view question data', err);
    });
};
const datesshow = payload => {
  const request = `/quiz-dates/${payload.cat}`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(err => {
      console.log('in view quiz dates', err);
    });
};
const questionMental = payload => {
  const request = `/mental-health-question`;
  return axios
    .get(request)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(err => {
      console.log('in mental', err);
    });
};
const addQuestion = (payload, data1) => {
  const request = `/add-question`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, data1, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(err => {
      console.log('in add question', err);
    });
};
export {
  register,
  edit,
  updateToken,
  messageApi,
  login,
  notificationList,
  getweeklySleepGraph,
  picsApi,
  sourceApi,
  getweeklySleep,
  forgotMail,
  verifyPin,
  resetPassword,
  requestList,
  orderList,
  deleteHistory,
  viewJournal,
  sleepDate,
  sleepDateSpecific,
  hungerGraph,
  mindGraph,
  addJournal,
  addWater,
  viewMusic,
  deleteFood,
  viewFlashCard,
  addAffirmation,
  viewAffirmation,
  history,
  addtodoList,
  deleteWater,
  viewTodoList,
  deleteTodoList,
  sleepDelete,
  viewMeal,
  addMeal,
  viewMealbyId,
  viewMoment,
  viewMomentbyId,
  addMovement,
  addNote,
  viewNote,
  editProfile,
  deleteMoment,
  pdf,
  question,
  getSleep,
  questionsdata,
  addQuestion,
  getweeklyAverage,
  contact,
  questionMental,
  checkemail,
  boxpdf,
  groundingPdf,
  datesshow,
  intuativepdf,
  graphtData,
  viewWaterbyId,
  momentGraph,
};
