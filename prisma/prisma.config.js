import { defineConfig } from "prisma/config";

const { DATABASE_URL } = process.env;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

export default defineConfig({
  migrate: {
    datasource: {
      url: DATABASE_URL,
    },
  },
});
