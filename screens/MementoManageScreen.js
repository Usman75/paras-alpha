import { useEffect, useState } from 'react'
import axios from 'axios'
import MementoManage from '../components/MementoManage'

const MementoManageScreen = ({ id }) => {
  const [pendingPostCount, setPendingPostCount] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const respPostList = await axios.get(`https://internal-db.dev.paras.id/posts?blockId=${id}&status=pending&_sort=createdAt&_order=desc`)
      if(respPostList.data.length > 0) {
        if(respPostList.data.length > 9) {
          setPendingPostCount('9+')
        }
        else {
          setPendingPostCount(respPostList.data.length)
        }
      }
    }
    if(id) {
      getData()
    }
  }, [id])

  return (
    <MementoManage id={id} pendingPostCount={pendingPostCount} />
  )
}

export default MementoManageScreen