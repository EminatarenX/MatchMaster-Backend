/*
  Warnings:

  - Added the required column `token` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `confirmado` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `token` VARCHAR(191) NOT NULL;
