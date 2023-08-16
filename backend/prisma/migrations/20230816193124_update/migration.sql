/*
  Warnings:

  - The primary key for the `launch` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "cores" DROP CONSTRAINT "cores_launch_id_fkey";

-- DropForeignKey
ALTER TABLE "failure" DROP CONSTRAINT "failure_launch_id_fkey";

-- DropForeignKey
ALTER TABLE "fairing" DROP CONSTRAINT "fairing_launch_id_fkey";

-- DropForeignKey
ALTER TABLE "links" DROP CONSTRAINT "links_launch_id_fkey";

-- AlterTable
ALTER TABLE "cores" ALTER COLUMN "launch_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "failure" ALTER COLUMN "launch_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "fairing" ALTER COLUMN "launch_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "launch" DROP CONSTRAINT "launch_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "static_fire_date_utc" SET DATA TYPE TEXT,
ALTER COLUMN "date_utc" SET DATA TYPE TEXT,
ALTER COLUMN "date_local" SET DATA TYPE TEXT,
ADD CONSTRAINT "launch_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "links" ALTER COLUMN "launch_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "fairing" ADD CONSTRAINT "fairing_launch_id_fkey" FOREIGN KEY ("launch_id") REFERENCES "launch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "links" ADD CONSTRAINT "links_launch_id_fkey" FOREIGN KEY ("launch_id") REFERENCES "launch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "failure" ADD CONSTRAINT "failure_launch_id_fkey" FOREIGN KEY ("launch_id") REFERENCES "launch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cores" ADD CONSTRAINT "cores_launch_id_fkey" FOREIGN KEY ("launch_id") REFERENCES "launch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
