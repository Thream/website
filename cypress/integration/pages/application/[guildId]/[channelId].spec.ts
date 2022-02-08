import date from 'date-and-time'

import {
  channelExample,
  channelExample2
} from '../../../../fixtures/channels/channel'
import { guildExample } from '../../../../fixtures/guilds/guild'
import { getGuildMemberWithGuildIdHandler } from '../../../../fixtures/guilds/[guildId]/get'
import { getChannelWithChannelIdHandler } from '../../../../fixtures/channels/[channelId]/get'
import { authenticationHandlers } from '../../../../fixtures/handler'
import { getGuildsHandler } from '../../../../fixtures/guilds/get'
import { getChannelsWithGuildIdHandler } from '../../../../fixtures/guilds/[guildId]/channels/get'
import { getMessagesWithChannelIdHandler } from '../../../../fixtures/channels/[channelId]/messages/get'
import {
  messageExampleComplete,
  messageExampleComplete2
} from '../../../../fixtures/messages/message'
import { getMembersWithGuildIdHandler } from '../../../../fixtures/guilds/[guildId]/members/get'
import { memberExampleComplete } from '../../../../fixtures/members/member'
import { API_URL } from '../../../../../tools/api'
import {
  getMessagesUploadsAudioHandler,
  getMessagesUploadsDownloadHandler,
  getMessagesUploadsImageHandler,
  getMessagesUploadsVideoHandler
} from '../../../../fixtures/uploads/messages/get'

