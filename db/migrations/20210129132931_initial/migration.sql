-- CreateTable
CREATE TABLE "Job" (
"id" SERIAL,
    "aggId" TEXT,
    "name" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,
    "avatar" TEXT,
    "url" TEXT,
    "salary" TEXT,
    "postedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "type" TEXT NOT NULL DEFAULT E'aggregated',
    "source" TEXT,
    "searchStr" TEXT NOT NULL DEFAULT E'',
    "likes" INTEGER NOT NULL DEFAULT 0,
    "cools" INTEGER NOT NULL DEFAULT 0,
    "views" INTEGER NOT NULL DEFAULT 0,
    "shares" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
"id" SERIAL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
"id" SERIAL,
    "name" TEXT NOT NULL,
    "about" TEXT DEFAULT E'',
    "tagline" TEXT DEFAULT E'',
    "url" TEXT DEFAULT E'',
    "imgUrl" TEXT NOT NULL,
    "gdUrl" TEXT,
    "gdRating" TEXT,
    "gdReviewCount" INTEGER,
    "liUrl" TEXT,
    "liEmpCount" INTEGER,
    "companySize" TEXT,
    "foundedYear" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_JobToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Job.aggId_unique" ON "Job"("aggId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag.name_unique" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Company.name_unique" ON "Company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_JobToTag_AB_unique" ON "_JobToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_JobToTag_B_index" ON "_JobToTag"("B");

-- AddForeignKey
ALTER TABLE "Job" ADD FOREIGN KEY("companyId")REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobToTag" ADD FOREIGN KEY("A")REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobToTag" ADD FOREIGN KEY("B")REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
