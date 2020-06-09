import List from "components/Utils/List"
import { useState } from "react"
import { useDispatch, batch } from "react-redux"
import Notify from "components/Utils/Notify"
import Confirm from "components/Utils/Confirm"
import { setLoading } from "actions/ui"
import near from "lib/near"

const ModalPost = ({ showModal, setShowModal, me, meMementoList, post }) => {
  const dispatch = useDispatch()
  const [showNotifyCopyLink, setShowNotifyCopyLink] = useState(false)
  const [showConfirmForget, setShowConfirmForget] = useState(false)

  const _deletePost = async () => {
    dispatch(setLoading(true, 'Forgetting memory...'))
    await near.contract.deletePost({
      id: post.id
    })

    batch(() => {
      dispatch(deletePost(id))
      dispatch(setLoading(false))
    })
    setShowConfirmForget(false)
  }

  const _forget = () => {
    setShowModal(false)
    setShowConfirmForget(true)
  }

  const _copyLink = (e) => {
    var copyText = document.getElementById(`urlLink_${post.id}`)
    copyText.select()
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy")
    setShowNotifyCopyLink(true)
    setShowModal(false)
    setTimeout(() => {
      setShowNotifyCopyLink(false)
    }, 1000)
  }

  return (
    <div>
      <Notify show={showNotifyCopyLink}>
        <p className="text-white p-2">Link copied!</p>
      </Notify>
      <Confirm 
        show={showConfirmForget}
        onClose={_ => setShowConfirmForget(false)}
        onComplete={_ => _deletePost()}
        leftText="Cancel"
        rightText="Forget"
        mainText="Forget this memory?"
      />
      <List show={showModal} onClose={_ => setShowModal(false)}>
        <div className="opacity-0 absolute" style={{
          zIndex: `-1`
        }}>
          <input readOnly type="text" value={`${window.location.origin}/post/${post.id}`} id={`urlLink_${post.id}`} />
        </div>
        <div>
          <div>
            <button className="w-full text-left" onClick={_ => _copyLink()}>
              <h4 className="p-4 text-white font-bold">Copy Link</h4>
            </button>
            {
              (me && me.username == post.user.username || meMementoList.findIndex(memento => memento.id === post.mementoId) > -1) && (
                <button className="w-full text-left" onClick={_ => _forget()}>
                  <h4 className="p-4 text-white font-bold">Forget</h4>
                </button>
              )
            }
          </div>
          {/* {
          view === 'default' && (
            <div>
              <button className="w-full p-4 font-medium text-left" onClick={_ => _copyLink()}>Copy Link</button>
              {
                (me && me.username == post.user.username || meMementoList.findIndex(memento => memento.id === post.mementoId) > -1) && (
                  <button className="w-full p-4  font-medium text-left" onClick={_ => setView('confirmDelete')}>Forget</button>
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
                <button className="p-4 text-red-600 font-medium text-left" onClick={_ => _delete(post.id)}>Forget</button>
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
        } */}
        </div>
      </List>
    </div>
  )
}

export default ModalPost