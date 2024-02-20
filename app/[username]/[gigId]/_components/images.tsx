import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Doc } from "@/convex/_generated/dataModel"
import { ImageWithUrlType } from "@/types"
import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { MoreHorizontal, Trash2 } from "lucide-react"
import { Actions } from "@/app/seller/[username]/manage-gigs/edit/[gigId]/_components/actions"

interface ImagesProps {
    images: ImageWithUrlType[];
    title: string;
}

export const Images = ({
    images,
    title
}: ImagesProps) => {
    return (
        <Carousel>
            <CarouselContent>
                {images.map((image) => {
                    return (
                        <CarouselItem
                            key={image._id}
                        >
                            <AspectRatio ratio={16 / 9}>
                                <Actions
                                    side="bottom"
                                    sideOffset={10}
                                    storageId={image.storageId}
                                >
                                    <Trash2 />
                                </Actions>
                                <Image
                                    src={image.url || 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/2560px-Placeholder_view_vector.svg.png'}
                                    alt={title}
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
        </Carousel>
    )
}