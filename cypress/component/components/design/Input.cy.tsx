import { Input, getInputType } from '../../../../components/design/Input'

describe('<Input />', () => {
  it('should render the label', () => {
    const labelContent = 'label content'
    cy.mount(<Input label={labelContent} />)
      .get('label')
      .should('have.text', labelContent)
  })

  it('should not render forgot password link', () => {
    cy.mount(<Input type='text' label='content' showForgotPassword />)
      .get('[data-cy=forgot-password-link]')
      .should('not.exist')
  })

  it('should render forgot password link', () => {
    cy.mount(<Input type='password' label='content' showForgotPassword />)
      .get('[data-cy=forgot-password-link]')
      .should('exist')
  })

  it('should not render the eye icon if the input is not of type "password"', () => {
    cy.mount(<Input type='text' label='content' />)
      .get('[data-cy=password-eye]')
      .should('not.exist')
  })

  it('should handlePassword with eye icon', async () => {
    cy.mount(<Input type='password' label='content' />)
      .get('input')
      .should('have.attr', 'type', 'password')
      .get('[data-cy=password-eye]')
      .click()
      .get('input')
      .should('have.attr', 'type', 'text')
  })

  describe('getInputType', () => {
    it('should return `text`', () => {
      expect(getInputType('password')).equal('text')
    })

    it('should return `password`', () => {
      expect(getInputType('text')).equal('password')
    })
  })
})
