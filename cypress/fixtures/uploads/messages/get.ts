import type { Handler } from '../../handler'
import {
  messageExampleComplete6,
  messageExampleComplete7,
  messageExampleComplete8,
  messageExampleComplete9
} from '../../messages/message'

export const getMessagesUploadsImageHandler: Handler = {
  method: 'GET',
  url: messageExampleComplete6.value as `/${string}`,
  response: {
    statusCode: 200,
    isFile: true,
    body: ['image.png']
  }
}

export const getMessagesUploadsAudioHandler: Handler = {
  method: 'GET',
  url: messageExampleComplete7.value as `/${string}`,
  response: {
    statusCode: 200,
    isFile: true,
    body: ['audio.mp3']
  }
}

export const getMessagesUploadsVideoHandler: Handler = {
  method: 'GET',
  url: messageExampleComplete8.value as `/${string}`,
  response: {
    statusCode: 200,
    isFile: true,
    body: ['video.mp4']
  }
}

export const getMessagesUploadsDownloadHandler: Handler = {
  method: 'GET',
  url: messageExampleComplete9.value as `/${string}`,
  response: {
    statusCode: 200,
    isFile: true,
    body: ['download.zip']
  }
}
