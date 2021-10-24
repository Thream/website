interface DividerProps {
  content: string
}

export const Divider: React.FC<DividerProps> = (props) => {
  const { content } = props

  return (
    <>
      <div className='text-divider'>{content}</div>

      <style jsx>
        {`
          .text-divider {
            --text-divider-gap: 1rem;
            --color-divider: #414141;
            display: flex;
            align-items: center;
            letter-spacing: 0.1em;
            &::before,
            &::after {
              content: '';
              height: 1px;
              background-color: var(--color-divider);
              flex-grow: 1;
            }
            &::before {
              margin-right: var(--text-divider-gap);
            }
            &::after {
              margin-left: var(--text-divider-gap);
            }
          }
        `}
      </style>
    </>
  )
}
