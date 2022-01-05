import { useState, useEffect } from 'react'
import Image from 'next/image'
import axios from 'axios'
import prettyBytes from 'pretty-bytes'
import { DownloadIcon } from '@heroicons/react/solid'

import { useAuthentication } from '../../../../../tools/authentication'
import { MessageWithMember } from '../../../../../models/Message'
import { Loader } from '../../../../design/Loader'
import { FileIcon } from './FileIcon'

export interface FileData {
  blob: Blob
  url: string
}

export interface MessageContentProps {
  message: MessageWithMember
}

export const MessageFile: React.FC<MessageContentProps> = (props) => {
  const { message } = props

  const { authentication } = useAuthentication()
  const [file, setFile] = useState<FileData | null>(null)

  useEffect(() => {
    const ourRequest = axios.CancelToken.source()

    const fetchData = async (): Promise<void> => {
      const { data } = await authentication.api.get(message.value, {
        responseType: 'blob',
        cancelToken: ourRequest.token
      })
      const fileURL = URL.createObjectURL(data)
      setFile({ blob: data, url: fileURL })
    }
    fetchData().catch(() => {})

    return () => {
      ourRequest.cancel()
    }
  }, [message.value, authentication.api])

  if (file == null) {
    return <Loader />
  }
  if (message.mimetype.startsWith('image/')) {
    return (
      <a href={file.url} target='_blank' rel='noreferrer'>
        <Image
          className='max-w-xs max-h-xs'
          src={file.url}
          alt={message.value}
          width={320}
          height={320}
        />
      </a>
    )
  }
  if (message.mimetype.startsWith('audio/')) {
    return (
      <audio controls>
        <source src={file.url} type={message.mimetype} />
      </audio>
    )
  }
  if (message.mimetype.startsWith('video/')) {
    return (
      <video className='max-w-xs max-h-xs' controls>
        <source src={file.url} type={message.mimetype} />
      </video>
    )
  }
  return (
    <a href={file.url} download>
      <div className='flex items-center'>
        <div className='flex'>
          <div>
            <FileIcon />
          </div>
          <div className='ml-3'>
            <p>{file.blob.type}</p>
            <p className='mt-1'>{prettyBytes(file.blob.size)}</p>
          </div>
        </div>
        <DownloadIcon className='ml-4 w-8 h-8' />
      </div>
    </a>
  )
}
