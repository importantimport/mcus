# mcus

Material Color Utilities as a Service.

## Deploy

[![Deploy this example](https://deno.com/deno-deploy-button.svg)](https://dash.deno.com/new?url=https://raw.githubusercontent.com/importantimport/mcus/main/serve.ts)

## Run

```bash
deno run --allow-net https://raw.githubusercontent.com/importantimport/mcus/main/serve.ts
```

## Usage

```ts
/**
 * image - @see {@link https://github.com/importantimport/urara/raw/main/urara/hello-world/urara.webp}
 * customColors - [4278215579, 4288072703]
 */
await fetch(
  'https://mcus.deno.dev/json?image=https://github.com/importantimport/urara/raw/main/urara/hello-world/urara.webp&custom-colors=4278215579,4288072703'
).then((res) => res.json())
```

[View Result](https://mcus.deno.dev/json?params)

## Params

### image

Image URL.

### color

Source Color, this param has no effect when `image` exists.

### custom-colors

Custom Colors, split by comma.

## License

Copyright 2022 藍+85CD

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
