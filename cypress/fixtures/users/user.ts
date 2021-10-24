import { UserSettings } from '../../../models/UserSettings'
import { UserPublic } from '../../../models/User'

export const user: UserPublic = {
  id: 1,
  name: 'Divlo',
  email: 'contact@divlo.fr',
  logo: undefined,
  status: undefined,
  biography: undefined,
  website: 'https://divlo.fr',
  isConfirmed: true,
  createdAt: '2021-10-20T20:30:51.595Z',
  updatedAt: '2021-10-20T20:59:08.485Z'
}

export const userSettings: UserSettings = {
  id: 1,
  language: 'en',
  theme: 'dark',
  isPublicEmail: false,
  isPublicGuilds: false,
  createdAt: '2021-10-20T20:30:51.605Z',
  updatedAt: '2021-10-22T07:22:07.956Z',
  userId: 1
}
