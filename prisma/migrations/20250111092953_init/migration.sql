/*
  Warnings:

  - You are about to drop the column `staffId` on the `AdminIdentification` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `StudentIdentification` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[adminIdentification]` on the table `AdminIdentification` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentIdentification]` on the table `StudentIdentification` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `adminIdentification` to the `AdminIdentification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentIdentification` to the `StudentIdentification` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "AdminIdentification_staffId_key";

-- DropIndex
DROP INDEX "StudentIdentification_studentId_key";

-- AlterTable
ALTER TABLE "AdminIdentification" DROP COLUMN "staffId",
ADD COLUMN     "adminIdentification" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StudentIdentification" DROP COLUMN "studentId",
ADD COLUMN     "studentIdentification" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AdminIdentification_adminIdentification_key" ON "AdminIdentification"("adminIdentification");

-- CreateIndex
CREATE UNIQUE INDEX "StudentIdentification_studentIdentification_key" ON "StudentIdentification"("studentIdentification");
