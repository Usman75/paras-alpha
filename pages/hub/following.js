import React, { useEffect, useState } from 'react'
import HubPage from '../../components/hubPage'
import NavMobile from '../../components/navMobile'
import Layout from '../../components/layout'

import axios from 'axios'
import { withRedux } from '../../lib/redux'
import { useSelector } from 'react-redux'

const HomePage = () => {
  const [me, setMe] = useState({})
  const [list, setList] = useState([])
  const profile = useSelector(state => state.me.profile)
  
  useEffect(() => {
    const getData = async () => {
      const userRes = await axios.get(`http://localhost:3004/users/${profile.id}`)
      const user = userRes.data
      if(Array.isArray(user.following)) {
        const following = await Promise.all(user.following.map(following => {
          return new Promise(async (resolve) => {
            if(following.type === 'user') {
              const resUser = await axios.get(`http://localhost:3004/users/${following.id}`)
              return resolve({
                ...resUser.data,
                ...{ type: 'user' }
              })
            }
            else {
              const resUser = await axios.get(`http://localhost:3004/blocks/${following.id}`)
              return resolve({
                ...resUser.data,
                ...{ type: 'block' }
              })
            }
          })
        }))
        setList(following)
      }
      setMe(user)
    }
    if(profile.id) {
      getData()
    }
  }, [profile])

  return (
    <Layout>
      <HubPage me={me} setMe={setMe} list={list} setList={setList} page={'following'} />
      <div className="fixed bottom-0 right-0 left-0 z-20">
        <NavMobile />
      </div>
    </Layout>
  )
}

export default withRedux(HomePage)