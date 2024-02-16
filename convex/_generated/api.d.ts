/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * Generated by convex@1.9.0.
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as categories from "../categories.js";
import type * as categoriesScript from "../categoriesScript.js";
import type * as gig from "../gig.js";
import type * as gigMedia from "../gigMedia.js";
import type * as gigs from "../gigs.js";
import type * as messages from "../messages.js";
import type * as schema from "../schema.js";
import type * as stripe from "../stripe.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  categories: typeof categories;
  categoriesScript: typeof categoriesScript;
  gig: typeof gig;
  gigMedia: typeof gigMedia;
  gigs: typeof gigs;
  messages: typeof messages;
  schema: typeof schema;
  stripe: typeof stripe;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
