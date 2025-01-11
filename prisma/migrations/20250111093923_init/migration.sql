/*
  Warnings:

  - You are about to drop the `AdminIdentification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentIdentification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AdminIdentification" DROP CONSTRAINT "AdminIdentification_userId_fkey";

-- DropForeignKey
ALTER TABLE "StudentIdentification" DROP CONSTRAINT "StudentIdentification_userId_fkey";

-- DropTable
DROP TABLE "AdminIdentification";

-- DropTable
DROP TABLE "StudentIdentification";

-- CreateTable
CREATE TABLE "userIdentification" (
    "id" SERIAL NOT NULL,
    "identification" TEXT NOT NULL,
    "taken" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "userIdentification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userIdentification_identification_key" ON "userIdentification"("identification");
