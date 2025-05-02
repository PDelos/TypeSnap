// src/routes/auth/logout/+page.server.ts
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
  locals.pb.authStore.clear();
  throw redirect(303, '/');
};
