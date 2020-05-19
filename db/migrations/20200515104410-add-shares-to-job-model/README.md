# Migration `20200515104410-add-shares-to-job-model`

This migration has been generated by Abu Uzayr at 5/15/2020, 10:44:10 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Job" ADD COLUMN "shares" integer  NOT NULL DEFAULT 0;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200514114615-add-likes--cools-and-views-fields-to-schema..20200515104410-add-shares-to-job-model
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
@@ -30,8 +30,9 @@
   searchStr   String   @default("")
   likes       Int @default(0)
   cools       Int @default(0)
   views       Int @default(0)
+  shares      Int @default(0)
 }
 model Tag {
   id        Int      @default(autoincrement()) @id
```