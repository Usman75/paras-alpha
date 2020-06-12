import Following from 'components/Profile/Following'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import axios from 'axios'

const FollowingScreen = () => {
  const me = useSelector(state => state.me.profile)
  const [followingList, setFollowingList] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)

  const getFollowingList = async () => {
    try {
      const ITEM_COUNT = 5
      const response = await axios.get(`http://localhost:9090/follow?_skip=${page * ITEM_COUNT}&_limit=${ITEM_COUNT}`)
      const list = response.data.data || []

      const newList = [...followingList].concat(list)
      setFollowingList(newList)
      setPage(page + 1)
      if (list.length === 0 || list.length < ITEM_COUNT) {
        setHasMore(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (me.id) {
      getFollowingList(0)
    }
  }, [me])

  return (
    <Following followingList={followingList} hasMore={hasMore} getFollowingList={getFollowingList} />
  )
}

export default FollowingScreen