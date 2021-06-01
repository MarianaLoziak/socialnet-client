import {
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  DELETE_SCREAM,
  POST_SCREAM,
  SET_SCREAM,
  SUBMIT_COMMENT
} from '../types';

const initialState = {
  screams: [],
  scream: {
    comments:[],
    commentCount:0,
  },
  loading: false
};

//export default function(state = initialState, action) {
  const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false
      };
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      var index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
      if (state.scream.screamId === action.payload.screamId) {
        state.scream = {...state.scream, ...action.payload};
      }
      return {
        ...state
      };
    case DELETE_SCREAM:
      index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload
      );
      state.screams.splice(index, 1);
      return {
        ...state
      }; 
      case POST_SCREAM:
        return {
          ...state,
          screams: [action.payload, ...state.screams]
        };
      case SUBMIT_COMMENT:
        index = state.screams.findIndex(
          scream => scream.screamId === action.payload.screamId
        );
      /////// Looks for the scream, just like in "like" and "unlike" reducers
        let updatedScreams = JSON.parse(JSON.stringify(state.screams));
   ///// deep copy of the array - simply spreading it won't work
        updatedScreams[index].commentCount += 1;
        return {
          ...state,
          screams: updatedScreams,
          scream: {
            ...state.scream,
            commentCount: state.scream.commentCount + 1,
            comments: [{...action.payload.comment}, ...state.scream.comments]
          }
        };
    default:
      return state;
  }
}

export default dataReducer;