/*
  Warnings:

  - You are about to drop the column `new` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_new_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "new";
