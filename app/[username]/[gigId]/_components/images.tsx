import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

interface ImagesProps {
    images: string[]
}

export const Images = ({
    images
}: ImagesProps) => {
    return (
        <div className="w-full h-[300px] bg-red-500">
            <Carousel>
                <CarouselContent>
                    {images.map((image) => {
                        return (
                            <CarouselItem
                                key={image}
                            >
                                <img src={image} alt="" />
                            </CarouselItem>
                        )
                    })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

        </div>
    )
}