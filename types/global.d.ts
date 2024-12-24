//create a global type for Roles

export type Roles = "admin";
declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
