import type { IFilterXSSOptions } from 'xss'
import { filterXSS as libFilterXSS } from 'xss'

export const filterXSS = (
  value: string,
  options: IFilterXSSOptions = {
    whiteList: {},
    stripIgnoreTag: true,
    stripIgnoreTagBody: true,
  },
) => {
  return libFilterXSS(value, options).replace(/\[removed\]/, '')
}
