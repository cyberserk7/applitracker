"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useModalStore } from "@/hooks/use-zustand";
import {
  addApplicationSchema,
  applicationStatuses,
  workTypes,
} from "@/schema/add-application-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";

export const AddApplicationForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { onClose } = useModalStore();

  const form = useForm<z.infer<typeof addApplicationSchema>>({
    resolver: zodResolver(addApplicationSchema),
    defaultValues: {
      jobRole: "",
      companyName: "",
      salary: 0,
      jobCountry: "",
      jobLocation: "",
      workType: "Onsite",
      applicationStatus: "Bookmarked",
      jobPostLink: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof addApplicationSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="jobPostLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Posting Link</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="https://www.linkedin.com/jobs/view/123456789/"
                    type="text"
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jobRole"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Backend Developer"
                    type="text"
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Google"
                    type="text"
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Salary{" "}
                  <span className="text-gray-400 font-normal">(Per Annum)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Rs. 28,00,000"
                    type="number"
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2 items-center">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="jobLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Hyderabad"
                        type="text"
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1">
              <FormField
                control={form.control}
                name="jobCountry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="India"
                        type="text"
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="workType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Work Type</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full ">
                      <SelectValue placeholder="Select Type" className="" />
                    </SelectTrigger>
                    <SelectContent>
                      {workTypes.map((workType, index) => (
                        <SelectItem key={index} value={workType}>
                          {workType}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="applicationStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Application Status</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full ">
                      <SelectValue placeholder="Select Status" className="" />
                    </SelectTrigger>
                    <SelectContent>
                      {applicationStatuses.map((applicationStatus, index) => (
                        <SelectItem key={index} value={applicationStatus}>
                          {applicationStatus}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <SubmitButton isLoading={submitting} label="Add Application" />
      </form>
    </Form>
  );
};
