import { ProductData } from '../layout/types'

export const productData: ProductData[] = [
    {
        productName: "Rental",
        productColumns: ["Mobil", "Lokasi kota", "Harga", "Driver Fee"],
        productColDataset: ["car_id", "location_id", "price", "driver_fee"],
        productStatus: ["Aktif", "NonAktif", "Bertugas", "Dipesan"],
    },
    {
        productName: "Carter",
        productColumns: ["Mobil", "Lokasi kota", "Harga"],
        productColDataset: ["car_id", "location_id", "price"],
        productStatus: ["Aktif", "NonAktif", "Bertugas", "Dipesan"]
    },
    {
        productName: "Shuttle Bus",
        productColumns: ["Foto", "Brand", "Harga", "Location", "Destination"],
        productColDataset: ["image", "brand", "price", "driverFee", "location", "destination"],
        productStatus: ["Aktif", "NonAktif", "Bertugas", "Dipesan"]
    },
    {
        productName: "Travel",
        productColumns: ["Foto", "Brand", "Harga", "Location", "Destination"],
        productColDataset: ["image", "brand", "price", "location", "destination"],
        productStatus: ["Aktif", "NonAktif", "Bertugas", "Dipesan"]
    },
    {
        productName: "Delivery",
        productColumns: ["Foto", "Brand", "Harga", "Kapasitas", "Driver Fee", "Lokasi"],
        productColDataset: ["image", "brand", "price", "luggageCapacity", "driverFee", "location"],
        productStatus: ["Aktif", "NonAktif", "Bertugas", "Dipesan"]
    }
]
