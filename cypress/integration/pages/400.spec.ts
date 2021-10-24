describe('Page > /404', () => {
  beforeEach(() => {
    cy.visit('/404', { failOnStatusCode: false })
  })

  it('should display the statusCode of 404', () => {
    cy.get('[data-cy=status-code]').contains('404')
  })
})
