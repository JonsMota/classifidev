import withBundleAnalyzer from '@next/bundle-analyzer'

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})({
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  }
})
