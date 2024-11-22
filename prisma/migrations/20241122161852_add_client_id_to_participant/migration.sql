/*
  Warnings:

  - You are about to drop the column `name` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the column `num` on the `Participant` table. All the data in the column will be lost.
  - Added the required column `client_id` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Participant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "client_id" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "message" TEXT NOT NULL
);
INSERT INTO "new_Participant" ("id") SELECT "id" FROM "Participant";
DROP TABLE "Participant";
ALTER TABLE "new_Participant" RENAME TO "Participant";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
