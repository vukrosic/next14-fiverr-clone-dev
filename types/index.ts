import { Doc } from "@/convex/_generated/dataModel";

export type MessageWithUserType = Doc<"messages"> & {
    user: Doc<"users">
};