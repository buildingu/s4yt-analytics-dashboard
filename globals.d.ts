declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_CONNECTION: string;
      DB_NAME: string;
      DB_COLLECTION: string;
      EXCLUSIONS: string;
    }
  }
}

// This is required to make the file a module
export {};
