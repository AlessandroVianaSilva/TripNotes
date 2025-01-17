/*
  Warnings:

  - You are about to drop the `Travel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Travel";

-- CreateTable
CREATE TABLE "Travels" (
    "id" SERIAL NOT NULL,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Travels_pkey" PRIMARY KEY ("id")
);
