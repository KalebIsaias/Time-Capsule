import { Copyright } from '@/components/Copyright'
import { EmptyMemory } from '@/components/EmptyMemory'
import { Hero } from '@/components/Hero'
import { SignIn } from '@/components/SignIn'

export default function Home() {
  return (
    <main className="grid grid-cols-2 min-h-screen">
      {/* Left */}
      <div className="relative flex flex-col items-start justify-between overflow-hidden bg-[url(../assets/bg-stars.svg)] bg-cover px-28 py-16 border-r border-white/10">
        {/* Blur */}
        <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full"/>

        {/* Stripes */}
        <div className="absolute bottom-0 top-0 right-2 w-2 bg-stripes" />

        <SignIn />
        <Hero />
        <Copyright />
      </div>
      
      {/* Right */}
      <div className="flex flex-col p-16 bg-[url(../assets/bg-stars.svg)] bg-cover">
        <EmptyMemory />
      </div>
    </main>
  )
}
