import { TypeOf, z } from 'zod';

export const loginSchema = z.object({
    username: z
        .string({ required_error: 'Username cannot be empty.' })
        .min(4, { message: 'Username must be at least 4 characters long.' }),
    password: z
        .string({ required_error: 'Password cannot be empty' })
        .min(4, { message: 'Password must be at least 4 characters long' }),
});

export type Login = TypeOf<typeof loginSchema>;

export const registerSchema = z
    .object({
        username: z
            .string()
            .min(4, 'Username must be at least 4 characters long.'),
        email: z
            .string()
            .min(6, 'Email must be at least 6 characters long.')
            .email({ message: 'You must enter a valid email' }),
        password: z
            .string()
            .min(6, 'Password must be at least 6 characters long'),
        confirmPassword: z
            .string()
            .min(6, 'Confirm password must be at least 6 characters long'),
    })
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
        message: 'Passwords do not match, check again.',
        path: ['confirmPassword'],
    });

export type Register = TypeOf<typeof registerSchema>;

export const ticketSchema = z.object({
    title: z
        .string()
        .min(4, 'Ticket title must be at least 4 characters long.')
        .max(64, {
            message: 'Ticket title cannot be longer than 64 characters.',
        }),
    description: z
        .string()
        .min(10, 'Ticket description must be at least 10 characters long.'),
    severity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
    username: z.string().min(4, 'Username must be at least 4 characters long.'),
});

export type Ticket = TypeOf<typeof ticketSchema>;

export const messageSchema = z.object({
    message: z.string().min(4, 'Message must be at least 4 characters long.'),
    role: z.enum(['USER', 'ADMIN']),
    id: z.string().min(4, 'ID must be at least 4 characters long.'),
});

export type Message = TypeOf<typeof messageSchema>;
