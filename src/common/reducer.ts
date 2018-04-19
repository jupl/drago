import {ReducersMapObject, combineReducers} from 'redux'
import {handleAction} from 'redux-actions'
import * as Actions from './actions'

/** Structure of common state */
export interface State {
  ssr: boolean
}

const ssr = handleAction(Actions.enableBrowser, () => false, true)

/**
 * Create a reducer creator for potential additional reducer key/value pairs
 * @param reducers Reducers map
 * @return Reducer creator
 */
export function createReducerCreator<S extends State>(
  reducers: ReducersMapObject,
) {
  return function createReducer(extraReducers: ReducersMapObject = {}) {
    return combineReducers<S>({
      ssr,
      ...reducers,
      ...extraReducers,
    })
  }
}
