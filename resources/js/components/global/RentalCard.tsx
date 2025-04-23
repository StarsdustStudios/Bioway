import * as React from 'react';
import { faker } from '@faker-js/faker';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconBriefcase2, IconArmchair } from "@tabler/icons-react";

export function RentalCard() {
    const carName = faker.vehicle.vehicle();
    const carImage = faker.image.urlPicsumPhotos({ width: 400, height: 240 });
    const seatCount = faker.number.int({ min: 2, max: 7 });
    const luggageCount = faker.number.int({ min: 1, max: 4 });
    const price = faker.number.int({ min: 300000, max: 2000000 });

    return (
        <Card className="flex p-4 gap-4 rounded-2xl shadow-md border-blue-300">
            <div className="flex items-center gap-4">
                <div className="w-32 h-20 md:w-40 md:h-24 relative">
                    <img
                        src={carImage}
                        alt={carName}
                        className="object-cover w-full h-full rounded-md"
                    />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                    <h2 className="text-lg font-semibold">{carName}</h2>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <IconArmchair size={18} /> {seatCount}
                        </span>
                        <span className="flex items-center gap-1">
                            <IconBriefcase2 size={18} /> {luggageCount}
                        </span>
                    </div>
                    <p className="text-xl font-bold text-black">
                        Rp {price.toLocaleString('id-ID')} / Hari
                    </p>
                    <Button className="w-fit mt-2 bg-blue-600 hover:bg-blue-700 text-white">
                        ORDER SEKARANG
                    </Button>
                </div>
            </div>
        </Card>
    );
}
