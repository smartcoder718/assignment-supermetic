import Box from 'components/Box'
import Message from 'components/Message'
import User from 'components/User'
import { useAuthContext } from 'hooks'
import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { filterPostsBySenderAndMessage, filterSendersByName, sortPostsByCreationTime } from './utils'

export interface PostList {
  page: number
  posts: Post[]
}

interface HTTPResponseError {
  message: string
}
interface HTTPResponseBody extends APIResponseBody<PostList, HTTPResponseError> {}

export type AscendOrderType = 'ASC'
export type DescendOrderType = 'DESC'
export type OrderTypes = AscendOrderType | DescendOrderType

export interface HomeProps {}

const API_POSTS_URI = 'https://api.supermetrics.com/assignment/posts'
const SEARCH_PARAM_FROM = 'from'

export const Home: React.VFC<HomeProps> = (props) => {
  const navigate = useNavigate()
  const { user, clearUser } = useAuthContext()
  const [searchParams, setSearchParams] = useSearchParams()
  const [postList, setPostList] = React.useState<PostList>({ page: 0, posts: [] })
  const [senderFilter, setSenderFilter] = React.useState('')
  const [messageFilter, setMessageFilter] = React.useState('')
  const [currentIndex, setCurrentIndex] =React.useState(0)
  const [currentSort, setCurrentSort] = React.useState('DESC')

  const sendersWithCount = React.useMemo(
    () =>
      Array.from(
        postList.posts.reduce<Map<string, number>>((prev, current) => {
          return prev.set(current.from_name, (prev.get(current.from_name) || 0) + 1)
        }, new Map<string, number>())
      ).sort(([nameA], [nameB]) => nameA.localeCompare(nameB)),
    [postList.posts]
  )

  React.useEffect(() => {
    let active = true

    const fetchPosts = () => {
      const url = `${API_POSTS_URI}?sl_token=${user?.sl_token}`
      return fetch<HTTPResponseBody>(url, {
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
      })
    };
    (async () => {
      if (active) {
        const response = await fetchPosts()
        const body = await response.json()

        if (response.ok && body.data) {
          setPostList(body.data)
            let defaultItem =Array.from(
              body.data.posts.reduce<Map<string, number>>((prev, current) => {
                return prev.set(current.from_name, (prev.get(current.from_name) || 0) + 1)
              }, new Map<string, number>())
            ).sort(([nameA], [nameB]) => nameA.localeCompare(nameB))[0]
              setSearchParams({ [SEARCH_PARAM_FROM]: defaultItem[0] });
        } else if (body.error?.message === 'Invalid SL Token') {
          clearUser()
          navigate('/login')
        }
      }
    })()

    return () => {
      active = false
    }
  }, [navigate, setPostList, clearUser, user?.sl_token])

  const handleSort = (order: OrderTypes) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setCurrentSort(order)
    setPostList({ page: postList.page, posts: postList.posts.sort(sortPostsByCreationTime(order)) })
  }

  return (
    <div className='Application_Box homepage' >
      <aside style={{ flex: '0.3', margin: '0px 8px 8px 0' }}>
        <Box>
        <input
          placeholder='user search'
          aria-label='search senders'
          name='search-name'
          style={{width:'100%'}}
          type='text'
          onChange={(event) =>{ setSenderFilter(event.target.value ?? '');setCurrentIndex(-1)}}
        />
        </Box>
        <div style={{marginTop:'10px'}}>
          {sendersWithCount.filter(filterSendersByName(senderFilter)).map(([sender, count], index) => {
            return (
              <User
                key={index}
                onClick={() =>{ 
                  setSearchParams({ [SEARCH_PARAM_FROM]: sender });
                  setCurrentIndex(index)
                }}
                sender={sender}
                postCount={count}
                incommingclassName = {currentIndex == index ?'seleted-item':'user-item'}

              />
            )
          })}
        </div>
      </aside>
      <section style={{ flex: '1' }}>
        <Box>
          <button  className={currentSort=='DESC' ? 'selectedBtn':''} onClick={handleSort('DESC')}>⬇</button>
          <button className={currentSort=='ASC' ? 'selectedBtn':''} onClick={handleSort('ASC')}>⬆</button>
          
          <div style={{ flexGrow: 1 }} />
          <input
            placeholder='content search'
            aria-label='search posts from senders'
            type='text'
            onChange={(event) => setMessageFilter(event.target.value ?? '')}
          />
        </Box>
        <Box style={{marginTop:'10px'}}>
          {postList.posts
            .filter(filterPostsBySenderAndMessage(searchParams.get(SEARCH_PARAM_FROM), messageFilter))
            .map((post, index) => {
              return <Message key={index} post={post} />
            })}

        </Box>
      </section>
    </div>
  )
}

export default Home
