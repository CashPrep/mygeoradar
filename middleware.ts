import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(req: NextRequest) {
  let response = NextResponse.next({ request: req })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
          cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value))
          response = NextResponse.next({ request: req })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options as Parameters<typeof response.cookies.set>[2])
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const { pathname } = req.nextUrl

  // Protect /account
  if (pathname.startsWith('/account') && !user) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Protect /downloads/* — must be logged in
  if (pathname.startsWith('/downloads/') && !user) {
    return NextResponse.redirect(
      new URL(`/login?next=${encodeURIComponent(pathname)}`, req.url)
    )
  }

  // Protect /dashboard — requires a logged-in user with role === 'admin'
  // Set this on the user in Supabase: Auth > Users > Edit > user_metadata { "role": "admin" }
  if (pathname.startsWith('/dashboard')) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
    const role = (user.user_metadata as Record<string, unknown>)?.role
    if (role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  return response
}

export const config = {
  matcher: ['/account/:path*', '/downloads/:path*', '/dashboard/:path*', '/dashboard'],
}
