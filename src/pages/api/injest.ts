import { db, Poem } from 'astro:db';
import { categories } from '@lib/categories'
import {writehaiku} from '@lib/openai'

export async function GET() {

    let poemsArr = [];
    for (const [category, subcategories] of Object.entries(categories)) {
        for (const subcategory of subcategories) {
            try {
                
                // Generar 5 poemas para cada subcategoría
                const poems = await writehaiku(subcategory);
                if (poems && Array.isArray(poems)) {
                    const newPoems = poems.map(p => ({
                        category,
                        text: subcategory,
                        content: p
                    }));
                    // Agregar los nuevos poemas al arreglo total de poemas
                    poemsArr.push(...newPoems);
                }
            } catch (error) {
                console.error(`Error processing subcategory "${subcategory}" in category "${category}":`, error);
            }
        }
    }
    console.log(poemsArr)
    await db.insert(Poem).values(poemsArr);

    return new Response('ok');
}