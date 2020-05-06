import Link from 'next/link'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { setProfile } from '../actions/me'
import { popPage } from '../actions/ui'

import Post from './post'
import ParseBody from './parseBody'
import { withRedux } from '../lib/redux'
import Pop from './Pop'

const Profile = ({  }) => {
  const [user, setUser] = useState({})
  const [blockList, setBlockList] = useState([])
  const [postList, setPostList] = useState([])
  const me = useSelector(state => state.me.profile)
  const [isFollowing, setIsFollowing] = useState(false)
  const [view, setView] = useState('post')
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    if(Array.isArray(me.following) && me.following.filter(following => following.id === user.id).length > 0) {
      setIsFollowing(true)
    }
  }, [me, user])

  const _toggleFollow = async (me, user) => {
    // cannot follow/unfollow self
    if(me.id === user.id) {
      return
    }
    const newMe = {...me}
    if(Array.isArray(me.following)) {
      const followingIdx = me.following.findIndex(following => following.id === user.id)
      if(followingIdx > -1) {
        const newFollowing = [...me.following]
        newFollowing.splice(followingIdx, 1)
        newMe.following = newFollowing
      }
      else {
        const newFollowing = [...me.following]
        newFollowing.push({
          type: 'user',
          id: user.id
        })
        newMe.following = newFollowing
      }
    }
    else {
      newMe.following = [user.id]
    }
    await axios.put(`http://localhost:3004/users/${me.id}`, newMe)
    setIsFollowing(!isFollowing)
    dispatch(setProfile(newMe))
  }

  const _close = () => {
    // dispatch(popPage())
    // router.back()
  }

  useEffect(() => {
    const getData = async () => {
      const respUser = await axios.get(`http://localhost:3004/users?username=${router.query.username}`)
      const user = respUser.data[0]

      const respBlock = await axios.get(`http://localhost:3004/blocks?userId=${user.id}`)
      const blockList = await Promise.all(respBlock.data.map(block => {
        return new Promise(async (resolve) => {
          const respPost = await axios.get(`http://localhost:3004/posts?blockId=${block.id}&_limit=3&_sort=createdAt&_order=desc`)
          block.postList = respPost.data
          resolve(block)
        })
      }))

      const respPost = await axios.get(`http://localhost:3004/posts?userId=${user.id}`)
      const feedPost = respPost.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      const postList = await Promise.all(feedPost.map(post => {
        return new Promise(async (resolve) => {
          const resUser = await axios.get(`http://localhost:3004/users/${post.userId}`)
          post.user = resUser.data

          if(post.blockId) {
            const resBlock = await axios.get(`http://localhost:3004/blocks/${post.blockId}`)
            if(resBlock.status === 200) {
              post.block = resBlock.data
            }
          }
          resolve(post)
        })
      }))

      setUser(user)
      setBlockList(blockList)
      setPostList(postList)
    }
    if(router && router.query && router.query.username) {
      getData()
    }
  }, [router])

  return (
    <div className="bg-white-1 min-h-screen pb-32">
      <div className="pb-12">
        <div className="fixed bg-white top-0 left-0 right-0 h-12 px-4 z-20">
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute left-0">
              <Pop>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M9.41412 12L16.707 19.2929L15.2928 20.7071L6.58569 12L15.2928 3.29291L16.707 4.70712L9.41412 12Z" fill="#222"/>
                </svg>
              </Pop>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-black-1 tracking-tighter">Profile</h3>
            </div>
            <div className="absolute right-0">
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="bg-white py-6 px-4 text-center">
          <img className="m-auto w-20 h-20 rounded-full overflow-hidden object-cover" src={user.avatarUrl} />
          <h4 className="mt-4 text-2xl font-bold">{user.username}</h4>
          <p className="mt-2 text-black-3">
            <ParseBody body={user.bioRaw || user.bio} />
          </p>
          {
            me.id && user.id && me.id !== user.id && (
              <div className="px-4 mt-4">
                {
                  isFollowing ? (
                    <button onClick={e => _toggleFollow(me, user)} className="font-semibold border border-black-1 border-solid px-2 py-1 text-sm rounded-md" style={{
                      minWidth: `6rem`
                    }}>Following</button>
                  ) : (
                    <button onClick={e => _toggleFollow(me, user)} className="font-semibold bg-black-1 text-white px-2 py-1 text-sm rounded-md" style={{
                      minWidth: `6rem`
                    }}>Follow</button>
                  )
                }
              </div>
            )
          }
          {
            me.username === user.username && (
              <div className="px-4 mt-4">
                <Link href="/me/edit">
                  <button className="font-semibold border border-black-1 border-solid px-2 py-1 text-sm rounded-md" style={{
                    minWidth: `6rem`
                  }}>Edit Profile</button>
                </Link>
              </div>
            )
          }
        </div>
        <div>
          <div className="bg-white flex">
            <div className={`${view !== 'post' && `opacity-25`} w-1/2  border-b border-black-1`}>
              <button onClick={_ => setView('post')} className="w-full font-semibold p-4 focus:outline-none">Post</button>
            </div>
            <div className={`${view !== 'memento' && `opacity-25`} w-1/2  border-b border-black-1`}>
              <button onClick={_ => setView('memento')} className="w-full font-semibold p-4 focus:outline-none">Memento</button>
            </div>
          </div>
          {
            view === 'post' ? (
              <div>
                {
                  postList && postList.map(post => {
                    return (
                      <div className="mt-6 shadow-subtle" key={post.id}>
                        <Post post={post} />
                      </div>
                    )
                  })
                }
              </div>
            ) : (
              <div className="px-4">
                {
                blockList.map(block => {
                  return (
                    <div className="mt-6" key={block.id}>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-2xl font-bold">{block.name}</h4>
                        </div>
                        <div>
                          <Link href="/block/[id]" as={`/block/${block.id}`}>
                            <p className="font-semibold text-black-4 text-sm">View All</p>
                          </Link>
                        </div>
                      </div>
                      <div className="flex mt-1 -ml-2 -mr-2 justify-between">
                        {
                          block.postList.map(post => {
                            return (
                              <Link key={post.id} href="/post/[id]" as={`/post/${post.id}`}>
                                <div className="w-1/3">
                                  <div className="w-full relative pb-full">
                                    <div className="absolute inset-0 px-1">
                                      <div className="w-full h-full shadow-subtle bg-white overflow-hidden rounded-md">
                                        {
                                          post.imgList.length > 0 ? (
                                            <img className="w-full h-full object-cover" src={post.imgList[0].url} />
                                          ) : (
                                            <div className="p-1">
                                              <p className="leading-tight text-xs">{post.body}</p>
                                            </div>
                                          )
                                        }
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            )
                          })
                        }
                        {
                          [...Array(Math.max(0, Math.abs(3 - block.postList.length))).keys()].map(key => {
                            return (
                              <div key={key} className="w-1/3 p-1 overflow-hidden"></div>
                            )
                          })
                        }
                      </div>
                    </div>
                  )
                })
              }
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default withRedux(Profile)