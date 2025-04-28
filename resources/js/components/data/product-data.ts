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
        productColumns: ["Bus", "Lokasi Awal", "Lokasi Tujuan", "Harga"],
        productColDataset: ["car_id", "from", "to", "price"],
        productStatus: ["Aktif", "NonAktif", "Bertugas", "Dipesan"]
    },
    {
        productName: "Tour",
        productColumns: ["Foto", "Judul", "Lokasi Awal", "Deskripsi", "Harga", "Penumpang", "Bagasi", "Rute"],
        productColDataset: ["tour_image", "title", "start", "desc", "price", "passenger", "luggage", "pivots"],
        productStatus: ["Aktif", "NonAktif", "Bertugas", "Dipesan"]
    },
    {
        productName: "Delivery",
        productColumns: ["Lokasi", "Kapasitas", "Harga"],
        productColDataset: ["location_id", "size", "price"],
        productStatus: ["Aktif", "NonAktif", "Bertugas", "Dipesan"]
    }
]
