import UniversalCookie from 'universal-cookie'

export class Cookies {
  /** how long in seconds, until the cookie expires (10 years) */
  static readonly COOKIE_MAX_AGE = 10 * 365.25 * 24 * 60 * 60

  public universalCookie: UniversalCookie

  constructor (cookies?: string | object | null) {
    this.universalCookie = new UniversalCookie(cookies)
  }

  set (name: string, value: string): void {
    this.universalCookie.set(name, value, {
      path: '/',
      maxAge: Cookies.COOKIE_MAX_AGE
    })
  }

  remove (name: string): void {
    this.universalCookie.remove(name, { path: '/' })
  }

  get (name: string): string {
    return this.universalCookie.get(name)
  }
}

export const cookies = new Cookies()
