import z from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(3000)
})

console.log('env', process.env)

export const ENV = envSchema.parse(process.env)
