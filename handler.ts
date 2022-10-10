import {
  type Theme,
  QuantizerCelebi,
  Score,
  argbFromRgb,
  themeFromSourceColor,
} from 'https://esm.sh/@importantimport/material-color-utilities@0.2.0'
import {
  createCanvas,
  loadImage,
} from 'https://deno.land/x/canvas@v1.4.1/mod.ts'

export const handler = async (request: Request): Promise<Response> => {
  const { pathname, searchParams } = new URL(request.url)

  let sourceColor: number

  if (searchParams.get('image')) {
    /**
     * @license
     * Copyright 2021 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    const imageBytes = await new Promise<Uint8ClampedArray>(
      async (resolve, reject) => {
        const image = await loadImage(searchParams.get('image'))
        const canvas = createCanvas(image.width(), image.height())
        const context = canvas.getContext('2d')
        if (!context) return reject(new Error('Could not get canvas context'))
        context.drawImage(image, 0, 0)
        resolve(context.getImageData(0, 0, image.width(), image.height()).data)
      }
    )

    const pixels: number[] = []
    for (let i = 0; i < imageBytes.length; i += 4) {
      const r = imageBytes[i]
      const g = imageBytes[i + 1]
      const b = imageBytes[i + 2]
      const a = imageBytes[i + 3]
      if (a < 255) continue
      const argb = argbFromRgb(r, g, b)
      pixels.push(argb)
    }

    const result = QuantizerCelebi.quantize(pixels, 128)
    const ranked = Score.score(result)
    const top: number = ranked[0]

    sourceColor = top
  } else if (searchParams.get('color')) {
    sourceColor = parseInt(searchParams.get('color'))
  } else return new Response('TODO: Usage', { status: 400 })

  const theme = themeFromSourceColor(
    sourceColor,
    searchParams.get('custom-colors')
      ? searchParams.get('custom-colors').split(',')
      : []
  )

  if (pathname.includes('json')) {
    return new Response(JSON.stringify(theme), {
      headers: {
        'content-type': 'application/json; charset=utf-8',
      },
    })
  } else if (pathname.includes('css')) {
    return new Response('TODO: CSS Service', { status: 404 })
  } else return new Response('TODO: Usage', { status: 400 })
}
