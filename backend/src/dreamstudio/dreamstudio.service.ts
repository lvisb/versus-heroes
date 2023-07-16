import { Inject, Injectable } from '@nestjs/common'
import { DreamStudioClient } from './dreamstudio.provider.js'
import { Axios, AxiosResponse } from 'axios'
import { responseMock } from './mock/response.mock.js'

export type DreamStudioResponseArtifact = {
  base64: string
  seed: number
  finishReason: 'CONTENT_FILTERED' | 'ERROR' | 'SUCCESS'
}

export type DreamStudioResponse = {
  artifacts: DreamStudioResponseArtifact[]
}

@Injectable()
export class DreamStudioService {
  constructor(
    @Inject(DreamStudioClient)
    private readonly client: Axios,
  ) {}

  async generateCharacterImage(
    prompt: string,
  ): Promise<DreamStudioResponseArtifact> {
    // return Promise.resolve(responseMock.artifacts[0])

    try {
      const { data } = await this.client.post<DreamStudioResponse>('', {
        samples: 1,
        steps: 70,
        style_present: 'isometric',
        text_prompts: [{ text: prompt }],
      })

      return data.artifacts[0]
    } catch (error) {
      console.error(`[DreamStudioService generateCharacterImage] ERROR:`, error)

      return null
    }
  }
}
