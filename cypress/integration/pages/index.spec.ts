describe('Page > /', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should redirect the user to signup page when clicking "Get started"', () => {
    cy.get('[data-cy=get-started]')
      .click()
      .location('pathname')
      .should('eq', '/authentication/signup')
  })
})
