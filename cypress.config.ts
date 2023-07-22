import path from 'node:path'

import { defineConfig } from 'cypress'
import { getLocal } from 'mockttp'
import type { Mockttp } from 'mockttp'

import { API_DEFAULT_PORT } from './tools/api'
import type { Handlers } from './cypress/fixtures/handler'

const UPLOADS_FIXTURES_DIRECTORY = path.join(
  process.cwd(),
  'cypress',
  'fixtures',
  'uploads'
)

let server: Mockttp | null = null

export default defineConfig({
  fixturesFolder: false,
  video: false,
  screenshotOnRunFailure: false,
  e2e: {
    baseUrl: 'http://127.0.0.1:3000',
    supportFile: false,
    setupNodeEvents(on, config) {
      on('task', {
        async startMockServer(handlers: Handlers): Promise<null> {
          server = getLocal({ cors: true })
          await server.start(API_DEFAULT_PORT)
          for (const handler of handlers) {
            const { isFile = false, statusCode, body } = handler.response
            let requestBuilder = server.forGet(handler.url)
            switch (handler.method) {
              case 'GET':
                requestBuilder = server.forGet(handler.url)
                break
              case 'POST':
                requestBuilder = server.forPost(handler.url)
                break
              case 'PUT':
                requestBuilder = server.forPut(handler.url)
                break
              case 'DELETE':
                requestBuilder = server.forDelete(handler.url)
                break
            }
            if (isFile) {
              await requestBuilder.thenFromFile(
                statusCode,
                path.join(UPLOADS_FIXTURES_DIRECTORY, ...body)
              )
            } else {
              await requestBuilder.thenJson(statusCode, body)
            }
          }

          return null
        },

        async stopMockServer(): Promise<null> {
          if (server != null) {
            await server.stop()
            server = null
          }
          return null
        }
      })

      return config
    }
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack'
    }
  }
})
