import { channelExample } from '../../../fixtures/channels/channel'
import { guildExample } from '../../../fixtures/guilds/guild'
import { userExample } from '../../../fixtures/users/user'
import { getGuildsHandler } from '../../../fixtures/guilds/get'
import { authenticationHandlers } from '../../../fixtures/handler'
import { getGuildMemberWithGuildIdHandler } from '../../../fixtures/guilds/[guildId]/get'
import { getChannelWithChannelIdHandler } from '../../../fixtures/channels/[channelId]/get'

const applicationPaths = [
  '/application',
  `/application/users/${userExample.id}`,
  '/application/guilds/create',
  '/application/guilds/join',
  `/application/${guildExample.id}/${channelExample.id}`
]

describe('Common > application/authentication', () => {
  beforeEach(() => {
    cy.task('stopMockServer')
  })

  it('should redirect the user to `/authentication/signin` if not signed in', () => {
    for (const applicationPath of applicationPaths) {
      cy.visit(applicationPath)
        .location('pathname')
        .should('eq', '/authentication/signin')
    }
  })

  it('should not redirect the user if signed in', () => {
    cy.task('startMockServer', [
      ...authenticationHandlers,
      getGuildsHandler,
      getGuildMemberWithGuildIdHandler,
      getChannelWithChannelIdHandler
    ]).setCookie('refreshToken', 'refresh-token')
    for (const applicationPath of applicationPaths) {
      cy.visit(applicationPath)
        .location('pathname')
        .should('eq', applicationPath)
    }
  })
})
