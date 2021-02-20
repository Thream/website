import Router from 'next/router'

import { Language } from './authentication'

export const setLanguage = async (language: Language): Promise<boolean> => {
  return await Router.push(Router.pathname, Router.asPath, {
    locale: language
  })
}
