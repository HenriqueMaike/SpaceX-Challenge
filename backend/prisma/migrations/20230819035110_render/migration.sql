-- CreateTable
CREATE TABLE "rocket" (
    "rocket_id" SERIAL NOT NULL,
    "id" TEXT,
    "name" TEXT,
    "type" TEXT,
    "active" BOOLEAN,
    "stages" INTEGER,
    "boosters" INTEGER,
    "cost_per_launch" INTEGER,
    "success_rate_pct" INTEGER,
    "first_flight" TEXT,
    "country" TEXT,
    "company" TEXT,
    "wikipedia" TEXT,
    "description" TEXT,
    "launch_id" TEXT NOT NULL,

    CONSTRAINT "rocket_pkey" PRIMARY KEY ("rocket_id")
);

-- CreateTable
CREATE TABLE "fairing" (
    "id" SERIAL NOT NULL,
    "reused" BOOLEAN,
    "recovery_attempt" BOOLEAN,
    "recovered" BOOLEAN,
    "ships" TEXT[],
    "launch_id" TEXT NOT NULL,

    CONSTRAINT "fairing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patchLinks" (
    "id" SERIAL NOT NULL,
    "small" TEXT,
    "large" TEXT,
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
    "youtube_id" TEXT,
    "article" TEXT,
    "wikipedia" TEXT,
    "launch_id" TEXT NOT NULL,

    CONSTRAINT "links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "failure" (
    "id" SERIAL NOT NULL,
    "time" INTEGER,
    "altitude" INTEGER,
    "reason" TEXT,
    "launch_id" TEXT NOT NULL,

    CONSTRAINT "failure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cores" (
    "id" SERIAL NOT NULL,
    "core" TEXT,
    "flight" INTEGER,
    "gridfins" BOOLEAN,
    "legs" BOOLEAN,
    "reused" BOOLEAN,
    "landing_attempt" BOOLEAN,
    "landing_success" BOOLEAN,
    "landing_type" TEXT,
    "landpad" TEXT,
    "launch_id" TEXT NOT NULL,

    CONSTRAINT "cores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crew" (
    "id" SERIAL NOT NULL,
    "crew" TEXT,
    "role" TEXT,
    "launch_id" TEXT NOT NULL,

    CONSTRAINT "crew_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "launch" (
    "id" TEXT NOT NULL,
    "static_fire_date_utc" TEXT,
    "static_fire_date_unix" INTEGER,
    "net" BOOLEAN,
    "window" INTEGER,
    "rocket" TEXT,
    "success" BOOLEAN,
    "details" TEXT,
    "ships" TEXT[],
    "capsules" TEXT[],
    "payloads" TEXT[],
    "launchpad" TEXT,
    "flight_number" INTEGER,
    "name" TEXT,
    "date_utc" TEXT,
    "date_unix" INTEGER,
    "date_local" TEXT,
    "date_precision" TEXT,
    "upcoming" BOOLEAN,
    "auto_update" BOOLEAN,
    "tbd" BOOLEAN,
    "launch_library_id" TEXT,

    CONSTRAINT "launch_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rocket" ADD CONSTRAINT "rocket_launch_id_fkey" FOREIGN KEY ("launch_id") REFERENCES "launch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE "crew" ADD CONSTRAINT "crew_launch_id_fkey" FOREIGN KEY ("launch_id") REFERENCES "launch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
