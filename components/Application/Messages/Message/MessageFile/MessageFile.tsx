import { useState, useEffect } from "react"
import axios from "axios"
import prettyBytes from "pretty-bytes"
import { DownloadIcon } from "@heroicons/react/solid"

import type { MessageWithMember } from "../../../../../models/Message"
import { Loader } from "../../../../design/Loader"
import { FileIcon } from "./FileIcon"
import { api } from "../../../../../tools/api"

const supportedImageMimetype = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/gif",
]

export interface FileData {
  blob: Blob
  url: string
}

export interface MessageContentProps {
  message: MessageWithMember
}

export const MessageFile: React.FC<MessageContentProps> = (props) => {
  const { message } = props

  const [file, setFile] = useState<FileData | null>(null)

  useEffect(() => {
    const ourRequest = axios.CancelToken.source()

    const fetchData = async (): Promise<void> => {
      const { data } = await api.get(message.value, {
        responseType: "blob",
        cancelToken: ourRequest.token,
      })
      const fileURL = URL.createObjectURL(data)
      setFile({ blob: data, url: fileURL })
    }
    fetchData().catch(() => {})

    return () => {
      ourRequest.cancel()
    }
  }, [message.value])

  if (file == null) {
    return <Loader />
  }
  if (supportedImageMimetype.includes(message.mimetype)) {
    return (
      <a href={file.url} target="_blank" rel="noreferrer">
        <img
          data-cy={`message-file-image-${message.id}`}
          className="max-h-80 sm:max-w-xs"
          src={file.url}
          alt={message.value}
        />
      </a>
    )
  }
  if (message.mimetype.startsWith("audio/")) {
    return (
      <audio controls data-cy={`message-file-audio-${message.id}`}>
        <source src={file.url} type={message.mimetype} />
      </audio>
    )
  }
  if (message.mimetype.startsWith("video/")) {
    return (
      <video
        className="max-h-80 max-w-xs"
        controls
        data-cy={`message-file-video-${message.id}`}
      >
        <source src={file.url} type={message.mimetype} />
      </video>
    )
  }
  return (
    <a href={file.url} download data-cy={`message-file-download-${message.id}`}>
      <div className="flex items-center">
        <div className="flex items-center">
          <div>
            <FileIcon />
          </div>
          <div className="ml-4">
            <p>{file.blob.type}</p>
            <p className="mt-1">{prettyBytes(file.blob.size)}</p>
          </div>
        </div>
        <DownloadIcon className="ml-4 h-8 w-8" />
      </div>
    </a>
  )
}
