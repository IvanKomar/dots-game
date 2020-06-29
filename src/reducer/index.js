import {
  FETCH_ERROR,
  FETCH_LOADER,
  FETCH_SETTING_SUCCESS,
  SET_USER_NAME,
  SET_USER_MODE,
  SET_USER_MODE_ERROR,
  SET_USER_NAME_ERROR,
  START_USER_GAME,
  ADD_ELEMENT_FIELD,
  CHANGE_ELEMENT_STATUS,
  END_USER_GAME,
  FETCH_WINNERS_SUCCESS
} from "../types"

const initialState = {
  loading: false,
  winners: [],
  userName: '',
  userMode: '',
  delay: '',
  userNameError: '',
  userModeError: '',
  gameWinner: '',
  endGame: false,
  startGame: false,
  arrayGameField: [],
  gameSetting: [],
  gameMode: [],
  error: null
}


export function gameReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_LOADER:
      return {
        ...state,
        loading: true
      }
    case FETCH_SETTING_SUCCESS:
      return {
        ...state,

        gameSetting: action.payload,
        gameMode: action.payload
      }
    case FETCH_WINNERS_SUCCESS:
      return {
        ...state,
        loading: false,
        winners: action.payload
      }
    case SET_USER_NAME:
      return {
        ...state,
        userName: action.payload,
        userNameError: ''
      }
    case SET_USER_NAME_ERROR:
      return {
        ...state,
        userNameError: action.payload
      }
    case SET_USER_MODE_ERROR:
      return {
        ...state,
        userModeError: action.payload
      }
    case SET_USER_MODE:
      const idx = state.gameSetting.findIndex(element => element.field === +action.payload)
      const delay = state.gameSetting[idx].delay
      return {
        ...state,
        userMode: action.payload,
        delay,
        userModeError: ''
      }

    case START_USER_GAME:
      return {
        ...state,
        endGame: false,
        startGame: true,
        gameWinner: "",
        arrayGameField: state.arrayGameField.map(item => item.status === 0 ?
          item : {...item, status: 0}
        )
      }
    case END_USER_GAME:
      return {
        ...state,
        startGame: false,
        endGame: true,
        gameWinner: action.payload,

      }
    case ADD_ELEMENT_FIELD:
      return {
        ...state,
        arrayGameField: action.payload
      }

    case CHANGE_ELEMENT_STATUS:

      return {
        ...state,
        arrayGameField: state.arrayGameField.map(item => item.id === action.id ?
          {...item, status: action.status} : item
        )
      }

    case FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    default:
      return state
  }
}