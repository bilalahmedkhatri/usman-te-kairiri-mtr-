-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('TITLE', 'INSPECTION', 'EXPORT_CERT', 'CUSTOMS', 'AUCTION_SHEET', 'SERVICE_RECORD', 'OTHER');

-- AlterTable
ALTER TABLE "vehicle_logistics" ADD COLUMN     "current_port_name" TEXT,
ADD COLUMN     "eta_destination" TIMESTAMP(3),
ADD COLUMN     "import_date" TIMESTAMP(3),
ADD COLUMN     "inspection_date" TIMESTAMP(3),
ADD COLUMN     "origin_port" TEXT,
ADD COLUMN     "shipping_status" TEXT;

-- AlterTable
ALTER TABLE "vehicle_specs" ADD COLUMN     "dimensions" TEXT,
ADD COLUMN     "emission_standard" TEXT,
ADD COLUMN     "fuel_consumption" TEXT,
ADD COLUMN     "power_hp" INTEGER,
ADD COLUMN     "power_kw" INTEGER,
ADD COLUMN     "torque_nm" INTEGER,
ADD COLUMN     "weight_kg" INTEGER;

-- AlterTable
ALTER TABLE "vehicles" ADD COLUMN     "currency" TEXT DEFAULT 'JPY',
ADD COLUMN     "description" TEXT,
ADD COLUMN     "price_retail" DECIMAL(12,2);

-- CreateTable
CREATE TABLE "vehicle_documents" (
    "id" SERIAL NOT NULL,
    "vehicle_id" INTEGER NOT NULL,
    "type" "DocumentType" NOT NULL DEFAULT 'OTHER',
    "title" TEXT,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicle_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle_history" (
    "id" SERIAL NOT NULL,
    "vehicle_id" INTEGER NOT NULL,
    "previous_owners" TEXT,
    "service_history" TEXT,
    "accident_history" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicle_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "vehicle_documents_vehicle_id_idx" ON "vehicle_documents"("vehicle_id");

-- CreateIndex
CREATE INDEX "vehicle_documents_type_idx" ON "vehicle_documents"("type");

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_history_vehicle_id_key" ON "vehicle_history"("vehicle_id");

-- AddForeignKey
ALTER TABLE "vehicle_documents" ADD CONSTRAINT "vehicle_documents_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_history" ADD CONSTRAINT "vehicle_history_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
