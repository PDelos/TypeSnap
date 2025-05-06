import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  // Code to run before response is generated
  const response = await resolve(event);
  // Code to run after response is generated
  return response;
};