
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: import.meta.env.OPENAI_API_KEY, // Asegúrate de tener esta variable de entorno configurada
});

export const chat = async ( prompts: {system: string, user:string } ) => {

  const {user, system} = prompts
  
  const completion = await openai.chat.completions.create({
    messages: [
        {"role": "system", "content": system},
        {"role": "user", "content": user }
    ],
    model: "gpt-4o-mini",
  });

  const content = completion.choices[0].message.content ?? ''

  return JSON.parse(content)
}

export const writehaiku = async ( text: string ) => {

  const system = 'Eres un poeta de poemas haiku con mas de 20 años de experiencia. Tu tarea es escribir 5 poemas haiku, cumple estrictamente las reglas para un poema haiku y crea una obra artisticamente impresionante sobre el tema definido por el usuario. Responde un arreglo JSON { poems: [ ]} sin el bloque de codigo con los poemas en texto plano.'
  const user = text
  const {poems} =  await chat({ system, user })

  console.log(poems)

  return poems
}