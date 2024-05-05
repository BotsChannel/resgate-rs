import { getPeople, postPerson } from "@/lib/prisma/queries/people";
import { NextRequest } from "next/server";

export async function GET(
    req: NextRequest
) {
    try {
        const people = await getPeople();
        console.log(`People: ${JSON.stringify(people)}`);
        return Response.json(people, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching people: ", error.message);
        return Response.json({
            message: "Error fetching people"
        }, { status: 500 });
    }
}

export async function POST(
    req: NextRequest
) {
    try {
        const body = await req.json();
        const person = {
            name: body.name,
            age: body.age,
            status: body.status,
            photoUrl: body.photoUrl,
            cidade: body.cidade,
            endereco: body.endereco,
            abrigo: body.abrigo,
            entrada: body.entrada,
        }

        const response = await postPerson(person)
        
        if (response) {
            return Response.json({
                message: "Person created successfully",
                data: response
            }, { status: 201 });
        } else {
            return Response.json({
                message: "Error creating person"
            }, { status: 500 });
        }
    } catch (error: any) {
        console.error("Error creating person: ", error.message);
        return Response.json({
            message: "Error creating person"
        }, { status: 500 });
    }
}