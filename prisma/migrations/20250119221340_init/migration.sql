/*
  Warnings:

  - A unique constraint covering the columns `[new]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "new" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_new_key" ON "User"("new");
