import { Transform } from 'class-transformer'
import { filterXSS } from '../utils/filter-xss.util.js'

export const FilterXSS = () => Transform(({ value }) => filterXSS(value))
