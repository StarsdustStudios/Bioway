import { CmsData } from '../layout/types'

export const cmsData: CmsData[] = [
    {
        cmsName: "Tags",
        cmsColumns: ["Judul", "Thumbnail", "Kategori", "Views", "Ditampilkan"],
        cmsColDataset: ["title", "thumbnailImg", "category", "views", "isShown"],
        cmsStatus: ["Aktif", "NonAktif", "Bertugas", "Dipesan"],
    },
    {
        cmsName: "Promo",
        cmsColumns: ["Judul", "Thumbnail", "Kategori", "Views", "Ditampilkan"],
        cmsColDataset: ["title", "thumbnailImg", "category", "views", "isShown"],
        cmsStatus: ["Aktif", "NonAktif", "Bertugas", "Dipesan"]
    },
    {
        cmsName: "Post",
        cmsColumns: ["Judul", "Thumbnail", "Kategori", "Views", "Ditampilkan"],
        cmsColDataset: ["title", "thumbnailImg", "category", "views", "isShown"],
        cmsStatus: ["Aktif", "NonAktif", "Bertugas", "Dipesan"]
    }
]
