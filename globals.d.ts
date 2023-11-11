// globals.d.ts

// Extend the Window interface
declare global {
  interface Window {
    arweaveWallet: {
      connect: (permissions: string[]) => Promise<void>;
      getActiveAddress: () => Promise<string>;
      getWallet: () => Promise<unknown>;
    };
  }
}
 
// This file doesn't export anything, but it must be a module
export {};
