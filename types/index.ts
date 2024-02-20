import { Doc } from "@/convex/_generated/dataModel";

export type MessageWithUserType = Doc<"messages"> & {
    user: Doc<"users">
};

export type GigWithImageType = Doc<"gigs"> & {
    images: Doc<"gigMedia">[]
};

export type ImageWithUrlType = Doc<"gigMedia"> & {
    url: string
};