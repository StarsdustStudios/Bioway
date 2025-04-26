import { OptionData } from "../layout/types";

export const itemDatas : OptionData[] = [
    {
        optionName: "Brand",
        optionColumns: ["Nama", "Logo"],
        optionColDataset: ["name", "brand_logo"],
        optionStatus: ["Aktif", "NonAktif", "Bertugas", "Dipesan"],
    },
    {
        optionName: "Mobil",
        optionColumns: ["Model", "Brand", "Foto", "Penumpang", "Bagasi"],
        optionColDataset: ["model", "brand_id", "car_image", "seat", "luggage"],
        optionStatus: ["Aktif", "NonAktif", "Bertugas", "Dipesan"],
    },
    {
        optionName: "Lokasi",
        optionColumns: ["Lokasi"],
        optionColDataset: ["city_name"],
        optionStatus: ["Aktif", "NonAktif", "Bertugas", "Dipesan"],
    },
    {
        optionName: "Mitra",
        optionColumns: ["Nama", "Logo"],
        optionColDataset: ["name", "logo"],
        optionStatus: ["Aktif", "NonAktif", "Bertugas", "Dipesan"],
    },
    {
        optionName: "Lokasi Tour",
        optionColumns: ["Tour", "Lokasi"],
        optionColDataset: ["tour_id", "logo"],
        optionStatus: ["Aktif", "NonAktif", "Bertugas", "Dipesan"],
    },
]