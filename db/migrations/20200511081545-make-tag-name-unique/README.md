# Migration `20200511081545-make-tag-name-unique`

This migration has been generated by Abu Uzayr at 5/11/2020, 8:15:45 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE UNIQUE INDEX "Tag.name" ON "public"."Tag"("name")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200510173030-make-job-aggid-unique..20200511081545-make-tag-name-unique
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource postgresql {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 generator client {
   provider = "prisma-client-js"
@@ -30,9 +30,9 @@
 }
 model Tag {
   id        Int      @default(autoincrement()) @id
-  name      String
+  name      String   @unique
   jobs      Job[]    @relation(references: [id])
 }
 model Company {
```