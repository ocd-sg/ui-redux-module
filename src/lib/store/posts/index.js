// @flow
import { Observable } from 'rxjs'
import { ajax } from 'rxjs/observable/dom/ajax'
import {
  validatePostsRequest,
  composePostsRequest,
  parsePostsResponse
} from './utils'
import type {
  Subreddit,
  Posts
} from '../../types'

import * as status from '../status'

const mountPoint = 'posts'

const { ADD_BUSY, REMOVE_BUSY, SET_ERROR } = status.constants
const SET_SUBREDDIT = `editor/${mountPoint}/SET_SUBREDDIT`
const FETCH_POSTS = `editor/${mountPoint}/FETCH_POSTS`
const LOADED_POSTS = `editor/${mountPoint}/LOADED_POSTS`

const MINUTE_IN_MILLISECONDS = 60 * 1000

export type State = {
  subreddit: Subreddit,
  posts: Posts
}

type Action = Object

export const initialState: State = {
  subreddit: 'singapore',
  posts: []
}

// reducers
const setSubredditReducer = (state: State, action: Action): State => ({
  ...state,
  subreddit: action.subreddit
})

const loadedPostsReducer = (state: State, action: Action): State => ({
  ...state,
  posts: action.posts
})

const reducer = (state: State = initialState, action: Action = {type: null}): State => {
  switch (action.type) {
    case SET_SUBREDDIT: return setSubredditReducer(state, action)
    case LOADED_POSTS: return loadedPostsReducer(state, action)
    default: return state
  }
}

// actions
const setSubreddit = (subreddit: string): Action => ({ type: SET_SUBREDDIT, subreddit })

// epics
const fetchPosts = (action$: Object, state: Object) =>
  action$
    .ofType(FETCH_POSTS)
    .map(() => state.getState())
    .map(getSubreddit)
    .filter(validatePostsRequest)
    .map(composePostsRequest)
    .switchMap((request) =>
      ajax({
        ...request,
        timeout: MINUTE_IN_MILLISECONDS
      })
        .takeUntil(action$.ofType(FETCH_POSTS))
        .catch(({ message, status }) =>
          Observable.of({
            type: SET_ERROR,
            error: `Status ${status}: ${message}`
          })
        )
        .map(({ response }) => response)
        .map(parsePostsResponse)
        .map((posts) => ({ type: LOADED_POSTS, posts }))
    )

const listenFetch = (action$: Object, state: Object) =>
  action$
    .ofType(FETCH_POSTS)
    .mapTo({
      type: ADD_BUSY,
      payload: {
        value: 'posts',
        label: 'Posts'
      }
    })

const listenLoaded = (action$: Object, state: Object) =>
  action$
    .ofType(LOADED_POSTS)
    .mapTo({
      type: REMOVE_BUSY,
      payload: {
        value: 'posts'
      }
    })

// selectors
const getSubreddit = (store: Object): string => store[mountPoint].subreddit
const getPosts = (store: Object): Posts => store[mountPoint].posts

// exposed
export { mountPoint }

export const constants = {
  SET_SUBREDDIT,
  FETCH_POSTS,
  LOADED_POSTS
}

export const actions = {
  setSubreddit
}

export const epics = {
  fetchPosts,
  listenFetch,
  listenLoaded
}

export const selectors = {
  getSubreddit,
  getPosts
}

export { reducer }

export const reducers = {
  setSubredditReducer,
  loadedPostsReducer
}
