-- CreateTable
CREATE TABLE "fairing" (
    "id" SERIAL NOT NULL,
    "reused" BOOLEAN NOT NULL,
    "ecovery_attempt" BOOLEAN NOT NULL,
    "recovered" BOOLEAN NOT NULL,
    "ships" TEXT[],
    "launch_id" INTEGER NOT NULL,

    CONSTRAINT "fairing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patchLinks" (
    "id" SERIAL NOT NULL,
    "small" TEXT NOT NULL,
    "large" TEXT NOT NULL,
    "links_id" INTEGER NOT NULL,

    CONSTRAINT "patchLinks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "redditLinks" (
    "id" SERIAL NOT NULL,
    "campaign" TEXT,
    "launch" TEXT,
    "media" TEXT,
    "recovery" TEXT,
    "links_id" INTEGER NOT NULL,

    CONSTRAINT "redditLinks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flickrLinks" (
    "id" SERIAL NOT NULL,
    "small" TEXT[],
    "original" TEXT[],
    "links_id" INTEGER NOT NULL,

    CONSTRAINT "flickrLinks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "links" (
    "id" SERIAL NOT NULL,
    "presskit" TEXT,
    "webcast" TEXT,
    "youtubeId" TEXT,
    "article" TEXT,
    "wikipedia" TEXT,
    "launch_id" INTEGER NOT NULL,

    CONSTRAINT "links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "failure" (
    "id" SERIAL NOT NULL,
    "time" INTEGER NOT NULL,
    "altitude" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "launch_id" INTEGER NOT NULL,

    CONSTRAINT "failure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cores" (
    "id" SERIAL NOT NULL,
    "core" TEXT NOT NULL,
    "flight" INTEGER NOT NULL,
    "gridfins" BOOLEAN NOT NULL,
    "legs" BOOLEAN NOT NULL,
    "reused" BOOLEAN NOT NULL,
    "landingAttempt" BOOLEAN NOT NULL,
    "landingSuccess" BOOLEAN,
    "landingType" TEXT,
    "landpad" TEXT,
    "launch_id" INTEGER NOT NULL,

    CONSTRAINT "cores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "launch" (
    "id" SERIAL NOT NULL,
    "staticFireDateUtc" TIMESTAMP(3),
    "staticFireDateUnix" INTEGER,
    "net" BOOLEAN NOT NULL,
    "window" INTEGER NOT NULL,
    "rocket" TEXT NOT NULL,
    "success" BOOLEAN NOT NULL,
    "details" TEXT,
    "crew" TEXT[],
    "ships" TEXT[],
    "capsules" TEXT[],
    "payloads" TEXT[],
    "launchpad" TEXT NOT NULL,
    "flightNumber" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "dateUtc" TIMESTAMP(3) NOT NULL,
    "dateUnix" INTEGER NOT NULL,
    "dateLocal" TIMESTAMP(3) NOT NULL,
    "datePrecision" TEXT NOT NULL,
    "upcoming" BOOLEAN NOT NULL,
    "autoUpdate" BOOLEAN NOT NULL,
    "tbd" BOOLEAN NOT NULL,
    "launchLibraryId" TEXT,

    CONSTRAINT "launch_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "fairing" ADD CONSTRAINT "fairing_launch_id_fkey" FOREIGN KEY ("launch_id") REFERENCES "launch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patchLinks" ADD CONSTRAINT "patchLinks_links_id_fkey" FOREIGN KEY ("links_id") REFERENCES "links"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "redditLinks" ADD CONSTRAINT "redditLinks_links_id_fkey" FOREIGN KEY ("links_id") REFERENCES "links"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flickrLinks" ADD CONSTRAINT "flickrLinks_links_id_fkey" FOREIGN KEY ("links_id") REFERENCES "links"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "links" ADD CONSTRAINT "links_launch_id_fkey" FOREIGN KEY ("launch_id") REFERENCES "launch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "failure" ADD CONSTRAINT "failure_launch_id_fkey" FOREIGN KEY ("launch_id") REFERENCES "launch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cores" ADD CONSTRAINT "cores_launch_id_fkey" FOREIGN KEY ("launch_id") REFERENCES "launch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
