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
        optionColumns: ["Model", "Brand", "Foto"],
        optionColDataset: ["model", "brand_id", "car_image"],
        optionStatus: ["Aktif", "NonAktif", "Bertugas", "Dipesan"],
    },
    {
        optionName: "Mitra",
        optionColumns: ["Nama", "Logo"],
        optionColDataset: ["name", "logo"],
        optionStatus: ["Aktif", "NonAktif", "Bertugas", "Dipesan"],
    },
]