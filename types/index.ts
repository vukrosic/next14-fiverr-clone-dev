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

export type UserWithCountryType = Doc<"users"> & {
    country: Doc<"countries">
};

export type ReviewFullType = Doc<"reviews"> & {
    author: UserWithCountryType,
    gig: Doc<"gigs">
};