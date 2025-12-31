import { login } from './actions'

export const runtime = 'edge'


// Next.js 15+ 에서는 searchParams가 Promise입니다.
export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const errorMessage = params.error as string

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'var(--admin-bg)',
        color: 'var(--admin-text)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '2rem',
          backgroundColor: 'var(--admin-surface)',
          borderRadius: '12px',
          border: '1px solid var(--admin-border)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1
            style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              fontFamily: 'var(--font-montserrat)',
              marginBottom: '0.5rem',
            }}
          >
            PLOZEN ADMIN
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--admin-text-secondary)' }}>
            Please sign in to continue
          </p>
        </div>

        <form action={login} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Email Field */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label
              htmlFor="email"
              style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--admin-text)' }}
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="admin@plozen.com"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                border: '1px solid var(--admin-border)',
                backgroundColor: 'var(--admin-bg)',
                color: 'var(--admin-text)',
                fontSize: '0.875rem',
                outline: 'none',
              }}
            />
          </div>

          {/* Password Field */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label
              htmlFor="password"
              style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--admin-text)' }}
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                border: '1px solid var(--admin-border)',
                backgroundColor: 'var(--admin-bg)',
                color: 'var(--admin-text)',
                fontSize: '0.875rem',
                outline: 'none',
              }}
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div
              style={{
                padding: '0.75rem',
                borderRadius: '0.5rem',
                backgroundColor: 'rgba(239, 68, 68, 0.1)', // Red with opacity
                color: '#ef4444', // Red-500
                fontSize: '0.875rem',
                textAlign: 'center',
              }}
            >
              {errorMessage}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: 'var(--admin-accent)',
              color: '#000',
              fontWeight: '600',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'opacity 0.2s',
              fontSize: '0.875rem',
            }}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}