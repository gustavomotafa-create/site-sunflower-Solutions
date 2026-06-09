/*
  Warnings:

  - You are about to drop the column `preco` on the `Produto` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Produto" DROP COLUMN "preco",
ADD COLUMN     "fornecedorId" INTEGER,
ADD COLUMN     "precoCompra" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "precoVenda" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "estoque" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "Fornecedor" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Fornecedor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_fornecedorId_fkey" FOREIGN KEY ("fornecedorId") REFERENCES "Fornecedor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
