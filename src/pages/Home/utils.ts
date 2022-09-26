import { OrderTypes } from './Home'

export const sortPostsByCreationTime = (order: OrderTypes) => (postA: Post, postB: Post) => {
  const timeA = new Date(postA.created_time).getTime()
  const timeB = new Date(postB.created_time).getTime()

  if (order === 'ASC') return timeA > timeB ? 1 : -1
  return timeA < timeB ? 1 : -1
}

export const filterSendersByName =
  (senderName: string) =>
  (value: [string, number], index: number, array: [string, number][]): value is [string, number] => {
    const [sender] = value

    return senderName ? sender.toLowerCase().includes(senderName) : true
  }

export const filterPostsBySender =
  (sender: string | null) =>
  (post: Post, index: number, array: Post[]): post is Post =>
    post.from_name === sender
export const filterPostsByMessage =
  (search: string) =>
  (post: Post, index: number, array: Post[]): post is Post =>
    search ? post.message.toLowerCase().includes(search) : true
export const filterPostsBySenderAndMessage =
  (sender: string | null, search: string) =>
  (post: Post, index: number, array: Post[]): post is Post =>
    filterPostsBySender(sender)(post, index, array) && filterPostsByMessage(search)(post, index, array)
