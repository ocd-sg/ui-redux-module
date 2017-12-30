// @flow
import React from 'react'

import Module, { label } from '../lib'
import 'ui-tachyons-light'

const styles = {
  application: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    userSelect: 'none',
    cursor: 'default'
  }
}

document.title = label

const Application = () => (
  <div className='absolute bg-background-100 sans-serif text-normal-100 overflow-hidden lh-solid' style={styles.application}>
    <Module />
  </div>
)

export default Application
