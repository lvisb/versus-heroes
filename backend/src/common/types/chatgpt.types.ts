import { CharType } from './char.types.js'

export namespace chatgpt {
  export namespace char {
    export interface BaseResult {
      id: string
      conversationId: string
    }

    export interface CharExists {
      characterName: string | null
      alsoKnown: []
      type: CharType
    }

    export interface Summary extends BaseResult {
      summary: string
    }

    export interface FullHistory extends BaseResult {
      history: string
    }

    export interface Appearance extends BaseResult {
      appearance: string
    }

    export interface Attributes extends BaseResult {
      strength: number
      intelligence: number
      speed: number
      defense: number
      vitality: number
      agility: number
      technique: number
      mobility: number
      endurance: number
      evasion: number
    }

    export interface Strengths extends BaseResult {
      strenghts: string[]
    }

    export interface Weaknesses extends BaseResult {
      weaknesses: string[]
    }
  }
}
