import { z } from 'zod'

export const ContactSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    phone: z.string().optional(),
})

export type ContactInput = z.infer<typeof ContactSchema>
