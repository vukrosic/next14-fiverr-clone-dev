"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import { useState } from "react"
import { Doc } from "@/convex/_generated/dataModel"


const OverviewFormSchema = z.object({
  username: z
    .string()
    .min(30, {
      message: "Title must be at least 30 characters.",
    })
    .max(100, {
      message: "Title must not be longer than 100 characters.",
    }),
  category: z
    .string({
      required_error: "Please select a category.",
    }),
  subcategory: z
    .string({
      required_error: "Please select a subcategory.",
    }),
  description: z.string().max(160).min(4),
})

type OverviewFormValues = z.infer<typeof OverviewFormSchema>

// gigs: defineTable({
//   title: v.string(),
//   description: v.string(),
//   sellerId: v.id("users"),
//   subcategoryId: v.id("subcategories"),
//   published: v.boolean(),
//   clicks: v.number(),
// })

// This can come from your database or API.
const defaultValues: Partial<OverviewFormValues> = {
  description: "I own a computer.",
}

export function OverviewForm() {

  const categories = useQuery(api.categories.get);
  const [subcategories, setSubcategories] = useState<Doc<"subcategories">[]>([]);


  const form = useForm<OverviewFormValues>({
    resolver: zodResolver(OverviewFormSchema),
    defaultValues,
    mode: "onChange",
  })

  function handleCategoryChange(categoryName: string) {
    if (categories === undefined) return;
    const selectedCategory = categories.find(category => category.name === categoryName);
    if (selectedCategory) {
      setSubcategories(selectedCategory.subcategories);
    }
  }

  function onSubmit(data: OverviewFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="I will do something amazing" {...field} />
              </FormControl>
              <FormDescription>
                Craft a keyword-rich Gig title to attract potential buyers.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about the gig"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                A strong Gig description is vital, it introduces services, expertise, and builds trust with clients.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={(categoryName: string) => {
                  field.onChange(categoryName);
                  handleCategoryChange(categoryName);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                {categories && (
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category._id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                )}
              </Select>
              <FormDescription>
                Select a category most relevant to your service.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Subcategory field */}
        {subcategories.length > 0 && (
          <FormField
            control={form.control}
            name="subcategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subcategory</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subcategory" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {subcategories.map((subcategory, index) => (
                      <SelectItem key={index} value={subcategory.name}>
                        {subcategory.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Subcategory will help buyers pinpoint your service more narrowly.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type="submit">Save</Button>
      </form>
    </Form>
  )
}
