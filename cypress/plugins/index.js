import { getLocal } from 'mockttp'

/// <reference types="cypress" />

/** @type {import('mockttp').Mockttp | null}  */
let server = null

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
      await server.start(8080)
      for (const handler of handlers) {
        await server[handler.method.toLowerCase()](handler.url).thenJson(
          handler.response.statusCode,
          handler.response.body
        )
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
