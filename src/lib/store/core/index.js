// @flow
const mountPoint = 'core'

const REQUEST_INITIAL_STATE = `editor/${mountPoint}/REQUEST_INITIAL_STATE`
const SET_INITIAL_STATE = `editor/${mountPoint}/SET_INITIAL_STATE`

export type State = {}

type Action = Object

export const initialState: State = {}

// reducers
const setInitialStateReducer = (state: State, action: Action): State => ({
  ...state,
  ...action.initialState
})

const reducer = (state: State = initialState, action: Action = {type: null}): State => {
  switch (action.type) {
    case SET_INITIAL_STATE: return setInitialStateReducer(state, action)
    default: return state
  }
}

// actions
const requestInitialState = () => ({ type: REQUEST_INITIAL_STATE })

// epics
const fetchInitialState = (action$: Object) =>
  action$
    .ofType(REQUEST_INITIAL_STATE)
    .mapTo({
      type: SET_INITIAL_STATE,
      initialState: {}
    })

// selectors

// exposed
export { mountPoint }

export const constants = {
  REQUEST_INITIAL_STATE,
  SET_INITIAL_STATE
}

export const actions = {
  requestInitialState
}

export const epics = {
  fetchInitialState
}

export const selectors = {}

export { reducer }
