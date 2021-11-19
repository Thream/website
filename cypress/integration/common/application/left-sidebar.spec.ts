import { getGuildsHandler } from '../../../fixtures/guilds/get'
import { authenticationHandlers } from '../../../fixtures/handler'

describe('Common > application/left-sidebar', () => {
  beforeEach(() => {
    cy.task('stopMockServer')
  })

  it('should shows all the guilds of the current user in left sidebar', () => {
    cy.task('startMockServer', [
      ...authenticationHandlers,
      getGuildsHandler
    ]).setCookie('refreshToken', 'refresh-token')
    cy.visit('/application')
    cy.get('.guilds-list').children().should('have.length', 2)
  })
})
