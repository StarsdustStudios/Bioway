import { ProductData } from '../types'

export const productData: ProductData[] = [
    {
        productName: "Rental",
        productColumns: ["Foto", "Merk", "Harga", "Penumpang", "Bagasi"],
        productStatus: ["Aktif", "NonAktif", "Bertugas", "Dipesan"]
    },
    {
        productName: "Carter",
        productColumns: ["Foto", "Merk", "Driver", "Harga", "Penumpang/Bagasi"],
        productStatus: ["Aktif", "NonAktif", "Bertugas", "Dipesan"]
    },
    {
        productName: "Shuttle Bus",
        productColumns: ["Foto", "Merk", "Harga", "Penumpang/Bagasi"],
        productStatus: ["Aktif", "NonAktif", "Bertugas", "Dipesan"]
    },
    {
        productName: "Travel",
        productColumns: ["Foto", "Merk", "Destinasi", "Harga", "Penumpang/Bagasi"],
        productStatus: ["Aktif", "NonAktif", "Bertugas", "Dipesan"]
    },
    {
        productName: "Delivery",
        productColumns: ["Foto", "Harga", "Kapasitas"],
        productStatus: ["Aktif", "NonAktif", "Bertugas", "Dipesan"]
    }
]
