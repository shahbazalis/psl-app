const nextConfig = {
    pageExtensions: ["ts", "tsx"],
    images: {
      remotePatterns: [{
        protocol:"https",
        hostname:"psl-s3-bucket.s3.us-east-2.amazonaws.com"}],
    },
    redirects() {
      return [
        {
          source: "/",
          destination: "/home",
          permanent: true,
        },
      ];
    },
  };
  
  export default nextConfig;