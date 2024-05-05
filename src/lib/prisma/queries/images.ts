import { supabase } from '@/lib/supabase/config';

export const addImage = async (file: any, filename: string) => {
    try {
        const { data, error } = await supabase.storage
            .from("images")
            .upload(filename, file, {
                cacheControl: "3600",
                upsert: false,
            });

        const filepath = data?.path;
        return filepath;
    } catch (error: any) {
        console.error("Error uploading file: ", error.message);
    }
}