import path from 'node:path'

import { getLocal } from 'mockttp'

import { API_DEFAULT_PORT } from '../../tools/api'

/// <reference types="cypress" />

/** @type {import('mockttp').Mockttp | null}  */
let server = null

const UPLOADS_FIXTURES_DIRECTORY = path.join(
  process.cwd(),
  'cypress',
  'fixtures',
  'uploads'
)

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  on('task', {
    /**
     * @param {import('../fixtures/handler').Handlers} handlers
     */
    async startMockServer(handlers) {
      server = getLocal({
        cors: true
      })
      await server.start(API_DEFAULT_PORT)
      for (const handler of handlers) {
        const { isFile = false } = handler.response
        const method =
          /** @type {Lowercase<import('../fixtures/handler').Method>} */ (
            handler.method.toLowerCase()
          )
        const requestRule = server[method]
        if (isFile) {
          await requestRule(handler.url).thenFromFile(
            handler.response.statusCode,
            path.join(UPLOADS_FIXTURES_DIRECTORY, ...handler.response.body)
          )
        } else {
          await requestRule(handler.url).thenJson(
            handler.response.statusCode,
            handler.response.body
          )
        }
      }
      return null
    },

    async stopMockServer() {
      if (server != null) {
        await server.stop()
        server = null
      }
      return null
    }
  })

  return config
}
