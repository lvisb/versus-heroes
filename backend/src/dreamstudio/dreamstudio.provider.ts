import { ConfigService } from '#config/config.service.js'
import axios from 'axios'

export const DreamStudioClient = 'DreamStudioClient'

export const DreamStudioClientProvider: any = {
  provide: DreamStudioClient,
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const client = axios.create({
      baseURL:
        'https://api.stability.ai/v1/generation/stable-diffusion-xl-beta-v2-2-2/text-to-image',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${configService.DREAMSTUDIO_API_KEY}`,
      },
    })

    return client
  },
}
