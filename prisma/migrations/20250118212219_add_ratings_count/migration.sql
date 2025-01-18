-- AlterTable
ALTER TABLE "Cookbook" ADD COLUMN     "ratingsCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "ratingsCount" INTEGER NOT NULL DEFAULT 0;
