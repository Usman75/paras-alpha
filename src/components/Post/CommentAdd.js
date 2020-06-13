import { useRef, useState, useEffect } from 'react'
import Confirm from '../Utils/Confirm'
import RichText from 'components/Input/RichText'
import Scrollbars from 'react-custom-scrollbars'
import { RotateSpinLoader } from 'react-css-loaders'
import near from 'lib/near'
import { useSelector } from 'react-redux'

const MAX_CHAR = 400

const CommentAdd = ({ left, right, post, input }) => {
  const me = useSelector(state => state.me.profile)
  const containerRef = useRef(null)
  const inputRef = useRef(null)
  const [textRaw, setTextRaw] = useState(input || '')
  const [curText, setCurText] = useState(input || '')
  const [lineCount, setLineCount] = useState(0)
  const [err, setErr] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (textRaw.length > MAX_CHAR) {
      setTextRaw(curText)
      setErr(true)
      setTimeout(() => {
        setErr(false)
      }, 500)
    }
    else {
      setCurText(textRaw)
    }
    if (textRaw.length > 0) {
      const lineCount = (textRaw.length / MAX_CHAR) * 100
      setLineCount(lineCount)
    }
    else {
      setLineCount(0)
    }
  }, [textRaw])

  useEffect(() => {
    const onKeydown = e => {
      if (e.key === "Escape") {
        _left()
      }
    }
    document.addEventListener('keydown', onKeydown)

    return () => {
      document.removeEventListener('keydown', onKeydown)
    }
  }, [textRaw])

  const _validateSubmit = () => {
    return textRaw.length > 0
  }

  const _right = async () => {
    setLoading(true)

    try {
      const newComment = await near.contract.createComment({
        postId: post.id,
        body: textRaw
      })

      newComment.user = me
      newComment.post = post
    
      right(newComment)
    } catch (err) {
      alert(err)
    }
    setLoading(false)
  }

  const _left = () => {
    if (textRaw.length > 0) {
      setShowConfirm(true)
    }
    else {
      left()
    }
  }

  const _bgClick = (e) => {
    if (e.target.id === 'new-modal-bg') {
      _left()
    }
  }

  return (
    <div id="new-modal-bg" onClick={e => _bgClick(e)} className="fixed inset-0 z-50 flex items-center" style={{
      backgroundColor: `rgba(0,0,0,0.86)`
    }}>
      <Confirm
        show={showConfirm}
        onClose={_ => setShowConfirm(false)}
        onComplete={_ => {
          setShowConfirm(false)
          left()
        }}
        mainText="Discard current text?"
        leftText="Cancel"
        rightText="Discard"
      />
      <div className="max-w-sm m-auto p-4 w-full">
        <div className="bg-dark-1 w-full rounded-md">
          <div className="flex justify-between items-center w-full h-12 bg-dark-12 px-2 rounded-t-md">
            <div className="w-8 text-white flex items-center">
              <button onClick={_ => _left()}>
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 23.732 8.26801 30 16 30ZM16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="white" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M15.9999 17.6979L10.8484 22.8494L9.15137 21.1523L14.3028 16.0009L9.15137 10.8494L10.8484 9.15234L15.9999 14.3038L21.1514 9.15234L22.8484 10.8494L17.697 16.0009L22.8484 21.1523L21.1514 22.8494L15.9999 17.6979Z" fill="white" />
                </svg>
              </button>
            </div>
            <div className="flex-auto text-white overflow-hidden px-2">Add Comment</div>
            <div className="w-8 text-white flex items-center justify-end">
              {
                loading ? (
                  <RotateSpinLoader style={{
                    marginLeft: `auto`,
                    marginRight: 0
                  }} color="#e13128" size={2.4} />
                ) : (
                    <button disabled={!_validateSubmit()} className="ml-auto" onClick={e => _right(e)}>
                      <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 23.732 8.26801 30 16 30ZM16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="#E13128" />
                        <circle cx="16" cy="16" r="16" fill="#E13128" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M13.7061 19.2929L22.999 10L24.4132 11.4142L13.7061 22.1213L7.99902 16.4142L9.41324 15L13.7061 19.2929Z" fill="white" />
                      </svg>
                    </button>
                  )
              }
            </div>
          </div>
          <div className="h-1 w-full relative bg-dark-6 relative">
            <div className="h-full absolute top-0 left-0 bg-primary-5" style={{
              width: `${lineCount}%`
            }}></div>
          </div>
          <div ref={containerRef} className="w-full relative pb-full">
            <div className="absolute m-auto w-full h-full object-contain">
              <div className={`
                ${err && 'animated shake'}
                flex items-center h-full p-2
              `}>
                <Scrollbars
                  autoHeight={true}
                  autoHeightMax={containerRef && containerRef.current ? (containerRef.current.clientWidth - 16) : 200}
                >
                  <RichText
                    autoFocus
                    inputRef={inputRef}
                    text={textRaw}
                    setText={setTextRaw}
                    initialText={textRaw}
                    placeholder="Write a comment..."
                    className="w-full"
                    suggestionsPortalHost={containerRef.current}
                    style={{
                      suggestions: {
                        maxWidth: containerRef && containerRef.current ? `${containerRef.current.clientWidth}px` : '100%'
                      }
                    }}
                  />
                </Scrollbars>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentAdd