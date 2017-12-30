// @flow
export type Subreddit = string

export type Post = {
  id: string,
  author: string,
  title: string,
  text: string
}
export type Posts = Array<Post>
