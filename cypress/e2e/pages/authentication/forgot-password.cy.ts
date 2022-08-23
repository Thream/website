import { postUsersResetPasswordHandler } from '../../../fixtures/users/reset-password/post'
import { userExample } from '../../../fixtures/users/user'

describe('Pages > /authentication/forgot-password', () => {
  beforeEach(() => {
    cy.task('stopMockServer')
    cy.visit('/authentication/forgot-password')
  })

  it('should succeeds and sends a password-reset request', () => {
    cy.task('startMockServer', [postUsersResetPasswordHandler])
    cy.get('#message').should('not.exist')
    cy.get('[data-cy=input-email]').type(userExample.email)
    cy.get('[data-cy=submit]').click()
    cy.get('#message').should(
      'have.text',
      'Success: Password-reset request successful, please check your emails!'
    )
  })

  it('should fails with unreachable api server', () => {
    cy.get('#message').should('not.exist')
    cy.get('[data-cy=input-email]').type(userExample.email)
    cy.get('[data-cy=submit]').click()
    cy.get('#message').should('have.text', 'Error: Internal Server Error.')
  })

  it('should fails with wrong email format', () => {
    cy.get('#message').should('not.exist')
    cy.get('[data-cy=input-email]').type('test')
    cy.get('[data-cy=submit]').click()
    cy.get('#message').should(
      'have.text',
      'Error: Mmm… It seems that this email is not valid 🤔.'
    )
  })
})

export {}
