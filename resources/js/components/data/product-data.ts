import { ProductData } from '../layout/types'

export const productData: ProductData[] = [
    {
        productName: "Rental",
        productColumns: ["Foto", "Brand", "Harga", "Driver Fee", "Lokasi", "Kap. Penumpang", "Kap. Bagasi"],
        productColDataset: ["image", "brand", "price", "driverFee", "location", "passengerCapacity", "luggageCapacity"],
        productStatus: ["Aktif", "NonAktif", "Bertugas", "Dipesan"],
    },
    {
        productName: "Carter",
        productColumns: ["Foto", "Brand", "Harga", "Driver Fee", "Lokasi", "Kap. Penumpang", "Kap. Bagasi"],
        productColDataset: ["image", "brand", "price", "driverFee", "location", "passengerCapacity", "luggageCapacity"],
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
