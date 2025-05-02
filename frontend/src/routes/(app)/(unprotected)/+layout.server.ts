import { pb } from '$lib/pocketbase';
import type { Typography } from '$lib/types';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
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