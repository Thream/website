import { postChannelsWithGuildIdHandler } from '../../../../../fixtures/guilds/[guildId]/channels/post'
import { API_URL } from '../../../../../../tools/api'
import { channelExample2 } from '../../../../../fixtures/channels/channel'
import { guildExample } from '../../../../../fixtures/guilds/guild'
import { getGuildMemberWithGuildIdHandler } from '../../../../../fixtures/guilds/[guildId]/get'
import { authenticationHandlers } from '../../../../../fixtures/handler'
import { getChannelWithChannelIdHandler2 } from '../../../../../fixtures/channels/[channelId]/get'

describe('Pages > /application/[guildId]/channels/create', () => {
  beforeEach(() => {
    cy.task('stopMockServer')
  })

  it('should succeeds and create the channel', () => {
    cy.task('startMockServer', [
      ...authenticationHandlers,
      getGuildMemberWithGuildIdHandler,
      postChannelsWithGuildIdHandler,
      getChannelWithChannelIdHandler2
    ]).setCookie('refreshToken', 'refresh-token')
    cy.intercept(`${API_URL}${postChannelsWithGuildIdHandler.url}*`).as(
      'postChannelsWithGuildIdHandler'
    )
    cy.visit(`/application/${guildExample.id}/channels/create`)
    cy.get('[data-cy=channel-name-input]').type(channelExample2.name)
    cy.get('[data-cy=button-create-channel]').click()
    cy.wait('@postChannelsWithGuildIdHandler').then(() => {
      cy.location('pathname').should(
        'eq',
        `/application/${guildExample.id}/${channelExample2.id}`
      )
    })
  })

  it('should fails with too long channel name on update', () => {
    cy.task('startMockServer', [
      ...authenticationHandlers,
      getGuildMemberWithGuildIdHandler
    ]).setCookie('refreshToken', 'refresh-token')
    cy.visit(`/application/${guildExample.id}/channels/create`)
    cy.get('[data-cy=channel-name-input]').type(
      'random channel name that is really too long for a channel name'
    )
    cy.get('[data-cy=button-create-channel]').click()
    cy.get('#error-name').should(
      'have.text',
      'Error: The field must contain at most 20 characters.'
    )
  })

  it('should redirect the user to `/404` if `guildId` is not a number', () => {
    cy.task('startMockServer', authenticationHandlers).setCookie(
      'refreshToken',
      'refresh-token'
    )
    cy.visit('/application/abc/channels/create', {
      failOnStatusCode: false
    })
      .get('[data-cy=status-code]')
      .contains('404')
  })

  it("should redirect the user to `/404` if `guildId` doesn't exist", () => {
    cy.task('startMockServer', [...authenticationHandlers]).setCookie(
      'refreshToken',
      'refresh-token'
    )
    cy.visit(`/application/123/channels/create`, {
      failOnStatusCode: false
    })
      .get('[data-cy=status-code]')
      .contains('404')
  })
})

export {}
