import NavTop from "components/NavTop"
import Push from "components/Push"
import Image from "components/Image"
import InfiniteScroll from "react-infinite-scroll-component"
import InfiniteLoader from "components/InfiniteLoader"
import { prettyBalance } from "lib/utils"
import Pop from "components/Pop"

const WalletTransaction = ({ me, txList, getTx, hasMore }) => {
  return (
    <div className="bg-dark-0 min-h-screen pb-6">
      <NavTop
        left={
          <Pop>
            <a>
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 23.732 8.26801 30 16 30ZM16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="#F2F2F2" />
                <path fillRule="evenodd" clipRule="evenodd" d="M14.394 9.93934C14.9798 10.5251 14.9798 11.4749 14.394 12.0607L11.6213 14.8333H24C24.8284 14.8333 25.5 15.5049 25.5 16.3333C25.5 17.1618 24.8284 17.8333 24 17.8333H11.6213L14.394 20.606C14.9798 21.1918 14.9798 22.1415 14.394 22.7273C13.8082 23.3131 12.8585 23.3131 12.2727 22.7273L6.93934 17.394C6.65804 17.1127 6.5 16.7312 6.5 16.3333C6.5 15.9355 6.65804 15.554 6.93934 15.2727L12.2727 9.93934C12.8585 9.35355 13.8082 9.35355 14.394 9.93934Z" fill="#F2F2F2" />
              </svg>
            </a>
          </Pop>
        }
        center={
          <h3 className="text-white text-xl font-bold">Transactions</h3>
        }
      />
      <div className="px-4 py-4">
        <div className="mt-6">
          <h4 className="text-white-1">Transactions</h4>
          <div>
            <InfiniteScroll
              dataLength={txList.length}
              next={getTx}
              hasMore={hasMore}
              loader={<InfiniteLoader key={0} />}
            >
              {
                txList.map(tx => {
                  const formattedBalance = prettyBalance(tx.value)
                  const isOutTx = tx.from === me.id
                  const user = isOutTx ? tx.toUser : tx.fromUser
                  return (
                    <div key={tx.id} className="mt-4 p-2 flex items-center justify-between bg-dark-1 rounded-md">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full overflow-hidden shadow-inner">
                          <Push href="/[id]" as={`/${user.id}`} props={{
                            id: user.id,
                            user: user.id
                          }}>
                            <a>
                              <Image className="object-fill" data={user.imgAvatar} />
                            </a>
                          </Push>
                        </div>
                        <div className="ml-2">
                          <Push href="/[id]" as={`/${user.id}`} props={{
                            id: user.id,
                            user: user.id
                          }}>
                            <a>
                              <h4 className="text-white text-sm font-bold">{user.id}</h4>
                            </a>
                          </Push>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <h2 className="text-white text">{isOutTx ? '-' : '+'}{formattedBalance}</h2>
                        <svg className="ml-2" width="16" height="16" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 23.732 8.26801 30 16 30ZM16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="white" />
                          <path d="M12.25 18.3828V25.0625H10V8H16.293C18.1602 8 19.6211 8.47656 20.6758 9.42969C21.7383 10.3828 22.2695 11.6445 22.2695 13.2148C22.2695 14.8711 21.75 16.1484 20.7109 17.0469C19.6797 17.9375 18.1992 18.3828 16.2695 18.3828H12.25ZM12.25 16.543H16.293C17.4961 16.543 18.418 16.2617 19.0586 15.6992C19.6992 15.1289 20.0195 14.3086 20.0195 13.2383C20.0195 12.2227 19.6992 11.4102 19.0586 10.8008C18.418 10.1914 17.5391 9.875 16.4219 9.85156H12.25V16.543Z" fill="white" />
                        </svg>
                      </div>
                    </div>
                  )
                })
              }
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WalletTransaction