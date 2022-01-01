import { UserSettings } from '../../../models/UserSettings'
import { User } from '../../../models/User'

export const userExample: User = {
  id: 1,
  name: 'Divlo',
  email: 'contact@divlo.fr',
  password: 'somepassword',
  logo: null,
  status: null,
  biography: null,
  website: 'https://divlo.fr',
  isConfirmed: true,
  temporaryToken: 'temporaryUUIDtoken',
  temporaryExpirationToken: '2021-10-20T20:59:08.485Z',
  createdAt: '2021-10-20T20:30:51.595Z',
  updatedAt: '2021-10-20T20:59:08.485Z'
}

export const userSettingsExample: UserSettings = {
  id: 1,
  language: 'en',
  theme: 'dark',
  isPublicEmail: false,
  isPublicGuilds: false,
  createdAt: '2021-10-20T20:30:51.605Z',
  updatedAt: '2021-10-22T07:22:07.956Z',
  userId: 1
}
