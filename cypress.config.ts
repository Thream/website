import path from 'node:path'

import { defineConfig } from 'cypress'
import { getLocal } from 'mockttp'
import type { Mockttp } from 'mockttp'

import { API_DEFAULT_PORT } from './tools/api'
import type { Handlers, Method } from './cypress/fixtures/handler'

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
  downloadsFolder: undefined,
  screenshotOnRunFailure: false,

  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: false,
    setupNodeEvents(on, config) {
      on('task', {
        async startMockServer(handlers: Handlers): Promise<null> {
          server = getLocal({
            cors: true
          })
          await server.start(API_DEFAULT_PORT)
          for (const handler of handlers) {
            const { isFile = false } = handler.response
            const method = handler.method.toLowerCase() as Lowercase<Method>
            if (isFile) {
              await server[method](handler.url).thenFromFile(
                handler.response.statusCode,
                path.join(UPLOADS_FIXTURES_DIRECTORY, ...handler.response.body)
              )
            } else {
              await server[method](handler.url).thenJson(
                handler.response.statusCode,
                handler.response.body
              )
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
