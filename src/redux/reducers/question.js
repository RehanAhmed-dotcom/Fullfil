import {ActionType} from '../actions';
const InitialQuestionState = {
  Question: [],
  Questions: [],
  QuestionCopy: [],
  SelectedQuestion: [],
  SelectedQuestions: [],
  SelectedQuestionBackEnd: [],
  SelectedQuestionBackEnds: [],
};

export default (state = InitialQuestionState, {type, payload}) => {
  switch (type) {
    case ActionType.QUESTION: {
      return {...state, SelectedQuestion: [...payload], Question: [...payload]};
    }
    case ActionType.QUESTIONS: {
      return {
        ...state,
        SelectedQuestions: [...payload],
        Questions: [...payload],
      };
    }
    case ActionType.CLEARSELBACKENDS: {
      return {
        ...state,
        SelectedQuestionBackEnds: [],
      };
    }
    case ActionType.EMPTYQUESTION: {
      console.log('abc', 'icaleld');
      return {
        ...state,
        QuestionCopy: [],
        Question: [],
        SelectedQuestion: [],
        SelectedQuestionBackEnd: [],
      };
    }
    case ActionType.ADDQUESTION: {
      return {
        ...state,
        QuestionCopy: [...state.QuestionCopy, ...state.Question],
      };
    }
    case ActionType.SELECTIONBACKEND: {
      console.log('payload', payload);
      let selectQuestion = [...state.SelectedQuestionBackEnd];
      let questionArray = [...state.Question];
      // if (selectQuestion.length) {
      const foundId = questionArray.find(cat => cat.id === payload.item1.id);
      const foundCatIndex = questionArray.findIndex(
        cat => cat.id == payload.item1.id,
      );
      // if()
      // if(foundId.option==0){

      // }
      console.log('id', foundId);
      console.log('index', foundCatIndex);
      const inSelect = selectQuestion.findIndex(
        cat => cat.id == payload.item1.id,
      );
      console.log('in select', inSelect);
      if (inSelect == -1) {
        const newQuestiondata = {
          ...foundId,
          option: payload.index,
        };
        selectQuestion.push(newQuestiondata);
      } else {
        const newQuestion = {
          ...foundId,
          option: payload.index,
        };
        selectQuestion[inSelect] = newQuestion;
        // selectQuestion[inSelect].option == payload.index;
      }

      // }
      return {
        ...state,
        SelectedQuestionBackEnd: selectQuestion,
      };
    }
    case ActionType.SELECTIONBACKENDS: {
      // console.log('payload', payload);
      let selectQuestion = [...state.SelectedQuestionBackEnds];
      let questionArray = [...state.Questions];
      // if (selectQuestion.length) {
      const foundId = questionArray.find(cat => cat.id === payload.item1.id);
      const foundCatIndex = questionArray.findIndex(
        cat => cat.id == payload.item1.id,
      );
      // if()
      // if(foundId.option==0){

      // }
      console.log('id', foundId);
      console.log('index', foundCatIndex);
      const inSelect = selectQuestion.findIndex(
        cat => cat.id == payload.item1.id,
      );
      console.log('in select', inSelect);
      if (inSelect == -1) {
        const newQuestiondata = {
          ...foundId,
          option: payload.index,
        };
        selectQuestion.push(newQuestiondata);
      } else {
        const newQuestion = {
          ...foundId,
          option: payload.index,
        };
        selectQuestion[inSelect] = newQuestion;
        // selectQuestion[inSelect].option == payload.index;
      }

      // }
      return {
        ...state,
        SelectedQuestionBackEnds: selectQuestion,
      };
    }
    case ActionType.SELECTQUESTION: {
      console.log('payload', payload);
      let selectQuestion = [...state.SelectedQuestion];
      let questionArray = [...state.Question];
      // if (selectQuestion.length) {
      const foundId = questionArray.find(cat => cat.id === payload.item1.id);
      const foundCatIndex = questionArray.findIndex(
        cat => cat.id == payload.item1.id,
      );
      // if()
      // if(foundId.option==0){

      // }
      console.log('id', foundId);
      console.log('index', foundCatIndex);
      const inSelect = selectQuestion.findIndex(
        cat => cat.id == payload.item1.id,
      );
      console.log('in select', inSelect);
      if (inSelect == -1) {
        const newQuestiondata = {
          ...foundId,
          option: payload.index,
        };
        selectQuestion.push(newQuestiondata);
      } else {
        const newQuestion = {
          ...foundId,
          option: payload.index,
        };
        selectQuestion[inSelect] = newQuestion;
        // selectQuestion[inSelect].option == payload.index;
      }

      // }
      return {
        ...state,
        SelectedQuestion: selectQuestion,
      };
    }
    case ActionType.SELECTQUESTIONS: {
      console.log('payload', payload);
      let selectQuestion = [...state.SelectedQuestions];
      let questionArray = [...state.Questions];
      // if (selectQuestion.length) {
      const foundId = questionArray.find(cat => cat.id === payload.item1.id);
      const foundCatIndex = questionArray.findIndex(
        cat => cat.id == payload.item1.id,
      );
      // if()
      // if(foundId.option==0){

      // }
      console.log('id', foundId);
      console.log('index', foundCatIndex);
      const inSelect = selectQuestion.findIndex(
        cat => cat.id == payload.item1.id,
      );
      console.log('in select', inSelect);
      if (inSelect == -1) {
        const newQuestiondata = {
          ...foundId,
          option: payload.index,
        };
        selectQuestion.push(newQuestiondata);
      } else {
        const newQuestion = {
          ...foundId,
          option: payload.index,
        };
        selectQuestion[inSelect] = newQuestion;
        // selectQuestion[inSelect].option == payload.index;
      }

      // }
      return {
        ...state,
        SelectedQuestions: selectQuestion,
      };
    }
    default:
      return state;
  }
};
