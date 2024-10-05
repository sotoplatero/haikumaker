import { defineDb, defineTable, column } from 'astro:db';

const Poem = defineTable({
  columns: {
    text: column.text(),
    content: column.text(),
    category: column.text(),
  }
})

export default defineDb({
  tables: { Poem },
})