import Explore from "components/Explore"
import { useState, useEffect } from "react"
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux"
import { addExplorePost } from "actions/explore"

const ExploreScreen = () => {
  const explorePost = useSelector(state => state.explore.postList)
  const dispatch = useDispatch()
  const [post, setPost] = useState({})
  
  const getPost = async () => {
    const response = await axios.get(`http://localhost:9090/explore`)
    const p = response.data.data[0]

    dispatch(addExplorePost(p))
    setPost(p)
  }

  useEffect(() => {
    if (!post.id) {
      if (explorePost.length > 0) {
        setPost(explorePost[explorePost.length - 1])
      }
      else {
        getPost()
      }
    }
  }, [])

  return (
    <Explore post={post} getPost={getPost} />
  )
}

export default ExploreScreen