import { authenticationHandlers } from '../../../../fixtures/handler'

describe('Pages > /application/[guildId]/[channelId]', () => {
  beforeEach(() => {
    cy.task('stopMockServer')
  })

  it('should redirect the user to `/application` if `guildId` or `channelId` are not numbers', () => {
    cy.task('startMockServer', authenticationHandlers).setCookie(
      'refreshToken',
      'refresh-token'
    )
    cy.visit('/application/abc/abc')
      .location('pathname')
      .should('eq', '/application')
  })
})
