export { default } from "next-auth/middleware";

export const config = {
  matcher: [ "/todo/:path*","/users/:path*"],
};
