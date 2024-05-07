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
}: {
  name: string
  age: number
  sex: string
  status: string
  photoUrl: string
  cidade: string
  endereco: string
  abrigo: string
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
  }
  return await prisma.person.update({
    where: {
      id,
    },
    data,
  })
}