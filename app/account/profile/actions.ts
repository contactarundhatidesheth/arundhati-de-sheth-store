'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateProfile(formData: FormData) {
  const supabase = createClient();
  
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const countryCode = formData.get('countryCode') as string;
  const phoneNumber = formData.get('phone') as string;
  const phone = phoneNumber ? `${countryCode} ${phoneNumber}` : '';
  const birthday = formData.get('birthday') as string;
  const ringSize = formData.get('ringSize') as string;

  const shipping_address = {
    line1: formData.get('addressLine1') as string,
    line2: formData.get('addressLine2') as string,
    landmark: formData.get('landmark') as string,
    city: formData.get('city') as string,
    state: formData.get('state') as string,
    postalCode: formData.get('postalCode') as string,
    country: formData.get('country') as string,
  };

  const { error } = await supabase.auth.updateUser({
    data: {
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      shipping_address: shipping_address,
      birthday: birthday,
      ring_size: ringSize,
    }
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/account');
  redirect('/account');
}
