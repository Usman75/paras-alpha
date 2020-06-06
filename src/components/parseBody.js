import Push from './Push'

const ParseBody = ({ body = '' }) => {
  const splitRegex = /(@\[@.+?\]\(.+?\))/
  const captureRegex = /@\[@(.+)?\]\(.+?\)/
  const trim = body.replace(/(\r\n|\r|\n){2,}/g, '$1\n')
  const bodyBlocks = trim.split(splitRegex)
  const parsedBlock = bodyBlocks.map((block, idx) => {
    const match = block.match(captureRegex)
    if(match) {
      return (
        <Push key={idx} href="/[username]" as={`/${match[1]}`} props={{
          username: match[1]
        }}>
          <a style={{
            backgroundColor: `#df4544`,
            borderRadius: `.1rem`
          }}>@{ match[1] }</a>
        </Push>
      )
    }
    else {
      return (
        <span className="whitespace-pre-line" key={idx}>{block}</span>
      )
    }
  })

  return parsedBlock
}

export default ParseBody