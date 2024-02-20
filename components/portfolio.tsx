import { Images } from "./images"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image"

interface PortfolioProps {
    //urls: string[];
}

export const Portfolio = ({
    // urls
}: PortfolioProps) => {
    return (
        <div>
            <p>Seller Portfolio</p>
            {/* <Carousel className="select-none">
                <CarouselContent>
                    {urls.map((url, index) => {
                        return (
                            <CarouselItem
                                key={url}
                            >
                                <AspectRatio ratio={16 / 9}>
                                    <Image
                                        src={url || 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/2560px-Placeholder_view_vector.svg.png'}
                                        alt={"portfolio media " + index}
                                        fill
                                        className="rounded-md object-cover"
                                    />
                                </AspectRatio>
                            </CarouselItem>
                        )
                    })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel> */}
        </div>
    )
}