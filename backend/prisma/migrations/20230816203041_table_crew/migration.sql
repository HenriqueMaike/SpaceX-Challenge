/*
  Warnings:

  - You are about to drop the column `crew` on the `launch` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "launch" DROP COLUMN "crew";

-- CreateTable
CREATE TABLE "crew" (
    "id" SERIAL NOT NULL,
    "crew" TEXT,
    "role" TEXT,
    "launch_id" TEXT NOT NULL,

    CONSTRAINT "crew_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "crew" ADD CONSTRAINT "crew_launch_id_fkey" FOREIGN KEY ("launch_id") REFERENCES "launch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
