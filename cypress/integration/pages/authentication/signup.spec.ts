import { user } from '../../../fixtures/users/user'
import {
  postUsersSignupHandler,
  postUsersSignupAlreadyUsedHandler
} from '../../../fixtures/users/signup/post'

describe('Pages > /authentication/signup', () => {
  beforeEach(() => {
    cy.task('stopMockServer')
    cy.visit('/authentication/signup')
  })

  it('should succeeds and sign up the user', () => {
    cy.task('startMockServer', [postUsersSignupHandler])
    cy.get('#error-name').should('not.exist')
    cy.get('#error-email').should('not.exist')
    cy.get('#error-password').should('not.exist')
    cy.get('[data-cy=input-name]').type(user.name)
    cy.get('[data-cy=input-email]').type(user.email)
    cy.get('[data-cy=input-password]').type('randompassword')
    cy.get('[data-cy=submit]').click()
    cy.get('#message').should(
      'have.text',
      "Success: You're almost there, please check your emails to confirm registration."
    )
  })

  it('should fails with name or email already used', () => {
    cy.task('startMockServer', [postUsersSignupAlreadyUsedHandler])
    cy.get('#error-name').should('not.exist')
    cy.get('#error-email').should('not.exist')
    cy.get('#error-password').should('not.exist')
    cy.get('[data-cy=input-name]').type(user.name)
    cy.get('[data-cy=input-email]').type(user.email)
    cy.get('[data-cy=input-password]').type('randompassword')
    cy.get('[data-cy=submit]').click()
    cy.get('#message').should('have.text', 'Error: Name or Email already used.')
    cy.get('#error-name').should('not.exist')
    cy.get('#error-email').should('not.exist')
    cy.get('#error-password').should('not.exist')
  })

  it('should fails with unreachable api server', () => {
    cy.get('#error-name').should('not.exist')
    cy.get('#error-email').should('not.exist')
    cy.get('#error-password').should('not.exist')
    cy.get('[data-cy=input-name]').type(user.name)
    cy.get('[data-cy=input-email]').type(user.email)
    cy.get('[data-cy=input-password]').type('randompassword')
    cy.get('[data-cy=submit]').click()
    cy.get('#message').should('have.text', 'Error: Internal Server Error.')
    cy.get('#error-name').should('not.exist')
    cy.get('#error-email').should('not.exist')
    cy.get('#error-password').should('not.exist')
  })

  it('should fails with all inputs as required with error messages and update error messages when updating language (translation)', () => {
    const requiredErrorMessage = {
      en: 'Error: Oops, this field is required 🙈.',
      fr: 'Erreur: Oups, ce champ est obligatoire 🙈.'
    }
    cy.get('#error-name').should('not.exist')
    cy.get('#error-email').should('not.exist')
    cy.get('#error-password').should('not.exist')
    cy.get('[data-cy=submit]').click()
    cy.get('#error-name').should('have.text', requiredErrorMessage.en)
    cy.get('#error-email').should('have.text', requiredErrorMessage.en)
    cy.get('#error-password').should('have.text', requiredErrorMessage.en)
    cy.get('[data-cy=language-click]').click()
    cy.get('[data-cy=languages-list] > li:first-child').contains('FR').click()
    cy.get('#error-name').should('have.text', requiredErrorMessage.fr)
    cy.get('#error-email').should('have.text', requiredErrorMessage.fr)
    cy.get('#error-password').should('have.text', requiredErrorMessage.fr)
  })

  it('should fails with wrong email format', () => {
    cy.get('#error-email').should('not.exist')
    cy.get('[data-cy=input-email]').type('test')
    cy.get('[data-cy=submit]').click()
    cy.get('#error-email').should(
      'have.text',
      'Error: Mmm… It seems that this email is not valid 🤔.'
    )
  })
})
