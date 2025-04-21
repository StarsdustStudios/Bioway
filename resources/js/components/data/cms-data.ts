import { CmsData } from '../layout/types'

export const cmsData: CmsData[] = [
    {
        cmsName: "Tags",
        cmsColumns: ["Judul", "Thumbnail", "Kategori", "Views", "Ditampilkan"],
        cmsColDataset: ["title", "thumbnailImg", "category", "views", "isShown"],
        cmsStatus: ["Aktif", "NonAktif", "Bertugas", "Dipesan"],
    },
    {
        cmsName: "Event",
        cmsColumns: ["Nama", "Logo", "Aktif pada", "Berakhir pada"],
        cmsColDataset: ["name", "poster_img", "start_at", "end_at"],
        cmsStatus: ["Aktif", "NonAktif", "Bertugas", "Dipesan"]
    },
    {
        cmsName: "Post",
        cmsColumns: ["Judul", "Thumbnail", "Kategori", "Views", "Ditampilkan"],
        cmsColDataset: ["title", "thumbnailImg", "category", "views", "isShown"],
        cmsStatus: ["Aktif", "NonAktif", "Bertugas", "Dipesan"]
    },
]
