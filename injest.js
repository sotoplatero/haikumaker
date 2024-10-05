import OpenAI from "openai";
import { categories } from './src/lib/categories.js';
import { createClient } from "@libsql/client";

const turso = createClient({
  url: process.env.ASTRO_DB_REMOTE_URL,
  authToken: process.env.ASTRO_DB_APP_TOKEN,
});

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Asegúrate de tener esta variable de entorno configurada
});

// Función para crear un poema
async function createPoem() {
    try {
        // Obtener el texto y la categoría aleatoria
        const { text, category } = getText();

        const system = 'You are a haiku poet with more than 20 years of experience. Your task is to write a haiku poems on the topic defined by the user. Strictly follow the rules of haiku poetry and create an artistically impressive work. Respond the poems in plain text and using line breaks.'    

        const completion = await openai.chat.completions.create({
            messages: [
                {"role": "system", "content": system},
                {"role": "user", "content": text }
            ],
            model: "gpt-4o-mini",
          });
        
        const content = completion.choices[0].message.content ?? ''
        console.log(content)

        await turso.execute({
            sql: 'INSERT INTO poem (text, content, category) VALUES (?, ?, ?)',
            args: [text, content, category]
        });

    } catch (error) {
        console.error('Error creating poem:', error);
    }
}

// Función para obtener un texto y su categoría aleatoria
function getText() {

    const keys = Object.keys(categories);
    const randomCategoryKey = keys[Math.floor(Math.random() * keys.length)];
    
    const subcategories = categories[randomCategoryKey];
    const randomSubcategory = subcategories[Math.floor(Math.random() * subcategories.length)];

    return {
        category: randomCategoryKey,
        text: randomSubcategory
    };
}

createPoem();
