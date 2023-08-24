-- CreateTable
CREATE TABLE `sala` (
    `id` VARCHAR(191) NOT NULL,
    `codigoAcceso` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `creadorId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `sala_codigoAcceso_key`(`codigoAcceso`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invitados` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nickname` VARCHAR(191) NOT NULL,
    `salaId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `puntaje` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sala` ADD CONSTRAINT `sala_creadorId_fkey` FOREIGN KEY (`creadorId`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invitados` ADD CONSTRAINT `invitados_salaId_fkey` FOREIGN KEY (`salaId`) REFERENCES `sala`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