describe('Pages > /application/[guildId]/[channelId]', () => {
  beforeEach(() => {
    cy.task('stopMockServer')
  })

  it('should succeeds and display the guilds in left sidebar correctly', () => {
    cy.task('startMockServer', [
      ...authenticationHandlers,
      getGuildMemberWithGuildIdHandler,
      getChannelWithChannelIdHandler,
      getGuildsHandler
    ]).setCookie('refreshToken', 'refresh-token')
    cy.intercept(`${API_URL}${getGuildsHandler.url}*`).as('getGuildsHandler')
    cy.intercept(`/_next/*`).as('nextStaticAndImages')
    cy.visit(`/application/${guildExample.id}/${channelExample.id}`)
    cy.wait(['@getGuildsHandler', '@nextStaticAndImages']).then(() => {
      cy.get('[data-cy=application-title]').should(
        'have.text',
        `# ${channelExample.name}`
      )
      cy.get('[data-cy=guild-left-sidebar-title]').should(
        'have.text',
        guildExample.name
      )
      cy.get('.guilds-list').children().should('have.length', 2)
    })
  })

  it('should succeeds and display the channels in left sidebar correctly', () => {
    cy.task('startMockServer', [
      ...authenticationHandlers,
      getGuildMemberWithGuildIdHandler,
      getChannelWithChannelIdHandler,
      getChannelsWithGuildIdHandler
    ]).setCookie('refreshToken', 'refresh-token')
    cy.intercept(`${API_URL}${getChannelsWithGuildIdHandler.url}*`).as(
      'getChannelsWithGuildIdHandler'
    )
    cy.intercept(`/_next/*`).as('nextStaticAndImages')
    cy.visit(`/application/${guildExample.id}/${channelExample.id}`)
    cy.wait(['@getChannelsWithGuildIdHandler', '@nextStaticAndImages']).then(
      () => {
        cy.get('.channels-list').children().should('have.length', 2)
        cy.get('.channels-list [data-cy=channel-name]:first').should(
          'have.text',
          `# ${channelExample.name}`
        )
        cy.get('.channels-list [data-cy=channel-name]:last').should(
          'have.text',
          `# ${channelExample2.name}`
        )
      }
    )
  })

  it('should succeeds and display the messages correctly', () => {
    cy.task('startMockServer', [
      ...authenticationHandlers,
      getGuildMemberWithGuildIdHandler,
      getChannelWithChannelIdHandler,
      getMessagesWithChannelIdHandler,
      getMessagesUploadsImageHandler,
      getMessagesUploadsAudioHandler,
      getMessagesUploadsVideoHandler,
      getMessagesUploadsDownloadHandler
    ]).setCookie('refreshToken', 'refresh-token')
    cy.intercept(`${API_URL}${getMessagesWithChannelIdHandler.url}*`).as(
      'getMessagesWithChannelIdHandler'
    )
    cy.intercept(`${API_URL}${getMessagesUploadsImageHandler.url}`).as(
      'getMessagesUploadsImageHandler'
    )
    cy.intercept(`${API_URL}${getMessagesUploadsAudioHandler.url}`).as(
      'getMessagesUploadsAudioHandler'
    )
    cy.intercept(`${API_URL}${getMessagesUploadsVideoHandler.url}`).as(
      'getMessagesUploadsVideoHandler'
    )
    cy.intercept(`${API_URL}${getMessagesUploadsDownloadHandler.url}`).as(
      'getMessagesUploadsDownloadHandler'
    )
    cy.intercept(`/_next/*`).as('nextStaticAndImages')
    cy.visit(`/application/${guildExample.id}/${channelExample.id}`)
    cy.wait([
      '@getMessagesWithChannelIdHandler',
      '@nextStaticAndImages',
      '@getMessagesUploadsImageHandler',
      '@getMessagesUploadsAudioHandler',
      '@getMessagesUploadsVideoHandler',
      '@getMessagesUploadsDownloadHandler'
    ]).then(() => {
      cy.get('.messages-list').children().should('have.length', 9)
      cy.get('[data-cy=message-1] p').should(
        'have.text',
        messageExampleComplete.value
      )
      cy.get('[data-cy=message-1] [data-cy=message-member-user-name]').should(
        'have.text',
        messageExampleComplete.member.user.name
      )
      cy.get('[data-cy=message-1] [data-cy=message-date]').should(
        'have.text',
        date.format(
          new Date(messageExampleComplete.createdAt),
          'DD/MM/YYYY - HH:mm:ss'
        )
      )
      cy.get('[data-cy=message-2] p').should(
        'have.text',
        messageExampleComplete2.value
      )
      cy.get('[data-cy=message-3] p').should(
        'have.text',
        'Message with bold text and italic text.\nNewlines and some emoji: '
      )
      cy.get('[data-cy=message-3] strong').should('have.text', 'bold text')
      cy.get('[data-cy=message-3] em').should('have.text', 'italic text')
      cy.get('[data-cy=message-3] span[title=smile]').should('exist')
      cy.get('[data-cy=message-3] span[title=smile]').should(
        'have.css',
        'width',
        '20px'
      )
      cy.get('[data-cy=message-3] span[title=smile]').should(
        'have.css',
        'height',
        '20px'
      )
      cy.get('[data-cy=message-4] p:first').should(
        'have.text',
        'The Quadratic Formula:'
      )
      cy.get('[data-cy=message-4] .math').should('have.length', 3)
      cy.get('[data-cy=message-5] span[title=wave]').should('exist')
      cy.get('[data-cy=message-5] span[title=wave]').should(
        'have.css',
        'width',
        '40px'
      )
      cy.get('[data-cy=message-5] span[title=wave]').should(
        'have.css',
        'height',
        '40px'
      )
      cy.get('[data-cy=message-file-image-6]').should('exist')
      cy.get('[data-cy=message-file-audio-7]').should('exist')
      cy.get('[data-cy=message-file-video-8]').should('exist')
      cy.get('[data-cy=message-file-download-9]').should('exist')
    })
  })

  it('should succeeds and display the members in right sidebar correctly', () => {
    cy.task('startMockServer', [
      ...authenticationHandlers,
      getGuildMemberWithGuildIdHandler,
      getChannelWithChannelIdHandler,
      getMembersWithGuildIdHandler
    ]).setCookie('refreshToken', 'refresh-token')
    cy.intercept(`${API_URL}${getMembersWithGuildIdHandler.url}*`).as(
      'getMembersWithGuildIdHandler'
    )
    cy.intercept(`/_next/*`).as('nextStaticAndImages')
    cy.visit(`/application/${guildExample.id}/${channelExample.id}`)
    cy.wait(['@getMembersWithGuildIdHandler', '@nextStaticAndImages']).then(
      () => {
        cy.get('.members-list').should('not.be.visible')
        cy.get('[data-cy=icon-button-right-sidebar-members]').click()
        cy.get('.members-list').should('be.visible')
        cy.get('[data-cy=members-title]').should('have.text', 'Member(s)')
        cy.get('.members-list').children().should('have.length', 1)
        cy.get('.members-list [data-cy=member-user-name]:first').should(
          'have.text',
          memberExampleComplete.user.name
        )
      }
    )
  })

  it('should redirect the user to `/404` if `guildId` or `channelId` are not numbers', () => {
    cy.task('startMockServer', authenticationHandlers).setCookie(
      'refreshToken',
      'refresh-token'
    )
    cy.visit('/application/abc/abc').location('pathname').should('eq', '/404')
  })

  it("should redirect the user to `/404` if `guildId` doesn't exist", () => {
    cy.task('startMockServer', [
      ...authenticationHandlers,
      getChannelWithChannelIdHandler
    ]).setCookie('refreshToken', 'refresh-token')
    cy.visit(`/application/123/${channelExample.id}`, {
      failOnStatusCode: false
    })
      .location('pathname')
      .should('eq', '/404')
  })

  it("should redirect the user to `/404` if `channelId` doesn't exist", () => {
    cy.task('startMockServer', [
      ...authenticationHandlers,
      getGuildMemberWithGuildIdHandler
    ]).setCookie('refreshToken', 'refresh-token')
    cy.visit(`/application/${guildExample.id}/123`, { failOnStatusCode: false })
      .location('pathname')
      .should('eq', '/404')
  })
})
