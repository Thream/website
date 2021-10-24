import { useEffect, useState } from 'react'
import prettyBytes from 'pretty-bytes'

import { useAuthentication } from 'utils/authentication'
import { MessageContentProps } from '.'
import { Loader } from 'components/design/Loader'
import { IconButton } from 'components/design/IconButton'

export interface FileData {
  blob: Blob
  url: string
}

export const MessageFile: React.FC<MessageContentProps> = (props) => {
  const { authentication } = useAuthentication()
  const [file, setFile] = useState<FileData | null>(null)

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const { data } = await authentication.api.get(props.value, {
        responseType: 'blob'
      })
      const fileURL = URL.createObjectURL(data)
      setFile({ blob: data, url: fileURL })
    }
    fetchData().catch(() => {})
  }, [])

  if (file == null) {
    return <Loader />
  }
  if (props.mimetype.startsWith('image/')) {
    return (
      <>
        <a href={file.url} target='_blank' rel='noreferrer'>
          <img src={file.url} />
        </a>

        <style jsx>
          {`
            img {
              max-width: 30vw;
              max-height: 30vw;
            }
          `}
        </style>
      </>
    )
  }
  if (props.mimetype.startsWith('audio/')) {
    return (
      <audio controls>
        <source src={file.url} type={props.mimetype} />
      </audio>
    )
  }
  if (props.mimetype.startsWith('video/')) {
    return (
      <>
        <video controls>
          <source src={file.url} type={props.mimetype} />
        </video>

        <style jsx>
          {`
            video {
              max-width: 250px;
              max-height: 250px;
            }
          `}
        </style>
      </>
    )
  }
  return (
    <>
      <div className='message-file'>
        <div className='file-informations'>
          <div className='file-icon'>
            <img src='/images/svg/icons/file.svg' alt='file' />
          </div>
          <div className='file-title'>
            <div className='file-name'>{file.blob.type}</div>
            <div className='file-size'>{prettyBytes(file.blob.size)}</div>
          </div>
        </div>
        <div className='download-button'>
          <a href={file.url} download>
            <IconButton icon='download' />
          </a>
        </div>
      </div>

      <style jsx>
        {`
          .message-file {
            display: flex;
            justify-content: space-between;
          }
          .file-informations {
            display: flex;
          }
          .file-title {
            margin-left: 10px;
          }
          .file-size {
            color: var(--color-tertiary);
            margin-top: 5px;
          }
        `}
      </style>
    </>
  )
}
