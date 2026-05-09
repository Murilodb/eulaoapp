export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/calendar/:path*",
    "/services/:path*",
    "/clients/:path*",
    "/settings/:path*",
  ],
};
