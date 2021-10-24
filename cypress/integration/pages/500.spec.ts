describe('Page > /500', () => {
  beforeEach(() => {
    cy.visit('/500', { failOnStatusCode: false })
  })

  it('should display the statusCode of 500', () => {
    cy.get('[data-cy=status-code]').contains('500')
  })
})
