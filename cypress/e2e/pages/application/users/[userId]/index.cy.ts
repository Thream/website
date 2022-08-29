import date from 'date-and-time'

import { userExample } from '../../../../../fixtures/users/user'
import { getUserByIdHandler } from '../../../../../fixtures/users/[userId]/get'
import { authenticationHandlers } from '../../../../../fixtures/handler'

describe('Pages > /application/users/[userId]', () => {
  beforeEach(() => {
    cy.task('stopMockServer')
  })

  it('should succeeds and display the public user profile correctly', () => {
    cy.task('startMockServer', [
      ...authenticationHandlers,
      getUserByIdHandler
    ]).setCookie('refreshToken', 'refresh-token')
    cy.visit(`/application/users/${userExample.id}`)
    cy.get('[data-cy=user-name]').should('have.text', userExample.name)
    cy.get('[data-cy=user-email]').should('have.text', userExample.email)
    cy.get('[data-cy=user-createdAt]').should(
      'have.text',
      date.format(new Date(userExample.createdAt), 'DD/MM/YYYY')
    )
  })

  it("should redirect the user to `/404` if `userId` doesn't exist", () => {
    cy.task('startMockServer', [...authenticationHandlers]).setCookie(
      'refreshToken',
      'refresh-token'
    )
    cy.visit(`/application/users/123`, { failOnStatusCode: false })
      .location('pathname')
      .should('eq', '/404')
  })
})

export {}
