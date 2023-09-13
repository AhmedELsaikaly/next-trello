import { openai } from '@/openai';
import axios from 'axios';
import { NextResponse } from 'next/server';
import { ChatCompletion } from 'openai/resources/chat/index.mjs';
// async function sendChatMessage() {
//   try {
//     const response = await axios.post(
//       'https://api.openai.com/v1/chat/completions',
//       {
//         model: 'gpt-3.5-turbo',
//         messages: [
//           { role: 'system', content: 'You are a helpful assistant.' },
//           { role: 'user', content: "What's the weather like today?" },
//         ],
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//         },
//       }
//     );
//     return response.data.choices[0].message.content;

//   } catch (error: any) {
//     console.error(
//       'Error:',
//       error.response ? error.response.data : error.message
//     );
//   }
// }

export async function POST(request: Request) {
  // todos in the body of the bost request
  const { todos } = await request.json();
  // communicate with openAI GPT
  const response: ChatCompletion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: 'system',
        content: `When responding, welcome the user always as Mr.Ahmed and say welcome to the Trello Todo App ! limit he response to 2000 chracters`,
      },
      {
        role: 'user',
        content: `Hi there, provide a summary of the following todos. Count how many todos are un  each category such as To do, in progress and done, then tell the user to have a productive day! Here's the data: ${JSON.stringify(
          todos
        )}`,
      },
    ],
  });
  const { choices } = response;
  return NextResponse.json(choices[0].message);
}
