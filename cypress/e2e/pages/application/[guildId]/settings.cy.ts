import { deleteLeaveMembersWithGuildIdHandler } from "../../../../fixtures/guilds/[guildId]/members/leave"
import { guildExample } from "../../../../fixtures/guilds/guild"
import {
  getGuildMemberNotOwnerWithGuildIdHandler,
  getGuildMemberWithGuildIdHandler,
} from "../../../../fixtures/guilds/[guildId]/get"
import { authenticationHandlers } from "../../../../fixtures/handler"
import { API_URL } from "../../../../../tools/api"
import { deleteGuildWithGuildIdHandler } from "../../../../fixtures/guilds/[guildId]/delete"

describe("Pages > /application/[guildId]/settings", () => {
  beforeEach(() => {
    cy.task("stopMockServer")
  })

  it("should succeeds and display correctly the settings of the guild (member is owner)", () => {
    cy.task("startMockServer", [
      ...authenticationHandlers,
      getGuildMemberWithGuildIdHandler,
    ]).setCookie("refreshToken", "refresh-token")
    cy.visit(`/application/${guildExample.id}/settings`)
    cy.get("[data-cy=guild-name-input]").should("have.value", guildExample.name)
    cy.get("[data-cy=guild-description-input]").should(
      "have.value",
      guildExample.description,
    )
    cy.get("[data-cy=button-save-guild-settings]").should("be.visible")
    cy.get("[data-cy=button-delete-guild-settings]").should("be.visible")
    cy.get("[data-cy=button-leave-guild-settings]").should("not.exist")
  })

  it("should succeeds and display correctly the settings of the guild (member is not owner)", () => {
    cy.task("startMockServer", [
      ...authenticationHandlers,
      getGuildMemberNotOwnerWithGuildIdHandler,
    ]).setCookie("refreshToken", "refresh-token")
    cy.visit(`/application/${guildExample.id}/settings`)
    cy.get("[data-cy=guild-name-input]").should("not.exist")
    cy.get("[data-cy=guild-description-input]").should("not.exist")
    cy.get("[data-cy=button-save-guild-settings]").should("not.exist")
    cy.get("[data-cy=button-delete-guild-settings]").should("not.exist")
    cy.get("[data-cy=button-leave-guild-settings]").should("be.visible")
  })

  it("should succeeds and leave the guild (member is not owner)", () => {
    cy.task("startMockServer", [
      ...authenticationHandlers,
      getGuildMemberNotOwnerWithGuildIdHandler,
      deleteLeaveMembersWithGuildIdHandler,
    ]).setCookie("refreshToken", "refresh-token")
    cy.intercept(`${API_URL}${deleteLeaveMembersWithGuildIdHandler.url}*`).as(
      "deleteLeaveMembersWithGuildIdHandler",
    )
    cy.visit(`/application/${guildExample.id}/settings`)
    cy.get("[data-cy=button-leave-guild-settings]").click()
    cy.wait("@deleteLeaveMembersWithGuildIdHandler").then(() => {
      cy.location("pathname").should("eq", "/application")
    })
  })

  it("should succeeds and delete the guild", () => {
    cy.task("startMockServer", [
      ...authenticationHandlers,
      getGuildMemberWithGuildIdHandler,
      deleteGuildWithGuildIdHandler,
    ]).setCookie("refreshToken", "refresh-token")
    cy.intercept(`${API_URL}${deleteGuildWithGuildIdHandler.url}*`).as(
      "deleteGuildWithGuildIdHandler",
    )
    cy.visit(`/application/${guildExample.id}/settings`)
    cy.get("[data-cy=button-delete-guild-settings]").click()
    cy.get("[data-cy=confirm-popup-yes-button]").click()
    cy.wait("@deleteGuildWithGuildIdHandler").then((interception) => {
      expect(interception.response).to.not.be.eql(undefined)
      if (interception.response !== undefined) {
        expect(interception.response.statusCode).to.eq(200)
      }
    })
  })

  it("should redirect the user to `/404` if `guildId` is not a number", () => {
    cy.task("startMockServer", authenticationHandlers).setCookie(
      "refreshToken",
      "refresh-token",
    )
    cy.visit("/application/abc/settings", {
      failOnStatusCode: false,
    })
      .get("[data-cy=status-code]")
      .contains("404")
  })

  it("should redirect the user to `/404` if `guildId` doesn't exist", () => {
    cy.task("startMockServer", [...authenticationHandlers]).setCookie(
      "refreshToken",
      "refresh-token",
    )
    cy.visit(`/application/123/settings`, {
      failOnStatusCode: false,
    })
      .get("[data-cy=status-code]")
      .contains("404")
  })
})

export {}
