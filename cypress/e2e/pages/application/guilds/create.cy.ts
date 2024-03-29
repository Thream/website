import { getChannelWithChannelIdHandler } from "../../../../fixtures/channels/[channelId]/get"
import { getGuildsHandler } from "../../../../fixtures/guilds/get"
import { getGuildMemberWithGuildIdHandler } from "../../../../fixtures/guilds/[guildId]/get"
import { channelExample } from "../../../../fixtures/channels/channel"
import { guildExample } from "../../../../fixtures/guilds/guild"
import { postGuildsHandler } from "../../../../fixtures/guilds/post"
import { authenticationHandlers } from "../../../../fixtures/handler"

describe("Pages > /application/guilds/create", () => {
  beforeEach(() => {
    cy.task("stopMockServer")
  })

  it("should succeeds and create the guild", () => {
    cy.task("startMockServer", [
      ...authenticationHandlers,
      postGuildsHandler,
      getGuildsHandler,
      getGuildMemberWithGuildIdHandler,
      getChannelWithChannelIdHandler,
    ]).setCookie("refreshToken", "refresh-token")
    cy.visit("/application/guilds/create")
    cy.get("[data-cy=application-title]").should("have.text", "Create a Guild")
    cy.get("#error-name").should("not.exist")
    cy.get("[data-cy=input-name]").type(guildExample.name)
    cy.get("[data-cy=submit]").click()
    cy.location("pathname").should(
      "eq",
      `/application/${guildExample.id}/${channelExample.id}`,
    )
  })

  it("should fails with internal api server error", () => {
    cy.task("startMockServer", [...authenticationHandlers]).setCookie(
      "refreshToken",
      "refresh-token",
    )
    cy.visit("/application/guilds/create")
    cy.get("#error-name").should("not.exist")
    cy.get("[data-cy=input-name]").type(guildExample.name)
    cy.get("[data-cy=submit]").click()
    cy.get("#message").should("have.text", "Error: Internal Server Error.")
  })
})

export {}
