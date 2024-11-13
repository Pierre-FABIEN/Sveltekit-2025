-- AlterTable
ALTER TABLE "Session" ADD COLUMN "oauthProvider" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "username" TEXT,
    "passwordHash" TEXT NOT NULL,
    "recoveryCode" TEXT,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "totpKey" BLOB,
    "googleId" TEXT,
    "name" TEXT,
    "picture" TEXT
);
INSERT INTO "new_User" ("email", "emailVerified", "id", "passwordHash", "recoveryCode", "totpKey", "username") SELECT "email", "emailVerified", "id", "passwordHash", "recoveryCode", "totpKey", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
