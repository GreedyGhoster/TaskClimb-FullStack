/*
  Warnings:

  - Added the required column `status` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "status" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
