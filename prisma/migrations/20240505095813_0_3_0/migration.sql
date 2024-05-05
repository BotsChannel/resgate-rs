/*
  Warnings:

  - You are about to drop the column `cardId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the `Card` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `personId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_personId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_cardId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "cardId",
ADD COLUMN     "personId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Card";

-- CreateTable
CREATE TABLE "chat_session" (
    "id" TEXT NOT NULL,

    CONSTRAINT "chat_session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_message" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chat_message_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
