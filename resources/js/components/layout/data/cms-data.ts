import { CmsData } from '../types'

export const cmsData: CmsData[] = [
    {
        cmsName: "Tags",
        cmsColumns: ["Foto", "Brand", "Harga", "Driver Fee", "Lokasi"],
        cmsColDataset: ["imgUrl", "brand", "price", "driverFee", "location"],
        cmsStatus: ["Aktif", "NonAktif", "Bertugas", "Dipesan"],
    },
    {
        cmsName: "Promo",
        cmsColumns: ["Foto", "Brand", "Driver", "Harga", "Penumpang/Bagasi"],
        cmsColDataset: ["imgUrl", "brand", "price", "driverFee", "location"],
        cmsStatus: ["Aktif", "NonAktif", "Bertugas", "Dipesan"]
    },
    {
        cmsName: "Post",
        cmsColumns: ["Foto", "Brand", "Harga", "Penumpang/Bagasi"],
        cmsColDataset: ["imgUrl", "brand", "price", "driverFee", "location"],
        cmsStatus: ["Aktif", "NonAktif", "Bertugas", "Dipesan"]
    }
]
