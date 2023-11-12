'use client'

import Link from 'next/link'
import { LoginButton, LogoutButton } from '@/app/components/auth';
import { useSession } from 'next-auth/react';
import React,  { useState, useEffect } from 'react'


const BacPage = () => {
  const [isVulnerable, setIsVulnerable] = useState(false);
  const {data:session} = useSession()
  const userInfo : any = session?.user;

  useEffect(() => {
    document.cookie = `isVulnerable=${isVulnerable}; path=/`;
    console.log(JSON.stringify(document.cookie))
  }, [isVulnerable]);
  
  const checkboxHandler = () => {
    setIsVulnerable((prev) => !prev);
  }

  return (
    <div className='bg-slate-800 min-h-screen min-w-full'>
        <div className='m-auto pt-20 w-3/4 max-w-3xl min-h-screen'>
            <h1 className='text-4xl font-bold text-red-700 mb-6'>[Broken Access Control]</h1> 
            {!session?.user && <p className='text-white mt-5'>Označite checkbox ako želite iskoristiti lošu kontrolu pristupa.</p>}
            {!session?.user && <div className="mt-1 mb-5 flex gap-1 items-center">
              <input
                id="checkboxVulnerability"
                type="checkbox"
                className="h-5 w-5 cursor-pointer peer"
                checked={isVulnerable}
                onChange={checkboxHandler}
              />
              <label
                htmlFor="checkboxVulnerability"
                className="cursor-pointer text-white font-bold peer-checked:text-red-500"
              >
               Uključena ranjivost
              </label>
            </div>}
            {!session?.user && 
             <div> 
              <p className='mt-2 text-white font-md text-left'>Ako želite administratorske ovlasti prijavite se pomoću:</p>
              <p className='text-white font-md text-left'>Email: admin@web.hr  Password: 1234</p>
              <p className='mt-2 text-white text-left'>Za demonstraciju loše kontrole pristupa prijavite proizvoljnim korisničkim informacijama. Svaki novi korisnik ima BASIC ovlasti i ne bi trebao imati pristup administratorskim stranicama.</p>
             </div>}
            {session?.user && <p className='text-white font-bold text-left'>Prijavljeni ste kao {userInfo.role} korisnik {userInfo.role === "ADMIN" ? "":"(nemate administratorske ovlasti)"}.</p>}
            {userInfo?.isVulnerable === true && userInfo.role === "BASIC" && <p className='text-white font-bold text-left'>Odabrali ste ranjivu opciju pristupa stranici. Napad je moguć.</p>}
            {userInfo?.isVulnerable === false && userInfo.role === "BASIC" && <p className='text-white font-bold text-left'>Odabrali ste sigurnu opciju pristupa stranici. Napad nije moguć.</p>}
            {session?.user &&  <LogoutButton/>}
            {!session?.user && <LoginButton/>}
            {session?.user &&  <p className='text-white'>Ako želite promijeniti sigurnosnu opciju, odjavite se i ponovno popunite Broken Access Control izbornik.</p>}
            {userInfo?.role !== "ADMIN" && <div>
             <p className='mt-5 text-slate-400 text-left'>Obratite pozornost na URL stranice. Napadač može primjetiti da je u njemu prikazana korisnička uloga (/user), te pokušati zamijeniti taj dio URL-a u “admin”. Ako ste uključili ranjivost, Vaš napad će biti uspješan i pristupit ćete administratorskoj stranici. </p>
             <p className='mt-5 text-slate-400 text-left'>[Primjer napada]</p>
             <p className='mb-5 text-slate-400 text-left'> a) Promijenite 'user' dio URL-a u 'admin' i pokušajte pristupiti administratorskoj stranici.</p>
             <p className='my-5 text-slate-400 text-left'> b) Rijetko će se dogoditi da aplikacija korisniku bez administratorskih ovlasti ponudi odlazak na administratorsku stranicu, no ovdje je pružena i ta opccija zbog lakše demonstracije napada.</p>
            </div>}
            {userInfo?.role === "ADMIN" && <p className='mt-5 mb-3 text-white font-md text-left'>Pristupite administratorskoj stranici.</p>}
            <Link href="/bac/admin" className='border border-white text-center py-2 px-3 rounded-md text-sm text-white transition-colors hover:border-red-700 hover:text-red-700'>ADMIN PAGE</Link>
            <p className='text-green-400 mt-5'>Napad je moguće spriječiti korištenjem Auth0 Next.js SDK-a kojim možemo pristupiti korisničkim informacijama, uključujući i ulogu korisnika. <br/> Povjerljivu administratorsku stranicu prikazujemo samo ako korisnik ima potrebne ovlasti. <br/> Ova vrsta provjere 'role based authentication' može se izvoditi server side, client side i koristeći middleware. U primjeru je korištena server side provjera.</p>
        </div>
    </div>
  )
}

export default BacPage