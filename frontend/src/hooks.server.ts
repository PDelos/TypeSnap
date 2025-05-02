// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';
import { pb } from '$lib/pocketbase';

export const handle: Handle = async ({ event, resolve }) => {
  pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

  try {
    if (pb.authStore.isValid) {
      await pb.collection('users').authRefresh();
      event.locals.user = structuredClone(pb.authStore.record);
    }
  } catch (_) {
    pb.authStore.clear();
  }

  event.locals.pb = pb;

  const response = await resolve(event);
  response.headers.set('set-cookie', pb.authStore.exportToCookie({ secure: false }));
  return response;
};
