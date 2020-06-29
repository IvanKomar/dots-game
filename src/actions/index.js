import GameService from "../services/GameService"
import {
  FETCH_ERROR, FETCH_LOADER, FETCH_SETTING_SUCCESS, SET_USER_NAME, SET_USER_MODE, SET_USER_NAME_ERROR,
  SET_USER_MODE_ERROR, ADD_ELEMENT_FIELD, CHANGE_ELEMENT_STATUS, START_USER_GAME, END_USER_GAME, FETCH_WINNERS_SUCCESS
} from "../types"
import {nanoid} from 'nanoid'


const service = new GameService()


export const getGameMode = () => {
  return dispatch => {
    service.getGameSetting()
      .then(
        (data) => {
          const array = (data) => {
            let i = 0
            for (let key in data) {
              i++
              data[key].mode = key
              data[key].id = nanoid(4) + i
            }
            return data

          }
          const newData = Object.values(array(data))
          dispatch(fetchSettingSuccess(newData))
        },
        error => {
          dispatch(fetchError(error))
        }
      )
  }
}

export const getWinners = () => {
  return dispatch => {
    dispatch(fetchLoader())
    service.getGameWinners()
      .then(
        (data) => {
          dispatch(fetchWinnersSuccess(data))

        },
        error => {
          dispatch(fetchError(error))
        }
      )
  }
}

const fetchLoader = () => {
  return {
    type: FETCH_LOADER
  }
}
export const setWinners = (data) => {
  return dispatch => {
    dispatch(fetchLoader())
    service.setGameWinners(data)
      .then(
        (data) => {
          dispatch(fetchWinnersSuccess(data))
        },
        error => {
          dispatch(fetchError(error))
        }
      )
  }
}
export const fetchWinnersSuccess = (payload) => {
  return {
    type: FETCH_WINNERS_SUCCESS,
    payload
  }
}
export const startUserGame = () => {
  return {
    type: START_USER_GAME,
  }
}

export const setUserName = (name) => {
  return {
    type: SET_USER_NAME,
    payload: name
  }
}
export const setUserMode = (field) => {
  return dispatch => {

    dispatch(setUserModeName(field))
    dispatch(addElementField(field))

  }
}


export const setUserModeName = (mode) => {
  return {
    type: SET_USER_MODE,
    payload: mode
  }
}

export const setUserNameError = (error) => {
  return {
    type: SET_USER_NAME_ERROR,
    payload: error
  }
}

export const setUserModeError = (error) => {
  return {
    type: SET_USER_MODE_ERROR,
    payload: error
  }
}


export const changeElementStatus = (id, status) => {
  return {
    type: CHANGE_ELEMENT_STATUS,
    id,
    status
  }
}
export const endUserGame = (payload) => {
  return {
    type: END_USER_GAME,
    payload
  }

}
export const addElementField = (size) => {
  let arrayElement = []
  for (let i = 0; i < Math.pow(size, 2); i++) {
    arrayElement.push({
      id: nanoid(4)+i,
      status: 0
    })
  }

  return {
    type: ADD_ELEMENT_FIELD,
    payload: arrayElement
  }
}

function fetchSettingSuccess(payload) {
  return {
    type: FETCH_SETTING_SUCCESS,
    payload
  }
}

function fetchError(error) {
  return {
    type: FETCH_ERROR,
    error: error
  }
}
