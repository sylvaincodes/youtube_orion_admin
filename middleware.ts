import { NextResponse } from "next/server";

import {
  clerkClient,
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";

const isAuthRoute = createRouteMatcher(["/stores(.*)"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const client = await clerkClient();
  const { isSignedIn } = await client.authenticateRequest(req);

  // protect url access pages for sellers
  if (isAuthRoute(req) && !isSignedIn)
    await auth.protect({
      unauthenticatedUrl: process.env.NEXT_PUBLIC_SERVER_URL + "/sign-in",
    });

  // protect url access pages for admin
  if (
    isAdminRoute(req) &&
    (await auth()).sessionClaims?.metadata.role === undefined
  ) {
    return NextResponse.redirect(new URL("/forbidden", req.url));
  }

  //else
  return NextResponse.next();
});
