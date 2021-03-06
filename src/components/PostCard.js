import { Carousel } from 'react-responsive-carousel'
import ParseBody from './parseBody'
import { useSelector, useDispatch, batch } from 'react-redux'
import { withRedux } from '../lib/redux'
import TimeAgo from 'javascript-time-ago'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
 
import en from 'javascript-time-ago/locale/en'
import Push from './Push'
import { useState, useRef, useEffect } from 'react'
import PopForward from './PopForward'
import { deletePost } from '../actions/me'
import PostCardLoader from './PostCardLoader'
import Image from './Image'
import near from '../lib/near'
import { setLoading } from '../actions/ui'

TimeAgo.addLocale(en)

const timeAgo = new TimeAgo('en-US')

const ModalPost = ({ me, meMementoList, post, close }) => {
  const dispatch = useDispatch()
  const pageList = useSelector(state => state.ui.pageList)
  const [view, setView] = useState('default')
  const backBtnRef = useRef()

  const _close = (e) => {
    if(!e) {
      setView('default')
      close()
    }
    else if(e.target.id === 'modal-bg') {
      setView('default')
      close()
    }
  }

  const _delete = async (id) => {
    dispatch(setLoading(true, 'Forgetting memory...'))
    await near.contract.deletePostById({
      id: id
    })

    if(pageList.length > 0) {
      backBtnRef.current.click()
    }

    batch(() => {
      dispatch(deletePost(id))
      dispatch(setLoading(false))
    })
    _close()
  }

  const _copyLink = (e) => {
    var copyText = document.getElementById(`urlLink_${post.id}`)
    copyText.select()
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy")
    setView('confirmCopyLink')
    setTimeout(() => {
      _close()
    }, 1000)
  }

  return (
    <div id="modal-bg" onClick={(e) => _close(e)} className="fixed inset-0 w-full h-full z-40 p-8 pt-40" style={{
      backgroundColor: `rgba(0,0,0,0.5)`
    }}>
      <div className="invisible">
        <PopForward ref={backBtnRef}></PopForward>
      </div>
      <div className="max-w-sm m-auto bg-white shadow-lg rounded-lg">
        {
          view === 'default' && (
            <div>
            <button className="w-full p-4 font-medium text-left" onClick={_ => _copyLink()}>Copy Link</button>
            {
              (me && me.username == post.user.username || meMementoList.findIndex(memento => memento.id === post.mementoId) > -1) && (
                <button className="w-full p-4  font-medium text-left"  onClick={_ => setView('confirmDelete')}>Forget</button>
              )
            }
          </div>
          )
        }
        {
          view === 'confirmDelete' && (
            <div>
              <p className="p-4">Do you want to forget this memory?</p>
              <div className="flex justify-end">
                <button className="p-4 font-medium text-left" onClick={_ => setView('default')}>Cancel</button>
                <button className="p-4 text-red-600 font-medium text-left"  onClick={_ => _delete(post.id)}>Forget</button>
              </div>
            </div>
          )
        }
        {
          view === 'confirmCopyLink' && (
            <div>
              <p className="p-4">Link copied!</p>
            </div>
          )
        }
        <div className="opacity-0 absolute">
          <input readOnly type="text" value={`${window.location.origin}/post/${post.id}`} id={`urlLink_${post.id}`} />
        </div>
      </div>
    </div>
  )
}

const Post = ({ post }) => {
  const me = useSelector(state => state.me.profile)
  const meMementoList = useSelector(state => state.me.blockList)
  const pageList = useSelector(state => state.ui.pageList)
  const deletedPostList = useSelector(state => state.me.deletedPostList)

  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if(showModal) {
      disableBodyScroll(document.querySelector('#modal-bg'))
    }
    else {
      enableBodyScroll(document.querySelector('#modal-bg'))
    }
  }, [showModal])
  
  const _isDeleted = () => {
    if(deletedPostList.findIndex(id => id === post.id) > -1) {
      return true
    }
    return false
  }

  if(!post.id) {
    return (
      <div className="bg-white p-4">
        <PostCardLoader />
      </div>
    )
  }
  else {
    return (
      !_isDeleted() && (
        <div className="bg-white">
          <div className={`${showModal ? 'visible' : 'invisible'}`}>
            <ModalPost me={me} meMementoList={meMementoList} post={post} pageList={pageList} close={() => setShowModal(false)} />
          </div>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image className="object-cover w-full h-full" data={post.user.imgAvatar} />
              </div>
              <div className="px-4">
                <Push href="/[username]" as={ `/${post.user.username}` } query={{username: post.user.username}} props={{
                  username: post.user.username,
                  user: post.user
                }}>
                  <a className="font-semibold text-black-1">{ post.user.username }</a>
                </Push>
                {
                  post.memento && (
                    <p>in&nbsp;
                      <Push href="/m/[id]" as={ `/m/${post.mementoId}`} props={{
                        id: post.mementoId
                      }}>
                        <a className="font-semibold text-black-1">{ post.memento.name }</a>
                      </Push>
                    </p> 
                  )
                }
              </div>
            </div>
            <div>
              <svg onClick={_ => setShowModal(true)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M5 14C3.89543 14 3 13.1046 3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14ZM12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14ZM17 12C17 13.1046 17.8954 14 19 14C20.1046 14 21 13.1046 21 12C21 10.8954 20.1046 10 19 10C17.8954 10 17 10.8954 17 12Z" fill="black"/>
              </svg>
            </div>
          </div>
          <Push href="/post/[id]" as={ `/post/${post.id}` } props={{
            post: post
          }} query={{id: post.id}}>
            <div>
              {
                post.imgList.length > 0 && post.imgList.length === 1 ? (
                  <div className="w-full relative pb-3/4 bg-white">
                    <Image className="absolute m-auto w-full h-full object-contain" style={{
                      display: 'block'
                    }} data={post.imgList[0]} />
                  </div>
                ) : (
                  <Carousel showArrows={false} showThumbs={false} showStatus={false} emulateTouch={true}>
                  {
                    post.imgList.map((img, idx) => {
                      return (
                        <div className="w-full relative pb-3/4 bg-white" key={idx}>
                          <Image className="absolute m-auto w-full h-full object-contain" style={{
                            display: 'block'
                          }} data={img} />
                        </div>
                      )
                    })
                  }
                  </Carousel>
                )
              }
              {
                post.bodyRaw && post.imgList.length > 0 && post.bodyRaw.length > 0 && (
                  <div className="pb-4"></div>
                )
              }
              <div className="px-4">
                <p className="text-black-3 whitespace-pre-line">
                  <ParseBody body={post.bodyRaw || ''} />
                </p>
              </div>
            </div>
          </Push>
          <div className="flex justify-between px-4 py-4">
            <p className="text-sm font-normal text-black-4">{ timeAgo.format(new Date(post.createdAt/(10**6))) }</p>
            <p className="text-sm font-normal text-black-4">
              {
                post.originalId && post.id !== post.originalId && (
                  <Push href="/post/[id]" as={`/post/${post.originalId}`} props={{
                    id: post.originalId
                  }}>
                    <a>original post</a>
                  </Push>
                )
              }
            </p>
          </div>
        </div>
      )
    )
  }
}

export default withRedux(Post)