/*
  Warnings:

  - You are about to drop the column `chatId` on the `UserProfile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserProfile" DROP CONSTRAINT "UserProfile_chatId_fkey";

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'delivered';

-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "chatId";

-- CreateTable
CREATE TABLE "_ChatToUserProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ChatToUserProfile_AB_unique" ON "_ChatToUserProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_ChatToUserProfile_B_index" ON "_ChatToUserProfile"("B");

-- AddForeignKey
ALTER TABLE "_ChatToUserProfile" ADD CONSTRAINT "_ChatToUserProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatToUserProfile" ADD CONSTRAINT "_ChatToUserProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
