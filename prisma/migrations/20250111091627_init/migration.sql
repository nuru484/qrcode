-- CreateTable
CREATE TABLE "StudentId" (
    "id" SERIAL NOT NULL,
    "studentId" TEXT NOT NULL,
    "taken" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "StudentId_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StaffId" (
    "id" SERIAL NOT NULL,
    "staffId" TEXT NOT NULL,
    "taken" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "StaffId_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudentId_studentId_key" ON "StudentId"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentId_userId_key" ON "StudentId"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "StaffId_staffId_key" ON "StaffId"("staffId");

-- CreateIndex
CREATE UNIQUE INDEX "StaffId_userId_key" ON "StaffId"("userId");

-- AddForeignKey
ALTER TABLE "StudentId" ADD CONSTRAINT "StudentId_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffId" ADD CONSTRAINT "StaffId_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
