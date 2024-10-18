// utils/env.ts
export const ensureEnvVariables = (requiredEnvVars: string[]) => {
    requiredEnvVars.forEach((envVar) => {
      if (!process.env[envVar]) {
        throw new Error(`Environment variable ${envVar} is not set`);
      }
    });
  };
  