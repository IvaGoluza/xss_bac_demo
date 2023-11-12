import Link from 'next/link'

export default function Home() {
  return (
    <main className='bg-slate-800 min-h-screen min-w-full'>
      <div className='m-auto pt-20 w-fit'>
         <h2 className='text-3xl font-bold text-white'>Web <span className='text-red-700'>attacks</span> are inevitable,</h2>
         <h2 className='text-3xl font-bold text-white'>Data loss is not.</h2>
         <h3 className='text-white mt-2'>[Odaberite ranjivost]</h3>
         <div className='flex flex-col my-20 gap-8'>
            <Link href="/xss" className='border-2 border-white rounded-md text-center py-2 text-xl font-bold text-slate-400 transition-colors hover:border-green-400 hover:text-green-400'>XSS</Link>
            <Link href="/bac/user" className='border-2 border-white rounded-md text-center py-2 text-xl font-bold text-slate-400 transition-colors hover:border-green-400 hover:text-green-400'>Broken Access Control</Link>
         </div>
      </div>
      
    </main>
  )
}
