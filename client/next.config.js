/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    _API_: 'http://localhost:3333/api/',
    _IS_DEV_: true,
  },
};

module.exports = nextConfig;
