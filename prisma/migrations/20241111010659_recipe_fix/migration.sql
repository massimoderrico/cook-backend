/*
  Warnings:

  - You are about to drop the column `cookbookId` on the `Recipe` table. All the data in the column will be lost.
  - Made the column `mainCookbookId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_cookbookId_fkey";

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "cookbookId";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "mainCookbookId" SET NOT NULL;

-- CreateTable
CREATE TABLE "_CookbookToRecipe" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CookbookToRecipe_AB_unique" ON "_CookbookToRecipe"("A", "B");

-- CreateIndex
CREATE INDEX "_CookbookToRecipe_B_index" ON "_CookbookToRecipe"("B");

-- AddForeignKey
ALTER TABLE "_CookbookToRecipe" ADD CONSTRAINT "_CookbookToRecipe_A_fkey" FOREIGN KEY ("A") REFERENCES "Cookbook"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CookbookToRecipe" ADD CONSTRAINT "_CookbookToRecipe_B_fkey" FOREIGN KEY ("B") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
