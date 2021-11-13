export const guild = {
  id: 1,
  name: 'GuildExample',
  description: 'guild example.',
  icon: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

export const guild2 = {
  ...guild,
  name: 'app'
}
