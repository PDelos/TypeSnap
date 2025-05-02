import { pb } from '$lib/pocketbase';

export type AuthProvider = 'google' | 'github' | 'microsoft' | 'facebook';

export async function loginWithProvider(provider: AuthProvider) {
  console.log(`Logging in with ${provider}...`);
  try {
    const authData = await pb.collection('users').authWithOAuth2({ provider });
    console.log('Authenticated:', authData);
    // Redirect to protected dashboard
    window.location.href = '/snap';
    return authData;
  } catch (error) {
    console.log('Authentication failed:', error);
    throw error;
  }
}