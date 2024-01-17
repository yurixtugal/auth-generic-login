"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { RegisterSchema } from "@/schemas";
import { FormErrorMessage } from "@/components/form-error";
import { FormSuccessMessage } from "@/components/form-success";
import { register } from "@/actions/register";

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

const RegisterForm = (
  {isAppPrivate,
  fromRegisterAdmin
  }: {isAppPrivate: boolean, fromRegisterAdmin: boolean}
) => {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState< string | undefined >("");
  const [error, setError] = useState< string | undefined >("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
     
    },
  });

  const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      register(data)
      .then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };
 
  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel={fromRegisterAdmin?"":"Already have an account?"}
      backButtonHref={fromRegisterAdmin?"":"/auth/login"}
      showSocial={!isAppPrivate}
      isAppPrivate={isAppPrivate}
      isFromRegisterAdmin={fromRegisterAdmin}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
          <FormField
              control={form.control}
              name="firstName"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Yuri"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Portugal"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="password"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="********" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormErrorMessage message={error} />
          <FormSuccessMessage message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Create an account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
