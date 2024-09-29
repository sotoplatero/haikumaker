import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { writehaiku } from '@lib/openai';

export const server = {
  createHaiku: defineAction({
    accept: 'form',
    input: z.object({
      text: z.string(),
    }),

    handler: async (input) => {
        const poems = await writehaiku(input.text)
        return {poems}
    }
  })
}