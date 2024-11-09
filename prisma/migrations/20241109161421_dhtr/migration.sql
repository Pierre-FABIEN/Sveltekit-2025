-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PasswordResetSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "twoFactorVerified" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "PasswordResetSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PasswordResetSession" ("code", "email", "emailVerified", "expiresAt", "id", "userId") SELECT "code", "email", "emailVerified", "expiresAt", "id", "userId" FROM "PasswordResetSession";
DROP TABLE "PasswordResetSession";
ALTER TABLE "new_PasswordResetSession" RENAME TO "PasswordResetSession";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
