import {
  getGuildsPublicEmptyHandler,
  getGuildsPublicHandler,
  getGuildsPublicSearchHandler
} from '../../../../fixtures/guilds/public/get'
import { authenticationHandlers } from '../../../../fixtures/handler'

describe('Pages > /application/guilds/join', () => {
  beforeEach(() => {
    cy.task('stopMockServer')
  })

  it('should shows no guild if there are no public guilds', () => {
    cy.task('startMockServer', [
      ...authenticationHandlers,
      getGuildsPublicEmptyHandler
    ]).setCookie('refreshToken', 'refresh-token')
    cy.visit('/application/guilds/join')
    cy.get('.guilds-list').children().should('have.length', 0)
  })

  it('should shows loader with internal api server error', () => {
    cy.task('startMockServer', [...authenticationHandlers]).setCookie(
      'refreshToken',
      'refresh-token'
    )
    cy.visit('/application/guilds/join')
    cy.get('.guilds-list').children().should('have.length', 1)
    cy.get('[data-testid=progress-spinner]').should('be.visible')
  })

  it('should shows all the guilds', () => {
    cy.task('startMockServer', [
      ...authenticationHandlers,
      getGuildsPublicHandler
    ]).setCookie('refreshToken', 'refresh-token')
    cy.visit('/application/guilds/join')
    cy.get('.guilds-list').children().should('have.length', 2)
    cy.get('.guilds-list [data-cy=guild-name]:first').should(
      'have.text',
      'GuildExample'
    )
  })

  it('should shows the searched guild', () => {
    cy.task('startMockServer', [
      ...authenticationHandlers,
      getGuildsPublicSearchHandler,
      getGuildsPublicEmptyHandler
    ]).setCookie('refreshToken', 'refresh-token')
    cy.visit('/application/guilds/join')
    cy.get('[data-cy=search-guild-input]').type('app')
    cy.get('.guilds-list').children().should('have.length', 1)
    cy.get('.guilds-list [data-cy=guild-name]:first').should('have.text', 'app')
  })
})
