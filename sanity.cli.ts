console.log("SANITY PROJECT:", process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
console.log("SANITY DATASET:", process.env.NEXT_PUBLIC_SANITY_DATASET);
import { defineCliConfig } from "sanity/cli";
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  },
});
