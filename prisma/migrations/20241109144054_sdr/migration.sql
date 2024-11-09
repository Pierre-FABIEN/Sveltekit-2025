/*
  Warnings:

  - Added the required column `code` to the `PasswordResetSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `PasswordResetSession` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PasswordResetSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    CONSTRAINT "PasswordResetSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PasswordResetSession" ("expiresAt", "id", "userId") SELECT "expiresAt", "id", "userId" FROM "PasswordResetSession";
DROP TABLE "PasswordResetSession";
ALTER TABLE "new_PasswordResetSession" RENAME TO "PasswordResetSession";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
