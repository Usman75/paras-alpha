import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/layout'
import NavMobile from '../components/navMobile'
import Profile from '../components/profile'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { withRedux } from '../lib/redux'

const UserPage = () => {
  const profile = useSelector(state => state.me.profile)

  const [user, setUser] = useState({})
  const [me, setMe] = useState({})
  const [blockList, setBlockList] = useState([])
  const router = useRouter()

  useEffect(() => {
    const getMe = async () => {
      const userRes = await axios.get(`http://localhost:3004/users/${profile.id}`)
      const user = userRes.data
      setMe(user)
    }
    if(profile.id) {
      getMe()
    }
  }, [profile])

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

      setUser(user)
      setBlockList(blockList)
    }
    if(router && router.query && router.query.username) {
      getData()
    }
  }, [router])

  return (
    <Layout>
      <div className="bg-white-1">
        <Profile me={me} user={user} blockList={blockList} />
      </div>
      <div className="fixed bottom-0 right-0 left-0 z-20">
        <NavMobile />
      </div>
    </Layout>
  )
}

export default withRedux(UserPage)