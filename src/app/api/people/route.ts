import { getPeople, postPerson, updatePerson } from "@/lib/prisma/queries/people";
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
            sex: body.sex,
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

export async function PUT(
    req: NextRequest,
) {
    try {
        const body = await req.json();
        const person = {
            id: body.id,
            name: body.name,
            age: body.age,
            sex: body.sex,
            status: body.status,
            photoUrl: body.photoUrl,
            cidade: body.cidade,
            endereco: body.endereco,
            abrigo: body.abrigo,
            entrada: body.entrada,
        }

        const response = await updatePerson({
            id: person.id,
            name: person.name,
            age: person.age,
            sex: person.sex,
            status: person.status,
            photoUrl: person.photoUrl,
            cidade: person.cidade,
            endereco: person.endereco,
            abrigo: person.abrigo,
            entrada: person.entrada,
        });

        if (response) {
            return Response.json({
                message: "Person updated successfully",
                data: response
            }, { status: 200 });
        } else {
            return Response.json({
                message: "Error updating person"
            }, { status: 500 });
        }
    } catch (error: any) {
        console.error("Error updating person: ", error.message);
        return Response.json({
            message: "Error updating person"
        }, { status: 500 });
    }
}
        