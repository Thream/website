import { authenticationHandlers } from '../../../fixtures/handler'

describe('Pages > /application', () => {
  beforeEach(() => {
    cy.task('stopMockServer')
  })

  it('should redirect user to `/application/guilds/create` on click on "Create a Guild"', () => {
    cy.task('startMockServer', [...authenticationHandlers]).setCookie(
      'refreshToken',
      'refresh-token'
    )
    cy.visit('/application')
    cy.get('a[href="/application/guilds/create"]')
      .click()
      .location('pathname')
      .should('eq', '/application/guilds/create')
  })

  it('should redirect user to `/application/guilds/join` on click on "Join a Guild"', () => {
    cy.task('startMockServer', [...authenticationHandlers]).setCookie(
      'refreshToken',
      'refresh-token'
    )
    cy.visit('/application')
    cy.get('a[href="/application/guilds/join"]')
      .click()
      .location('pathname')
      .should('eq', '/application/guilds/join')
  })
})
