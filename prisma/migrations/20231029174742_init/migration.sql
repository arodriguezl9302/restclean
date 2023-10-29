-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "date" TIMESTAMP,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
