import React, { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import Push from 'components/Push'
import axios from 'axios'
import { NotifyContext } from 'components/Utils/NotifyProvider'

const ConfirmPage = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const useNotify = useContext(NotifyContext)

  useEffect(() => {
    const checkConfirm = async () => {

      try {
        await axios.post(`http://localhost:9090/confirm`, {
          token: router.query.id
        })
        setIsLoading(false)
      } catch (err) {
        if (err.response.data.message === 'already_confirmed') {
          useNotify.setText('Email already confirmed')
          useNotify.setShow(true, 2500)
          setIsLoading(false)
        }
        else {
          useNotify.setText('Something went wrong, try again later')
          useNotify.setShow(true, 2500)
        }
      }
    }
    if (router.query && router.query.id) {
      checkConfirm()
    }
  }, [router])

  return (
    <div className="px-4 h-screen">
      <div className="sticky top-0 z-20 bg-dark-12">
        <div className="flex justify-between items-center w-full h-12">
          <Push href="/" as="/">
            <a className="flex items-center">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 23.732 8.26801 30 16 30ZM16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="#F2F2F2" />
                <path fillRule="evenodd" clipRule="evenodd" d="M14.394 9.93934C14.9798 10.5251 14.9798 11.4749 14.394 12.0607L11.6213 14.8333H24C24.8284 14.8333 25.5 15.5049 25.5 16.3333C25.5 17.1618 24.8284 17.8333 24 17.8333H11.6213L14.394 20.606C14.9798 21.1918 14.9798 22.1415 14.394 22.7273C13.8082 23.3131 12.8585 23.3131 12.2727 22.7273L6.93934 17.394C6.65804 17.1127 6.5 16.7312 6.5 16.3333C6.5 15.9355 6.65804 15.554 6.93934 15.2727L12.2727 9.93934C12.8585 9.35355 13.8082 9.35355 14.394 9.93934Z" fill="#F2F2F2" />
              </svg>
              <h3 className="ml-4 text-white text-xl font-bold">Home</h3>
            </a>
          </Push>
        </div>
      </div>
      <div className="flex -mt-20 items-center justify-center h-full">
        <div className="w-full p-4">
          <div>
            <svg width="99" height="71" viewBox="0 0 99 71" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M48.1706 3.19922V17.7396H34.6152V3.17578L48.1706 3.19922ZM46.74 16.0041L42.5654 5.42718H37.6406V6.97503H40.3141L36.726 15.9572L38.1566 16.5435L39.376 13.4478H44.0664L45.3329 16.567L46.74 16.0041ZM43.4802 11.9234H39.9858L41.7447 7.53788L43.4802 11.9234Z" fill="white" />
              <path d="M63.2256 16.543L50.8664 18.5364L48.3335 2.82351L60.7162 0.830078L63.2256 16.543ZM60.3879 14.5261L60.1298 12.9079L55.0408 13.7288L53.5868 4.72314L50.8898 5.16872L51.1477 6.76347L52.25 6.57585L53.7041 15.5815L60.3879 14.5261Z" fill="white" />
              <path d="M68.0636 14.2211C68.5483 14.2211 69.0331 14.1899 69.5177 14.1273C70.0023 14.0491 70.4402 13.9084 70.831 13.7052C71.2219 13.4863 71.5423 13.1892 71.7925 12.814C72.0427 12.4231 72.1677 11.9072 72.1677 11.2662C72.1677 10.6095 71.9958 10.0935 71.6517 9.71832C71.3079 9.32745 70.87 9.03037 70.3385 8.82712C69.8069 8.62387 69.2129 8.4988 68.5562 8.45189C67.8994 8.38935 67.2663 8.35809 66.6565 8.35809C66.3283 8.35809 66.0077 8.36591 65.695 8.38155C65.3979 8.38155 65.1242 8.38155 64.8742 8.38155L64.8273 9.81212L65.6012 9.85903L65.4369 17.9735H66.8675L66.9848 14.1977C67.1725 14.2133 67.3523 14.2211 67.5242 14.2211C67.7119 14.2211 67.8917 14.2211 68.0636 14.2211ZM70.7136 11.2896C70.7136 11.6179 70.6435 11.8837 70.5027 12.087C70.3775 12.2746 70.1979 12.4231 69.9633 12.5326C69.7444 12.642 69.4942 12.7202 69.2129 12.7671C68.9313 12.7984 68.6421 12.814 68.345 12.814C68.1575 12.814 67.9542 12.814 67.7354 12.814C67.5163 12.7984 67.274 12.7827 67.0083 12.7671L67.0787 9.83557C68.3294 9.83557 69.244 9.92157 69.8225 10.0935C70.4167 10.2499 70.7136 10.6486 70.7136 11.2896ZM73.7156 19.6151L62.9746 19.404L63.2325 7.2793L73.9736 7.51382L73.7156 19.6151Z" fill="white" />
              <path d="M85.0855 7.91243L84.4757 19.0991L74.8604 18.6066L75.4467 7.39648L85.0855 7.91243ZM83.3265 9.50718L82.2244 9.46027L82.1071 12.2745L78.9879 12.1104L79.1286 9.29612L77.2759 9.22575L77.1821 10.3046L77.9796 10.328L77.6511 16.2848L78.73 16.3787L78.8942 13.1892L82.0132 13.3533L81.849 16.5428L82.9513 16.5897L83.3265 9.50718Z" fill="white" />
              <path d="M98.7579 1.74499L97.3038 14.7375L85.1792 13.4007L86.6332 0.384766L98.7579 1.74499ZM96.1782 13.0489L93.528 3.19902L89.119 2.68307L88.9784 4.06675L91.3471 4.34819L87.2428 11.9936L88.4625 12.6737L89.8696 10.0471L94.044 10.4927L94.8648 13.4242L96.1782 13.0489ZM93.6923 9.08552L90.5496 8.73373L92.59 4.98138L93.6923 9.08552Z" fill="white" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5 71H11.5514L9.88473 58.096C16.8676 59.1101 31.6667 59.5228 35 53.0603C38.3333 59.5228 53.1324 59.1101 60.1153 58.096L58.4486 71H65L70 24L51.7195 29.0357C45.5908 30.5744 35 35.4562 35 42.6741C35 35.4562 24.4092 30.5744 18.2805 29.0357L0 24L5 71ZM9.16653 30.1802C15.8332 31.8588 30.1439 37.9016 33.4772 48.6445C29.9363 53.9937 22.7253 53.8185 18.2594 53.7078C17.6803 53.6935 17.145 53.6802 16.6667 53.6802C7.50001 53.6802 8.79396 31.6276 9.16653 30.1802ZM60.8335 30.1802C54.1668 31.8588 39.8561 37.9016 36.5228 48.6445C40.0638 53.9937 47.2748 53.8185 51.7406 53.7078C52.3197 53.6935 52.8551 53.6802 53.3333 53.6802C62.5 53.6802 61.2061 31.6276 60.8335 30.1802Z" fill="white" />
            </svg>
          </div>
          {
            isLoading ? (
              <div className="mt-4">
                <h3 className="text-3xl text-white font-semibold">Confirming...</h3>
              </div>
            ) : (
              <div>
                <div className="mt-4">
                  <h3 className="text-3xl text-white font-semibold">Email confirmed</h3>
                  <p className="text-white-2">Yeay, your email has been verified.</p>
                </div>
                <div className="mt-4">
                  <Push href="/" as="/">
                    <a>
                      <button className="w-full rounded-md p-2 bg-primary-5 text-white font-semibold">Explore Paras</button>
                    </a>
                  </Push>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default ConfirmPage