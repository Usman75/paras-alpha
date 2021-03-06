import { useState, useRef, useEffect } from "react"
import { Mention, MentionsInput } from "react-mentions"
import { useDispatch, batch } from "react-redux"
import { withRedux } from "../lib/redux"
import { setProfile } from "../actions/me"
import ImageCrop from "./imageCrop"
import { toggleImageCrop, setLoading } from "../actions/ui"
import { readFileAsUrl } from "../lib/utils"
import PopForward from "./PopForward"
import ipfs from "../lib/ipfs"
import near from "../lib/near"
import Image from "./Image"

const ProfileEdit = ({ me }) => {
  const bodyRef = useRef(null)
  const backRef = useRef(null)

  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [bioRaw, setBioRaw] = useState('')
  const [imgAvatar, setImgAvatar] = useState({})
  const [newImgUrl, setNewImgUrl] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    if(me.id) {
      setUsername(me.username)
      setBioRaw(me.bioRaw)
      setImgAvatar(me.imgAvatar)
    }
  }, [me])

  useEffect(() => {
    if(bodyRef.current) {
      setBio(bodyRef.current.value)
    }
  }, [bioRaw])

  const _changeImg = async (files) => {
    if(files.length > 0) {
      const imgUrl = await readFileAsUrl(files[0])
			setNewImgUrl(imgUrl)
      dispatch(toggleImageCrop(true))
		}
  }

  const _submit = async (e) => {
    e.preventDefault()

    try {
      dispatch(setLoading(true, 'Updating user profile...'))
      let newImgAvatar = me.imgAvatar

      if(me.imgAvatar.url !== imgAvatar.url) {
        const imgBuf = Buffer.from(imgAvatar.url.split(',')[1], 'base64')

        for await (const file of ipfs.client.add(imgBuf)) {
          newImgAvatar = {
            url: file.path,
            type: 'ipfs'
          }
        }
      }
      const newData = {
        id: me.id,
        imgAvatar: newImgAvatar,
        bio: bio,
        bioRaw: bioRaw
      }
      const newProfile = await near.contract.updateUserById(newData)
      batch(() => {
        dispatch(setProfile(newProfile))
        dispatch(setLoading(false))
      })
      backRef.current.click()
    } catch (err) {
      console.log(err)
    }
  }

  const _getUsers = async (query, callback) => {
    if (!query) return
    const q = [`username_like:=${query}`]
    const userList = await near.contract.getUserList({
      query: q,
      opts: {
        _embed: true,
        _sort: 'createdAt',
        _order: 'desc',
        _limit: 10
      }
    })
    const list = userList.map(user => ({ 
      display: `@${user.username}`, 
      id: user.id,
      imgAvatar: user.imgAvatar,
      username: user.username
    }))
    callback(list)
  }

  const _validateSubmit = () => {
    if(bio.length <= 150) {
      return true
    }
    return false
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="pb-12">
        <div className="fixed bg-white top-0 left-0 right-0 h-12 px-4 z-20">
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute left-0">
              <PopForward ref={backRef}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M9.41412 12L16.707 19.2929L15.2928 20.7071L6.58569 12L15.2928 3.29291L16.707 4.70712L9.41412 12Z" fill="#222"/>
                </svg>
              </PopForward>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-black-1 tracking-tighter">Edit Profile</h3>
            </div>
            <div className="absolute right-0">
              <button disabled={!_validateSubmit()} onClick={e => _submit(e)} className="text-2xl font-bold text-black-1 tracking-tighter">Save</button>
            </div>
          </div>
        </div>
      </div>
      <div className="py-6">
        <div className="px-4">
          <div className="m-auto relative w-20 h-20 rounded-full overflow-hidden">
            <input className="absolute cursor-pointer inset-0 opacity-0 w-full z-10" type="file" accept="image/*" onClick={(e) => e.target.value = null}  onChange={(e) => _changeImg(e.target.files)} />
            <div className="absolute inset-0 flex items-center opacity-75 bg-black-1">
              <svg className="m-auto" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M6.93702 5.84538C7.00787 5.74688 7.08656 5.62631 7.18689 5.46372C7.22356 5.40431 7.32355 5.23934 7.39799 5.11653L7.4818 4.97841C8.31079 3.62239 8.91339 3 10 3H15V5H10C9.91327 5 9.6405 5.28172 9.1882 6.02159L9.11542 6.14154L9.11524 6.14183C9.04019 6.26566 8.93096 6.44589 8.88887 6.51409C8.76592 6.71332 8.66375 6.86988 8.56061 7.01326C8.11237 7.63641 7.66434 8 7 8H4C3.44772 8 3 8.44772 3 9V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18V12H23V18C23 19.6569 21.6569 21 20 21H4C2.34315 21 1 19.6569 1 18V9C1 7.34315 2.34315 6 4 6H6.8162C6.84949 5.96194 6.8903 5.91033 6.93702 5.84538ZM17 8V6H19V4H21V6H23V8H21V10H19V8H17ZM12 18C9.23858 18 7 15.7614 7 13C7 10.2386 9.23858 8 12 8C14.7614 8 17 10.2386 17 13C17 15.7614 14.7614 18 12 18ZM12 16C13.6569 16 15 14.6569 15 13C15 11.3431 13.6569 10 12 10C10.3431 10 9 11.3431 9 13C9 14.6569 10.3431 16 12 16Z" fill="white"/>
              </svg>
            </div>
            <Image onClick={_ => _changeImg()} className="w-full h-full object-cover" data={imgAvatar} />
          </div>
          {/* <div className="mt-4">
            <label>Username</label>
            <input className="w-full transition-all duration-300 text-black-3 leading-normal outline-none border border-black-6 focus:border-black-4 p-2 rounded-md" type="text" value={username} onChange={e => setUsername(e.target.value)} />
          </div> */}
          <div className="mt-4">
            <div className="flex justify-between">
              <label className="block text-sm pb-1 font-semibold text-black-2">Bio</label>
              <p className={`${bio.length > 150 ? 'text-red-600 font-bold' : 'text-black-5'} text-sm`}>{bio.length}/150</p>
            </div>
            <MentionsInput className="w-full transition-all duration-300 text-black-3 leading-normal outline-none border border-black-6 focus:border-black-4 rounded-md"
              style={{
                control: {
                  fontSize: `16px`,
                  fontWeight: `500`,
                  color: '#616161'
                },
                input: {
                  margin: 0,
                  padding: `.5rem`,
                  overflow: `auto`,
                  height: `5.5rem`,
                },
                suggestions: {
                  marginTop: `32px`,
                  maxHeight: `32rem`,
                  overflowY: 'auto',
                  width: `100vw`,
                  maxWidth: `100%`,
                  boxShadow: `0px 0px 4px rgba(0, 0, 0, 0.15)`
                },
              }}
              placeholder="Tell us about yourself" 
              onChange={e => setBioRaw(e.target.value)} 
              value={bioRaw}
              allowSuggestionsAboveCursor={true}
              inputRef={bodyRef}
            >
              <Mention
                trigger='@'
                data={_getUsers}
                appendSpaceOnAdd={true}
                style={{
                  color: '#1B1B1B'
                }}
                renderSuggestion={(entry) => {
                  return (
                    <div className='flex items-center justify-between px-4 py-2 bg-white h-16'>
                      <div className="w-8/12 flex items-center overflow-hidden">
                        <div>
                          <div className="w-8 h-8 rounded-full overflow-hidden">
                            <Image style={{
                              boxShadow: `0 0 4px 0px rgba(0, 0, 0, 0.75) inset`
                            }} className="object-cover w-full h-full" data={entry.imgAvatar} />
                          </div>
                        </div>
                        <div className="px-4 w-auto">
                          <p className="font-semibold text-black-1 truncate whitespace-no-wrap">{ entry.username }</p>
                        </div>
                      </div>
                    </div>
                  )
                }}
              />
            </MentionsInput>
          </div>
        </div>
      </div>
      <ImageCrop imgUrl={newImgUrl} cb={(url) => setImgAvatar({
        url: url,
        type: 'http'
      })} />
    </div>
  )
}

export default withRedux(ProfileEdit)