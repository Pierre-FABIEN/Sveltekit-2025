/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Participant` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Participant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "num" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Participant" ("id", "name", "num") SELECT "id", "name", "num" FROM "Participant";
DROP TABLE "Participant";
ALTER TABLE "new_Participant" RENAME TO "Participant";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
