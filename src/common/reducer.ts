import {Reducer, ReducersMapObject, combineReducers} from 'redux'
import {handleActions} from 'redux-actions'
import {Location, LocationState} from 'redux-first-router'
import * as Actions from './actions'

/** Structure of common state */
export interface Common {
  inClient: boolean
}

/** Structure of application state */
export interface State {
  common: Common
  location: LocationState
}

/** Required additional reducers */
export interface ExtraReducers extends ReducersMapObject {
  location: Reducer<Location>
}

const INITIAL_STATE: Common = {
  inClient: false,
}

/** Reducer that handles common actions */
export const reducer = handleActions({
  [`${Actions.enableClient}`]: state => state.inClient
    ? state
    : {...state, inClient: true},
}, INITIAL_STATE)

/**
 * Create a reducer creator for potential additional reducer key/value pairs
 * @param reducers Reducers map
 * @return Reducer creator
 */
export function createReducerCreator<S extends State>(
  reducers: ReducersMapObject,
) {
  return function createReducer(extraReducers: ExtraReducers) {
    return combineReducers<S>({
      ...reducers,
      ...extraReducers,
      common: reducer,
    })
  }
}
