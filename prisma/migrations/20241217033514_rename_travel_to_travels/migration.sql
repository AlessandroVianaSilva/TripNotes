/*
  Warnings:

  - You are about to drop the `Travels` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Travels";

-- CreateTable
CREATE TABLE "travels" (
    "id" SERIAL NOT NULL,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "travels_pkey" PRIMARY KEY ("id")
);
