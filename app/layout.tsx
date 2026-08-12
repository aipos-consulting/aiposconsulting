import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AIPOS Consulting | AI Strategy to Execution',
  description:
    '스타트업·중소기업을 위한 AI·AX 전략 컨설팅과 정부지원사업 4-Week MVP 개발을 제공합니다.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
