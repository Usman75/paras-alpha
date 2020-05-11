import { withRedux } from '../lib/redux'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import Index from '../pages/index'
import _username from '../pages/[username]'

import PostScreen from '../screens/PostScreen'
import me_edit from '../pages/me/edit'
import hub_following from '../pages/hub/following'
import hub_recent from '../pages/hub/recent'
import hub_search from '../pages/hub/search'
import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'
import MementoScreen from '../screens/MementoScreen'
import MementoManageScreen from '../screens/MementoManageScreen'
import MementoEditScreen from '../screens/MementoEditScreen'
import MementoPendingScreen from '../screens/MementoPendingScreen'
import Search from './Search'

const PageManager = ({ children }) => {
  const pageList = useSelector(state => state.ui.pageList)

  const screenList = {
    '/': HomeScreen,
    '/[username]': ProfileScreen,
    '/post/[id]': PostScreen,
    '/me/edit': me_edit,
    '/hub/following': hub_following,
    '/hub/recent': hub_recent,
    '/hub/search': hub_search,
    '/m/[id]': MementoScreen,
    '/m/[id]/manage': MementoManageScreen,
    '/m/[id]/edit': MementoEditScreen,
    '/m/[id]/pending': MementoPendingScreen,
    '/hub/search': Search
  }

  return (
    <div>
      <div className={pageList.length === 0 ? 'block' : 'hidden'} id="page-root">
        { children }
      </div>
      {
        pageList.map((page, idx) => {
          const Page = screenList[page.href]
          if(!Page) {
            throw Error('Page not registered')
          }
          return (
            <div key={idx} className={pageList.length === idx + 1 ? 'block' : 'hidden'} id={`page-${idx}`} style={{
              zIndex: 100 + idx
            }}>
              <Page {...page.props} />
            </div>
          )
        })
      }
    </div>
  )
}

export default withRedux(PageManager)