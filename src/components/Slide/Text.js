import ParseBody from '../parseBody'
import Scrollbars from 'react-custom-scrollbars'

const SlideText = ({ body }) => {
  return (
    <div className="w-full relative pb-full">
      <div className="absolute m-auto w-full h-full p-2">
        <Scrollbars>
          <div className="flex h-full">
            <p className="mt-auto mb-auto text-left text-white whitespace-pre-line">
              <ParseBody body={body} />
            </p>
          </div>
        </Scrollbars>
      </div>
    </div>
  )
}

export default SlideText