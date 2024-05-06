/*
model Person {
  id        String   @id @default(cuid())
  name      String
  age       Int
  status    String
  photoUrl  String
  cidade    String
  endereco  String
  abrigo    String
  entrada   DateTime
  comentarios Comment[]
}
*/

import { prisma } from '@/lib/prisma/config'

export const getPeople = async () => {
  return await prisma.person.findMany()
}

export const postPerson = async ({
  name,
  age,
  sex,
  status,
  photoUrl,
  cidade,
  endereco,
  abrigo,
  entrada,
}: {
  name: string
  age: number
  sex: string
  status: string
  photoUrl: string
  cidade: string
  endereco: string
  abrigo: string
  entrada: string
}) => {
  const data = {
    name,
    age,
    sex,
    status,
    photoUrl,
    cidade,
    endereco,
    abrigo,
    entrada,
  }

  console.log(JSON.stringify(data));

  return await prisma.person.create({ data })
}

export const updatePerson = async ({
  id,
  name,
  age,
  sex,
  status,
  photoUrl,
  cidade,
  endereco,
  abrigo,
  entrada,
}: {
  id: number
  name: string
  age: number
  sex: string
  status: string
  photoUrl: string
  cidade: string
  endereco: string
  abrigo: string
  entrada: Date
}) => {
  const data = {
    name,
    age,
    sex,
    status,
    photoUrl,
    cidade,
    endereco,
    abrigo,
    entrada,
  }
  return await prisma.person.update({
    where: {
      id,
    },
    data,
  })
}