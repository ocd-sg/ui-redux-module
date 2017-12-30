// @flow
const mountPoint = 'status'

const SET_ERROR = `editor/${mountPoint}/SET_ERROR`
const ADD_BUSY = `editor/${mountPoint}/ADD_BUSY`
const REMOVE_BUSY = `editor/${mountPoint}/REMOVE_BUSY`

type Error = {
  type: string,
  error: string
}

type Busy = {
  value: string,
  label: string
}

export type State = {
  +busyStack: Array<Busy>,
  +error: ?Error
}

type Action = Object

const initialState: State = {
  busyStack: [],
  error: null
}

// reducers
const setErrorReducer = (state: State, action: Action): State => ({
  ...state,
  error: action.error
})

const addBusyReducer = (state: State, action: Action): State => ({
  ...state,
  busyStack: [...state.busyStack, action.payload]
})

const removeBusyReducer = (state: State, action: Action): State => ({
  ...state,
  busyStack: state.busyStack.filter(({ value }) => value !== action.payload.value)
})

const reducer = (state: State = initialState, action: Action = {type: null}): State => {
  switch (action.type) {
    case SET_ERROR: return setErrorReducer(state, action)
    case ADD_BUSY: return addBusyReducer(state, action)
    case REMOVE_BUSY: return removeBusyReducer(state, action)
    default: return state
  }
}

// actions
const setError = (error: Error) => ({ type: SET_ERROR, error })

// epics

// selectors
const getError = (store) => store[mountPoint].error
const getBusyStack = (store: State) => store[mountPoint].busyStack.map(({ label }) => label)

// exposed
export { mountPoint }

export const constants = {
  SET_ERROR,
  ADD_BUSY,
  REMOVE_BUSY
}

export const actions = {
  setError
}

export const epics = {}

export const selectors = {
  getError,
  getBusyStack
}

export { reducer }
