export function getSourceUrl () {
  return process.env.NODE_ENV === 'production'
    ? 'https://boomstream.com'
    : 'https://hwd.boomstream.com'
}
