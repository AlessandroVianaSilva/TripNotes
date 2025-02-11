/*
  Warnings:

  - You are about to drop the `Passenger` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Passenger" DROP CONSTRAINT "Passenger_tripId_fkey";

-- DropTable
DROP TABLE "Passenger";

-- CreateTable
CREATE TABLE "passengers" (
    "id" SERIAL NOT NULL,
    "tripId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "number" TEXT NOT NULL,
    "street" TEXT NOT NULL,

    CONSTRAINT "passengers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "passengers" ADD CONSTRAINT "passengers_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "travels"("id") ON DELETE CASCADE ON UPDATE CASCADE;
