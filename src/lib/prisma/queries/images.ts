import { supabase } from '@/lib/supabase/config';

export const addImage = async (file: any, filename: string) => {
    try {
        const { data, error } = await supabase.storage
            .from("images")
            .upload(filename, file, {
                contentType: "image/png",
                cacheControl: "3600",
                upsert: false,
            });

        const filepath = data?.path;
        return filepath;
    } catch (error: any) {
        console.error("Error uploading file: ", error.message);
    }
}

export const getImage = async (filename: string) => {
    try {
        const { data, error } = await supabase.storage
            .from("images")
            .download(`${filename}`);

        return data;
    } catch (error: any) {
        console.error("Error downloading file: ", error.message);
    }
}