/** @type {import('next').NextConfig} */

const path = require("path");
const allowedImageWordPressDomain = new URL(
  process.env.NEXT_PUBLIC_WORDPRESS_URL
).hostname;

module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      allowedImageWordPressDomain,
      "proshooters.cz",
      "via.placeholder.com",
    ],
  },
};
