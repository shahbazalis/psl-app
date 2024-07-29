import { hostname } from "os";

const nextConfig = {
    pageExtensions: ["ts", "tsx"],
    //reactStrictMode: true,
    images: {
      remotePatterns: [{
        protocol:"https",
        hostname:"psl-s3-bucket.s3.us-east-2.amazonaws.com"}],
    },
    redirects() {
      return [
        {
          source: "/",
          destination: "/auth/register",
          permanent: true,
        },
      ];
    },
  };
  
  export default nextConfig;