import { NextRequest } from 'next/server';
import { getImage } from '@/lib/prisma/queries/images';

export async function GET(
    req: NextRequest,
    context: { params: { id: string } }
) {
    try {
        const { id } = context.params;
        const image = await getImage(id);
        return Response.json(image, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching image: ", error.message);
        return Response.json({
            message: "Error fetching image"
        }, { status: 500 });
    }
}