import { deleteChannelWithChannelIdHandler } from "../../../../../fixtures/channels/[channelId]/delete"
import { putChannelWithChannelIdHandler } from "../../../../../fixtures/channels/[channelId]/put"
import {
  channelExample,
  channelExample2,
} from "../../../../../fixtures/channels/channel"
import { guildExample } from "../../../../../fixtures/guilds/guild"
import {
  getGuildMemberNotOwnerWithGuildIdHandler,
  getGuildMemberWithGuildIdHandler,
} from "../../../../../fixtures/guilds/[guildId]/get"
import {
  getChannelWithChannelIdHandler,
  getChannelWithChannelIdHandler2,
} from "../../../../../fixtures/channels/[channelId]/get"
import { authenticationHandlers } from "../../../../../fixtures/handler"
import { API_URL } from "../../../../../../tools/api"

describe("Pages > /application/[guildId]/[channelId]/settings", () => {
  beforeEach(() => {
    cy.task("stopMockServer")
  })

  it("should succeeds and update the channel name", () => {
    cy.task("startMockServer", [
      ...authenticationHandlers,
      getGuildMemberWithGuildIdHandler,
      getChannelWithChannelIdHandler,
      putChannelWithChannelIdHandler,
    ]).setCookie("refreshToken", "refresh-token")
    cy.intercept(`${API_URL}${putChannelWithChannelIdHandler.url}*`).as(
      "putChannelWithChannelIdHandler",
    )
    cy.visit(`/application/${guildExample.id}/${channelExample.id}/settings`)
    cy.get("[data-cy=channel-name-input]")
      .clear()
      .type(putChannelWithChannelIdHandler.response.body.name)
    cy.get("[data-cy=button-save-channel-settings]").click()
    cy.wait("@putChannelWithChannelIdHandler").then(() => {
      cy.location("pathname").should(
        "eq",
        `/application/${guildExample.id}/${channelExample.id}`,
      )
    })
  })

  it("should succeeds and delete the channel", () => {
    cy.task("startMockServer", [
      ...authenticationHandlers,
      getGuildMemberWithGuildIdHandler,
      getChannelWithChannelIdHandler,
      getChannelWithChannelIdHandler2,
      deleteChannelWithChannelIdHandler,
    ]).setCookie("refreshToken", "refresh-token")
    cy.intercept(`${API_URL}${deleteChannelWithChannelIdHandler.url}*`).as(
      "deleteChannelWithChannelIdHandler",
    )
    cy.visit(`/application/${guildExample.id}/${channelExample.id}/settings`)
    cy.get("[data-cy=button-delete-channel-settings]").click()
    cy.get("[data-cy=confirm-popup-yes-button]").click()
    cy.wait("@deleteChannelWithChannelIdHandler").then(() => {
      cy.location("pathname").should(
        "eq",
        `/application/${guildExample.id}/${channelExample2.id}`,
      )
    })
  })

  it("should fails with too long channel name on update", () => {
    cy.task("startMockServer", [
      ...authenticationHandlers,
      getGuildMemberWithGuildIdHandler,
      getChannelWithChannelIdHandler,
    ]).setCookie("refreshToken", "refresh-token")
    cy.visit(`/application/${guildExample.id}/${channelExample.id}/settings`)
    cy.get("[data-cy=channel-name-input]").type(
      "random channel name that is really too long for a channel name",
    )
    cy.get("[data-cy=button-save-channel-settings]").click()
    cy.get("#error-name").should(
      "have.text",
      "Error: The field must contain at most 20 characters.",
    )
  })

  it("should redirect the user to `/404` if member is not owner", () => {
    cy.task("startMockServer", [
      ...authenticationHandlers,
      getGuildMemberNotOwnerWithGuildIdHandler,
      getChannelWithChannelIdHandler,
    ]).setCookie("refreshToken", "refresh-token")
    cy.visit(`/application/${guildExample.id}/${channelExample.id}/settings`, {
      failOnStatusCode: false,
    })
      .get("[data-cy=status-code]")
      .contains("404")
  })

  it("should redirect the user to `/404` if `guildId` or `channelId` are not numbers", () => {
    cy.task("startMockServer", authenticationHandlers).setCookie(
      "refreshToken",
      "refresh-token",
    )
    cy.visit("/application/abc/abc/settings", {
      failOnStatusCode: false,
    })
      .get("[data-cy=status-code]")
      .contains("404")
  })

  it("should redirect the user to `/404` if `guildId` doesn't exist", () => {
    cy.task("startMockServer", [
      ...authenticationHandlers,
      getChannelWithChannelIdHandler,
    ]).setCookie("refreshToken", "refresh-token")
    cy.visit(`/application/123/${channelExample.id}/settings`, {
      failOnStatusCode: false,
    })
      .get("[data-cy=status-code]")
      .contains("404")
  })

  it("should redirect the user to `/404` if `channelId` doesn't exist", () => {
    cy.task("startMockServer", [
      ...authenticationHandlers,
      getGuildMemberWithGuildIdHandler,
    ]).setCookie("refreshToken", "refresh-token")
    cy.visit(`/application/${guildExample.id}/123/settings`, {
      failOnStatusCode: false,
    })
      .get("[data-cy=status-code]")
      .contains("404")
  })
})

export {}
