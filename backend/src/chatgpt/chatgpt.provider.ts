import { ConfigService } from '#config/config.service.js'
import { ChatGPTAPI } from 'chatgpt'

export const ChatGptClient = 'ChatGptClient'

export const ChatGptClientProvider: any = {
  provide: ChatGptClient,
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<any> => {
    const client = new ChatGPTAPI({
      apiKey: configService.OPENAI_API_KEY,
      debug: false,
      systemMessage: `The user will provide the name of a character, which can be a hero or villain, from movies, games, or comics. The user can provide the character's name in any language, but translate it to English and use the English version throughout. Refuse to talk about characters who are not some kind of hero, good guy, villain, or bad guys, but, if is about appearance, you can talk. Don't include any explanations in your responses.`,
    })

    return client
  },
}
