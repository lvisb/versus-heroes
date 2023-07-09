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
      systemMessage: `The user will provide the name of a character, which can be a hero or villain, from movies, games, or comics. You should summarize the character's story, focusing on their personality, abilities, accomplishments, or any other notable aspects. Summarize the story as a chronicle with an omniscient narrator. Refuse to talk about characters who are not some kind of superhero or villain.`,
    })

    return client
  },
}
