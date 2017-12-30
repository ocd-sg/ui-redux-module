// @flow
import 'rxjs'
import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'

import * as core from './core'
import * as status from './status'
import * as posts from './posts'

// logger epic
const logger = (action$: Object, state: Object) =>
  action$
    .do((action) => console.log(action, state.getState()))
    .ignoreElements()

// connected epics
const fetchInitialPosts = (action$: Object, state: Object) =>
  action$
    .filter(({ type }) => [core.constants.SET_INITIAL_STATE, posts.constants.SET_SUBREDDIT].includes(type))
    .mapTo({type: posts.constants.FETCH_POSTS})

const epics = combineEpics(
  ...[
    core.epics,
    status.epics,
    posts.epics
  ].reduce((memo, epics) => [ ...memo, ...Object.values(epics) ], []),
  logger,
  fetchInitialPosts
)

const reducer = combineReducers({
  [core.mountPoint]: core.reducer,
  [status.mountPoint]: status.reducer,
  [posts.mountPoint]: posts.reducer
})

const actions = {
  [core.mountPoint]: core.actions,
  [status.mountPoint]: status.actions,
  [posts.mountPoint]: posts.actions
}

const selectors = {
  [core.mountPoint]: core.selectors,
  [status.mountPoint]: status.selectors,
  [posts.mountPoint]: posts.selectors
}

export { actions, selectors, epics, reducer }
