import { ProductData } from '../types'

export const productData: ProductData[] = [
    {
        productName: "Rental",
        productColumns: ["Foto", "Brand", "Harga", "Driver Fee", "Lokasi"],
        productColDataset: ["imgUrl", "brand", "price", "driverFee", "location"],
        productStatus: ["Aktif", "NonAktif", "Bertugas", "Dipesan"],
    },
    {
        productName: "Carter",
        productColumns: ["Foto", "Brand", "Driver", "Harga", "Penumpang/Bagasi"],
        productColDataset: ["imgUrl", "brand", "price", "driverFee", "location"],
        productStatus: ["Aktif", "NonAktif", "Bertugas", "Dipesan"]
    },
    {
        productName: "Shuttle Bus",
        productColumns: ["Foto", "Brand", "Harga", "Penumpang/Bagasi"],
        productColDataset: ["imgUrl", "brand", "price", "driverFee", "location"],
        productStatus: ["Aktif", "NonAktif", "Bertugas", "Dipesan"]
    },
    {
        productName: "Travel",
        productColumns: ["Foto", "Brand", "Destinasi", "Harga", "Penumpang/Bagasi"],
        productColDataset: ["imgUrl", "brand", "price", "driverFee", "location"],
        productStatus: ["Aktif", "NonAktif", "Bertugas", "Dipesan"]
    },
    {
        productName: "Delivery",
        productColumns: ["Foto", "Brand", "Kapasitas"],
        productColDataset: ["imgUrl", "brand", "price", "driverFee", "location"],
        productStatus: ["Aktif", "NonAktif", "Bertugas", "Dipesan"]
    }
]
