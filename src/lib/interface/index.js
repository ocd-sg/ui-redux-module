// @flow
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { actions, reducer, epics } from 'app/store'

import _Module from './Module'

const middleware = createEpicMiddleware(epics)
const store = createStore(reducer, applyMiddleware(middleware))

class Module extends Component {
  store: Object = {}

  constructor (props: Object) {
    super(props)
    this.store = store
  }

  getChildContext () {
    return { storeSubscription: null }
  }

  componentDidMount () {
    this.store.dispatch(actions.core.requestInitialState())
  }

  render () {
    return (
      <Provider store={this.store}>
        <_Module />
      </Provider>
    )
  }
}

Module.childContextTypes = {
  storeSubscription: PropTypes.any
}

export default Module
