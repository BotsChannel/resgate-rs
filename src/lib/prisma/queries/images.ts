import { supabase } from '@/lib/supabase/config';
import { v4 as uuidv4 } from 'uuid';

export const addImage = async (file: any) => {
    try {
        const filename = `${uuidv4()}.png`;
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

export const deleteImage = async (filename: string) => {
    try {
        const { data, error } = await supabase.storage
            .from("images")
            .remove([`${filename}`]);

        return data;
    } catch (error: any) {
        console.error("Error deleting file: ", error.message);
    }
}