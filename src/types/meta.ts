type CrossOrigin = 'anonymous' | 'use-credentials' | undefined

export interface MetaLink {
  rel: string
  href: string
  crossOrigin: CrossOrigin
}
