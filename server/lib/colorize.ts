import { cyan } from 'colorette'

export const prettyLog = (flag: string, message: string) => {
  console.log(cyan(flag), '', message)
}
