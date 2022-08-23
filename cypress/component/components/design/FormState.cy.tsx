import { FormState } from '../../../../components/design/FormState'

describe('<FormState />', () => {
  it('should return nothing if the state is idle', () => {
    cy.mount(<FormState state='idle' />)
      .get('[data-cy-root]')
      .should('be.empty')
  })

  it('should return nothing if the message is null', () => {
    cy.mount(<FormState state='error' />)
      .get('[data-cy-root]')
      .should('be.empty')
  })

  it('should render the <Loader /> if state is loading', () => {
    cy.mount(<FormState state='loading' />)
      .get('[data-cy=loader]')
      .should('be.visible')
  })

  it('should render the success message if state is success', () => {
    const message = 'Success Message'
    cy.mount(<FormState state='success' message={message} id='success' />)
      .get('#success')
      .contains(message)
  })

  it('should render the error message if state is error', () => {
    const message = 'Error Message'
    cy.mount(<FormState state='error' message={message} id='error' />)
      .get('#error')
      .contains(message)
  })
})
