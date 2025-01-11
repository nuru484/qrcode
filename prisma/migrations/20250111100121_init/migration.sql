/*
  Warnings:

  - You are about to drop the `userIdentification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "userIdentification";

-- CreateTable
CREATE TABLE "UserIdentification" (
    "id" SERIAL NOT NULL,
    "identification" TEXT NOT NULL,
    "taken" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserIdentification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserIdentification_identification_key" ON "UserIdentification"("identification");
