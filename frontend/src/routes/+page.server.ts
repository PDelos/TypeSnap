import { pb } from '$lib/pocketbase';
import type { Typography } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  try {
    const records = await pb.collection('typographies').getFullList<Typography>();
    // console.log('Fetched typographies:', records);
    
    return {
      typographies: records
    };
  } catch (error) {
    console.error('Error fetching typographies:', error);
    return {
      typographies: []
    };
  }
};