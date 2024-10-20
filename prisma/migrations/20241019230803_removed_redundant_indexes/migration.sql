/*
  Warnings:

  - You are about to drop the column `username` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Community` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Cookbook` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Recipe` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_username_fkey";

-- DropForeignKey
ALTER TABLE "Community" DROP CONSTRAINT "Community_userId_username_fkey";

-- DropForeignKey
ALTER TABLE "Cookbook" DROP CONSTRAINT "Cookbook_userId_username_fkey";

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_userId_username_fkey";

-- DropIndex
DROP INDEX "Comment_id_userId_resourceId_resourceType_idx";

-- DropIndex
DROP INDEX "Community_id_name_userId_idx";

-- DropIndex
DROP INDEX "Cookbook_id_name_userId_idx";

-- DropIndex
DROP INDEX "Recipe_id_name_userId_prepTime_cookTime_idx";

-- DropIndex
DROP INDEX "User_id_name_email_username_idx";

-- DropIndex
DROP INDEX "User_id_username_key";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "username";

-- AlterTable
ALTER TABLE "Community" DROP COLUMN "username";

-- AlterTable
ALTER TABLE "Cookbook" DROP COLUMN "username";

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "username";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "mainCookbookId" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Comment_userId_resourceId_resourceType_idx" ON "Comment"("userId", "resourceId", "resourceType");

-- CreateIndex
CREATE INDEX "Community_name_userId_idx" ON "Community"("name", "userId");

-- CreateIndex
CREATE INDEX "Cookbook_name_userId_idx" ON "Cookbook"("name", "userId");

-- CreateIndex
CREATE INDEX "Recipe_name_userId_prepTime_cookTime_idx" ON "Recipe"("name", "userId", "prepTime", "cookTime");

-- CreateIndex
CREATE INDEX "User_username_email_idx" ON "User"("username", "email");

-- AddForeignKey
ALTER TABLE "Cookbook" ADD CONSTRAINT "Cookbook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Community" ADD CONSTRAINT "Community_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
