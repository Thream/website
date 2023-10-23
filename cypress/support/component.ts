import { mount } from "cypress/react"

import "./commands"
import "../../styles/global.css"

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

Cypress.Commands.add("mount", mount)
