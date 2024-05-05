/*
  Warnings:

  - The primary key for the `Comment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Comment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Person` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Person` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `chat_message` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `chat_message` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `personId` on the `Comment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_personId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "personId",
ADD COLUMN     "personId" INTEGER NOT NULL,
ADD CONSTRAINT "Comment_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Person" DROP CONSTRAINT "Person_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Person_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "chat_message" DROP CONSTRAINT "chat_message_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "chat_message_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
