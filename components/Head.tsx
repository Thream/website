import NextHead from "next/head"
import useTranslation from "next-translate/useTranslation"

interface HeadProps {
  title?: string
  image?: string
  description?: string
  url?: string
}

export const Head: React.FC<HeadProps> = (props) => {
  const { t } = useTranslation()

  const {
    title = "Thream",
    image = "https://thream.theoludwig.fr/images/icon-128x128.png",
    description = t("common:description"),
    url = "https://thream.theoludwig.fr/",
  } = props

  return (
    <NextHead>
      <title>{title}</title>
      <link rel="icon" type="image/png" href={image} />

      {/* Meta Tag */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta name="Language" content="fr-FR, en-US" />
      <meta name="theme-color" content="#27B05E" />

      {/* Open Graph Metadata */}
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content="fr-FR, en-US" />
      <meta property="og:site_name" content={title} />

      {/* Twitter card Metadata */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:image" content={image} />
    </NextHead>
  )
}
