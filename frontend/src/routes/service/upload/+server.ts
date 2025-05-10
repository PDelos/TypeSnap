import { json } from '@sveltejs/kit';
import { pb } from '$lib/pocketbase';

// Upload endpoint using PocketBase
export async function POST({ request }) {
  try {
    // Get the form data with the file
    const formData = await request.formData();
    
    // Check if we have a file
    const imageFile = formData.get('image');
    if (!imageFile) {
      return json({ error: 'No image provided' }, { status: 400 });
    }
    
    // Create a new FormData instance for PocketBase
    const pbFormData = new FormData();
    pbFormData.append('image', imageFile);
    pbFormData.append('created', new Date().toISOString());
    
    // Create a record in the 'tempImages' collection
    // You must have created this collection in PocketBase with an 'image' field of type File
    const record = await pb.collection('photos').create(pbFormData);
    
    // Get the URL for the uploaded file
    const imageUrl = pb.files.getURL(record, record.image);
    
    return json({ 
      success: true, 
      imageUrl: imageUrl,
      recordId: record.id
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    return json({ 
      error: 'Upload failed', 
      details: error.message 
    }, { status: 500 });
  }
}