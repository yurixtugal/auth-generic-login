import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Email is required'
    }),
    password: z.string().min(1,{
        message: 'Password is required'
    })
});

export const NewPasswordSchema = z.object({
    password: z.string().min(6,{
        message: 'Min 6 characters required'
    })
});

export const ResetPasswordSchema = z.object({
    email: z.string().email({
        message: 'Email is required'
    }),
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: 'Email is required'
    }),
    password: z.string().min(6,{
        message: 'Min 6 characters required'
    }),
    firstName: z.string().min(1,{
        message: 'First Name is required'
    }),
    lastName: z.string().min(1,{
        message: 'Last Name is required'
    })

});