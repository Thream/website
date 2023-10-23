import {
  putUsersResetPasswordHandler,
  putUsersResetPasswordInvalidTemporaryTokenHandler,
} from "../../../fixtures/users/reset-password/put"

describe("Pages > /authentication/reset-password", () => {
  beforeEach(() => {
    cy.task("stopMockServer")
  })

  it("should succeeds and redirect user to sign in page", () => {
    cy.task("startMockServer", [putUsersResetPasswordHandler])
    cy.visit("/authentication/reset-password?temporaryToken=abcdefg")
    cy.get("#message").should("not.exist")
    cy.get("[data-cy=input-password]").type("somepassword")
    cy.get("[data-cy=submit]").click()
    cy.location("pathname").should("eq", "/authentication/signin")
  })

  it("should fails with invalid `temporaryToken`", () => {
    cy.task("startMockServer", [
      putUsersResetPasswordInvalidTemporaryTokenHandler,
    ])
    cy.visit("/authentication/reset-password")
    cy.get("#message").should("not.exist")
    cy.get("[data-cy=input-password]").type("somepassword")
    cy.get("[data-cy=submit]").click()
    cy.get("#message").should("have.text", "Error: Invalid value.")
  })

  it("should fails with unreachable api server", () => {
    cy.visit("/authentication/reset-password")
    cy.get("#message").should("not.exist")
    cy.get("[data-cy=input-password]").type("randompassword")
    cy.get("[data-cy=submit]").click()
    cy.get("#message").should("have.text", "Error: Internal Server Error.")
  })

  it("should fails with empty password value", () => {
    cy.visit("/authentication/reset-password")
    cy.get("#message").should("not.exist")
    cy.get("[data-cy=submit]").click()
    cy.get("#message").should(
      "have.text",
      "Error: Oops, this field is required 🙈.",
    )
  })
})

export {}
