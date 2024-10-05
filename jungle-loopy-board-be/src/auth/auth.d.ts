declare global {
  declare module "express" {
    interface Response {
      user: {
        email: string;
        name: string;
      }
    }
  }
};