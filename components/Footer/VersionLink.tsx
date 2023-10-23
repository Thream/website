export interface VersionLinkProps {
  version: string
  repository: "website" | "api"
}

export const VersionLink: React.FC<VersionLinkProps> = (props) => {
  const { version, repository } = props

  return (
    <a
      data-cy={`version-link-${repository}`}
      className="text-green-800 hover:underline dark:text-green-400"
      href={`https://github.com/Thream/${repository}/releases/tag/v${version}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {repository} v{version}
    </a>
  )
}
