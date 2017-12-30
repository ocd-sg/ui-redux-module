// @flow
import Config from '../../../config'
import type { Posts } from '../../../types'

export const validatePostsRequest = () => true

export const composePostsRequest = (subreddit: string): Object => {
  return {
    url: `${Config.api}/r/${subreddit}.json?limit=50`,
    crossDomain: true,
    responseType: 'json',
    method: 'GET'
  }
}

const parsePost = ({ data: { id, author, title, selftext: text } }) => ({
  id,
  author,
  title,
  text
})

export const parsePostsResponse = ({ data: { children } }: Object): Posts =>
  children.map(parsePost)
