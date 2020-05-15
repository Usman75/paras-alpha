import React, { useEffect, useState } from 'react'
import HubPage from '../../components/Hub'
import NavMobile from '../../components/NavMobile'
import Layout from '../../components/Layout'

import axios from 'axios'
import { withRedux } from '../../lib/redux'
import { useSelector, useDispatch } from 'react-redux'
import { addData } from '../../actions/me'

const HomePage = () => {
  const profile = useSelector(state => state.me.profile)
  const list = useSelector(state => state.me.data['/hub/recent'])
  const dispatch = useDispatch()
  
  useEffect(() => {
    const getData = async () => {
      // const meRes = await axios.get(`https://internal-db.dev.paras.id/users/${profile.id}`)
      
      const userListRes = await axios.get(`https://internal-db.dev.paras.id/users`)
      const blockListRes = await axios.get(`https://internal-db.dev.paras.id/blocks`)

      const userList = userListRes.data.filter(user => user.id !== profile.id).map(user => {
        user.type = 'user'
        return user
      })
      const blockList = blockListRes.data.filter(block => block.userId !== profile.id).map(block => {
        block.type = 'block'
        return block
      })
      const list = userList.concat(blockList)
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

      // setList(list)
      dispatch(addData('/hub/recent', list))
      // setMe(meRes.data)
    }
    if(!list && profile.id) {
      getData()
    }
  }, [profile])

  return (
    <Layout>
      <HubPage me={profile} list={list} page={'recent'} />
      <div className="fixed bottom-0 right-0 left-0 z-20">
        <NavMobile />
      </div>
    </Layout>
  )
}

export default withRedux(HomePage)