import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import useEmblaCarousel from "embla-carousel-react"

export interface Partner {
    name: string
    logo: string 
}



export function PartnerCarousel({ partners }: { partners: Partner[] }) {
    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: false })
    )

    return (
        <Carousel
            opts={{ loop: true }}
            plugins={[plugin.current]}
            className="w-full max-w-4xl"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent className="">
                {partners.map((partner, index) => (
                    <CarouselItem key={index} className="basis-1/4 py-5 md:p-10">
                        <Card className="w-full aspect-square my-0 !py-0">
                            <CardContent className="!w-full !h-full !p-0 flex my-0 !py-0">
                                <img
                                    src={partner.logo}
                                    alt={partner.name}
                                    className="!w-full !h-full object-contain"
                                />
                            </CardContent>
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}
