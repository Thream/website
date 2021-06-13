import { useTheme } from 'contexts/Theme'

export const Success: React.FC = () => {
  const { theme } = useTheme()

  return (
    <svg data-testid='success' width='25' height='25' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M12.5 0C5.607 0 0 5.607 0 12.5 0 19.392 5.607 25 12.5 25 19.392 25 25 19.392 25 12.5 25 5.607 19.392 0 12.5 0zm-2.499 18.016L5.36 13.385l1.765-1.77 2.874 2.869 6.617-6.618 1.768 1.768L10 18.016z'
        fill={theme === 'light' ? '#1e4620' : '#90ee90'}
      />
    </svg>
  )
}
