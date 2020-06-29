import { createStore, applyMiddleware} from 'redux'
import { gameReducer } from '../reducer'
import thunkMiddleware from 'redux-thunk'


const IS_DEV = process.env.NODE_ENV !== 'production'
let middleware

if (IS_DEV) {
  middleware = applyMiddleware(
    thunkMiddleware,
  )
} else {
  middleware = applyMiddleware(
    thunkMiddleware,
  )
}



export const store = createStore(
  gameReducer,
  middleware
)
