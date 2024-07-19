const nextConfig = {
    pageExtensions: ["ts", "tsx"],
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