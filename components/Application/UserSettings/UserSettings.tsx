import classNames from 'classnames'

export interface UserSettingsProps {
  className?: string
}

export const UserSettings: React.FC<UserSettingsProps> = (props) => {
  const { children, className } = props

  return <main className={classNames(className, '')}>{children}</main>
}
