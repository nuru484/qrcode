/*
  Warnings:

  - You are about to drop the `StaffId` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentId` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StaffId" DROP CONSTRAINT "StaffId_userId_fkey";

-- DropForeignKey
ALTER TABLE "StudentId" DROP CONSTRAINT "StudentId_userId_fkey";

-- DropTable
DROP TABLE "StaffId";

-- DropTable
DROP TABLE "StudentId";

-- CreateTable
CREATE TABLE "StudentIdentification" (
    "id" SERIAL NOT NULL,
    "studentId" TEXT NOT NULL,
    "taken" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "StudentIdentification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminIdentification" (
    "id" SERIAL NOT NULL,
    "staffId" TEXT NOT NULL,
    "taken" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "AdminIdentification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudentIdentification_studentId_key" ON "StudentIdentification"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentIdentification_userId_key" ON "StudentIdentification"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AdminIdentification_staffId_key" ON "AdminIdentification"("staffId");

-- CreateIndex
CREATE UNIQUE INDEX "AdminIdentification_userId_key" ON "AdminIdentification"("userId");

-- AddForeignKey
ALTER TABLE "StudentIdentification" ADD CONSTRAINT "StudentIdentification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminIdentification" ADD CONSTRAINT "AdminIdentification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
