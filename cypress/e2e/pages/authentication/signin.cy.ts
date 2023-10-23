import { authenticationHandlers } from "../../../fixtures/handler"
import {
  postUsersSigninHandler,
  postUsersSigninInvalidCredentialsHandler,
} from "../../../fixtures/users/signin/post"
import { userExample } from "../../../fixtures/users/user"

describe("Pages > /authentication/signin", () => {
  beforeEach(() => {
    cy.task("stopMockServer")
    cy.visit("/authentication/signin")
  })

  it("should succeeds and sign in the user", () => {
    cy.task("startMockServer", [
      ...authenticationHandlers,
      postUsersSigninHandler,
    ])
    cy.get("#error-email").should("not.exist")
    cy.get("#error-password").should("not.exist")
    cy.get("[data-cy=input-email]").type(userExample.email)
    cy.get("[data-cy=input-password]").type("randompassword")
    cy.get("[data-cy=submit]").click()
    cy.location("pathname").should("eq", "/application")
  })

  it("should fails with unreachable api server", () => {
    cy.get("#error-email").should("not.exist")
    cy.get("#error-password").should("not.exist")
    cy.get("[data-cy=input-email]").type(userExample.email)
    cy.get("[data-cy=input-password]").type("randompassword")
    cy.get("[data-cy=submit]").click()
    cy.get("#message").should("have.text", "Error: Internal Server Error.")
    cy.get("#error-email").should("not.exist")
    cy.get("#error-password").should("not.exist")
  })

  it("should fails with invalid credentials", () => {
    cy.task("startMockServer", [
      ...authenticationHandlers,
      postUsersSigninInvalidCredentialsHandler,
    ])
    cy.get("#error-email").should("not.exist")
    cy.get("#error-password").should("not.exist")
    cy.get("[data-cy=input-email]").type(userExample.email)
    cy.get("[data-cy=input-password]").type("randompassword")
    cy.get("[data-cy=submit]").click()
    cy.get("#message").should(
      "have.text",
      "Error: Invalid credentials. Please try again.",
    )
    cy.get("#error-email").should("not.exist")
    cy.get("#error-password").should("not.exist")
  })
})

export {}
