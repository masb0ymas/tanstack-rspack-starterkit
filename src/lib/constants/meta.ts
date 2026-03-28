import { env } from '~/env'
import type { MetaLink } from '~/types/meta'

import { ASSETS } from './assets'

const SITE_NAME = env.PUBLIC_APP_NAME

export const META_URL = 'https://yourdomain.com'
export const META_TITLE = `${SITE_NAME} - Your App Description`
export const META_DESCRIPTION = `${SITE_NAME} is your app description`
export const META_IMAGE = ASSETS.META_THUMBNAIL
export const META_KEYWORDS = `your app keywords`

export const META_DATA = [
  {
    charSet: 'utf-8',
  },
  {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1',
  },
  {
    title: META_TITLE,
  },
  {
    name: 'description',
    content: META_DESCRIPTION,
  },
  {
    name: 'keywords',
    content: META_KEYWORDS,
  },
  {
    rel: 'canonical',
    href: META_URL,
  },
]

export const META_ICONS = [
  {
    rel: 'shortcut icon',
    sizes: '16x16 24x24 32x32 48x48 64x64',
    href: '/favicon/favicon.ico',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '57x57',
    href: '/favicon/apple-touch-icon.png',
  },
  {
    rel: 'apple-touch-icon-precomposed',
    sizes: '57x57',
    href: '/favicon/apple-touch-icon.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '72x72',
    href: '/favicon/apple-touch-icon.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '114x114',
    href: '/favicon/apple-touch-icon.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '120x120',
    href: '/favicon/apple-touch-icon.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '144x144',
    href: '/favicon/apple-touch-icon.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '152x152',
    href: '/favicon/apple-touch-icon.png',
  },
]

export const META_CONTENT = [
  {
    name: 'theme-color',
    content: '#ea580c',
  },
  {
    name: 'application-name',
    content: META_TITLE,
  },
  {
    name: 'msapplication-TileImage',
    content: '/favicon/apple-touch-icon.png',
  },
  {
    name: 'msapplication-TileColor',
    content: '#ea580c',
  },
  {
    name: 'apple-mobile-web-app-capable',
    content: 'yes',
  },
  {
    name: 'apple-mobile-web-app-status-bar-style',
    content: 'black-translucent',
  },
]

export const GOOGLE_FONTS: MetaLink[] = [
  {
    rel: 'preconnect',
    href: 'https://fonts.googleapis.com',
    crossOrigin: undefined,
  },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Faculty+Glyphic&display=swap&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap',
    crossOrigin: undefined,
  },
]

export const OPEN_GRAPH_META = [
  {
    name: 'og:title',
    content: META_TITLE,
  },
  {
    name: 'og:description',
    content: META_DESCRIPTION,
  },
  {
    name: 'og:type',
    content: 'website',
  },
  {
    name: 'og:url',
    content: META_URL,
  },
  {
    name: 'og:site_name',
    content: SITE_NAME,
  },
  {
    name: 'og:locale',
    content: 'id_ID',
  },
  {
    name: 'og:image',
    content: META_IMAGE,
  },
]

export const TWITTER_META = [
  {
    name: 'twitter:card',
    content: 'summary_large_image',
  },
  {
    name: 'twitter:title',
    content: META_TITLE,
  },
  {
    name: 'twitter:description',
    content: META_DESCRIPTION,
  },
  {
    name: 'twitter:url',
    content: META_URL,
  },
  {
    name: 'twitter:image',
    content: META_IMAGE,
  },
]

export const META_TAGS = [...META_DATA, ...META_CONTENT, ...OPEN_GRAPH_META, ...TWITTER_META]
