import { OptionData } from "../layout/types";

export const itemDatas : OptionData[] = [
    {
        optionName: "Brand",
        optionColumns: ["Nama", "Logo"],
        optionColDataset: ["name", "logoImg"],
        optionStatus: ["Aktif", "NonAktif", "Bertugas", "Dipesan"],
    },
    {
        optionName: "Mobil",
        optionColumns: ["Model", "Brand", "Foto"],
        optionColDataset: ["model", "brand", "carImg"],
        optionStatus: ["Aktif", "NonAktif", "Bertugas", "Dipesan"],
    },
]