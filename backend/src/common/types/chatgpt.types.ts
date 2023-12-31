import { db } from '#db/db.consts.js'

export namespace chatgpt {
  export namespace char {
    export interface BaseResult {
      id: string
      conversationId?: string
    }

    export interface Char {
      id?: string
      characterName: string | null
      alsoKnown: string[]
    }

    export interface Summary extends BaseResult {
      summary: string
      type: db.CharType
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
      strengths: string[]
    }

    export interface Weaknesses extends BaseResult {
      weaknesses: string[]
    }
  }
}
