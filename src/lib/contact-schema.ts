import { z } from "zod";

export const contactReasonValues = ["job", "project", "other"] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  reason: z.enum(contactReasonValues),
  message: z.string().trim().min(20).max(5000),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactPayload = z.infer<typeof contactSchema>;
