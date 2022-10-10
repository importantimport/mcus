import { serve } from 'https://deno.land/std@0.159.0/http/server.ts'
import { handler } from './handler.ts'

await serve(handler)
