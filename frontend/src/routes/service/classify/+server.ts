// src/routes/api/classify/+server.ts
import { json } from '@sveltejs/kit';
import { OPENAI_API_KEY } from '$env/static/private';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export async function POST({ request }) {
  const body = await request.json();
  const { image, prompt } = body;

  if (!image || !prompt) {
    return json({ error: 'Missing image or prompt' }, { status: 400 });
  }

  // Parse the prompt JSON and inject image
  try {
    const parsed = typeof prompt === 'string' ? JSON.parse(prompt) : prompt;
    const userMsg = parsed.messages.find((msg: any) => msg.role === 'user');
    const imagePart = userMsg?.content?.find((p: any) => p.type === 'image_url');

    if (!imagePart) {
      return json({ error: 'Prompt missing image_url field' }, { status: 400 });
    }

    imagePart.image_url.url = image; // inject base64 image data URL

    const result = await openai.chat.completions.create({
      model: parsed.model,
      messages: parsed.messages,
      max_tokens: parsed.max_tokens ?? 500
    });

    return json({ text: result.choices[0].message.content });
  } catch (err) {
    console.error('OpenAI call error:', err);
    return json({ error: 'Failed to process prompt' }, { status: 500 });
  }
}
