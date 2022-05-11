/*
  Warnings:

  - You are about to drop the column `authorId` on the `Basket` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Basket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Basket" DROP CONSTRAINT "Basket_authorId_fkey";

-- AlterTable
ALTER TABLE "Basket" DROP COLUMN "authorId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Basket" ADD CONSTRAINT "Basket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
