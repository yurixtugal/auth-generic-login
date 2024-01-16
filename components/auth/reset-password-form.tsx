"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { ResetPasswordSchema } from "@/schemas";
import { FormErrorMessage } from "@/components/form-error";
import { FormSuccessMessage } from "@/components/form-success";
import { ResetPassword } from "@/actions/reset-password";


import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const ResetPasswordForm = () => {

  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState< string | undefined >("");
  const [error, setError] = useState< string | undefined >("");

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: z.infer<typeof ResetPasswordSchema>) => {
    startTransition(() => {
    ResetPassword(data)
      .then((data) => {
          setError(data?.error);
          
          setSuccess(data?.success);
      });
      
    });
  };

  return (
    <CardWrapper
      headerLabel="Forgot your password?"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
      showSocial={false}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="yurixtugal@gmail.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormErrorMessage message={error} />
          <FormSuccessMessage message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Reset Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ResetPasswordForm;
