
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
  console.log(content)

  return JSON.parse(content)
}

export const writehaiku = async ( text: string ) => {

    const system = 'You are a haiku poet with more than 20 years of experience. Your task is to write 5 haiku poems on the topic defined by the user. Strictly follow the rules of haiku poetry and create an artistically impressive work. Respond with a JSON array { poems: [ ] } without the code block, including the poems in plain text and using line breaks.'
    const user = text
    const {poems} =  await chat({ system, user })

    return poems
}

export const writePoem = async ( text: string ) => {

    const system = 'You are a haiku poet with more than 20 years of experience. Your task is to write a haiku poems on the topic defined by the user. Strictly follow the rules of haiku poetry and create an artistically impressive work. Respond the poems in plain text and using line breaks.'
    const user = text
    const {poems} =  await chat({ system, user })

    return poems
}