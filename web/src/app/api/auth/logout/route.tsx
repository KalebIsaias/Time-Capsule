import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const redirectURL = new URL('/', req.url)

  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `token=; Path=/; max-age=0;`,
    },
  })
}