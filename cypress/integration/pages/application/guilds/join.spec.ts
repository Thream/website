import { guildExample, guildExample2 } from '../../../../fixtures/guilds/guild'
import {
  getGuildsPublicEmptyHandler,
  getGuildsPublicHandler,
  getGuildsPublicSearchHandler
} from '../../../../fixtures/guilds/public/get'
import { authenticationHandlers } from '../../../../fixtures/handler'
import { API_URL } from '../../../../../tools/api'

describe('Pages > /application/guilds/join', () => {
  beforeEach(() => {
    cy.task('stopMockServer')
  })

  it('should shows all the guilds', () => {
    cy.task('startMockServer', [
      ...authenticationHandlers,
      getGuildsPublicHandler
    ]).setCookie('refreshToken', 'refresh-token')
    cy.intercept(`${API_URL}${getGuildsPublicHandler.url}*`).as(
      'getGuildsPublicHandler'
    )
    cy.visit('/application/guilds/join')
    cy.wait(['@getGuildsPublicHandler']).then(() => {
      cy.get('[data-cy=application-title]').should('have.text', 'Join a Guild')
      cy.get('.guilds-public-list').children().should('have.length', 2)
      cy.get('.guilds-public-list [data-cy=guild-name]:first').should(
        'have.text',
        guildExample.name
      )
      cy.get('.guilds-public-list [data-cy=guild-name]:last').should(
        'have.text',
        guildExample2.name
      )
    })
  })

  it('should shows the searched guild', () => {
    cy.task('startMockServer', [
      ...authenticationHandlers,
      getGuildsPublicSearchHandler
    ]).setCookie('refreshToken', 'refresh-token')
    cy.visit('/application/guilds/join')
    cy.intercept(`${API_URL}${getGuildsPublicHandler.url}*`).as(
      'getGuildsPublicHandler'
    )
    cy.wait(['@getGuildsPublicHandler']).then(() => {
      cy.get('[data-cy=search-guild-input]').type(guildExample2.name)
      cy.get('.guilds-public-list').children().should('have.length', 1)
      cy.get('.guilds-public-list [data-cy=guild-name]:first').should(
        'have.text',
        guildExample2.name
      )
    })
  })

  it('should shows no guild if there are no public guilds', () => {
    cy.task('startMockServer', [
      ...authenticationHandlers,
      getGuildsPublicEmptyHandler
    ]).setCookie('refreshToken', 'refresh-token')
    cy.intercept(`${API_URL}${getGuildsPublicEmptyHandler.url}*`).as(
      'getGuildsPublicEmptyHandler'
    )
    cy.visit('/application/guilds/join')
    cy.wait('@getGuildsPublicEmptyHandler').then(() => {
      cy.get('.guilds-public-list').children().should('have.length', 0)
    })
  })

  it('should shows loader with internal api server error', () => {
    cy.task('startMockServer', [...authenticationHandlers]).setCookie(
      'refreshToken',
      'refresh-token'
    )
    cy.visit('/application/guilds/join')
    cy.get('.guilds-public-list').children().should('have.length', 1)
    cy.get('[data-testid=progress-spinner]').should('be.visible')
  })
})
