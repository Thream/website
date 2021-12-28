import { getGuildsHandler } from '../../../fixtures/guilds/get'
import { authenticationHandlers } from '../../../fixtures/handler'

const applicationPaths = [
  '/application',
  '/application/users/0',
  '/application/guilds/create',
  '/application/guilds/join',
  '/application/0/0'
]

describe('Common > application/authentication', () => {
  beforeEach(() => {
    cy.task('stopMockServer')
  })

  it('should redirect the user to `/authentication/signin` if not signed in', () => {
    for (const applicationPath of applicationPaths) {
      cy.visit(applicationPath)
        .location('pathname')
        .should('eq', '/authentication/signin')
    }
  })

  it('should not redirect the user if signed in', () => {
    cy.task('startMockServer', [
      ...authenticationHandlers,
      getGuildsHandler
    ]).setCookie('refreshToken', 'refresh-token')
    for (const applicationPath of applicationPaths) {
      cy.visit(applicationPath)
        .location('pathname')
        .should('eq', applicationPath)
    }
  })
})