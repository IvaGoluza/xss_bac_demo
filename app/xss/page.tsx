import React from 'react'
import XSSvulnerability from '../components/XSSvulnerability'


const XssPage = async () => {

  return (
    <div className='bg-slate-800 min-h-screen min-w-full'>
        <div className='m-auto pt-20 w-3/4 max-w-3xl min-h-screen'>
            <h1 className='text-4xl font-bold text-red-700 mb-6'>[XSS]</h1> 
            <p className='text-white font-bold text-left'>Primjer prikazuje isječak zamišljene ranjive web stranice koja traži korisnika da upiše svoje ime, a zatim ga izravno prikazuje na stranici unutar pozdrava (postavljanjem .innerHTML diva). Korisnik može iskorititi ovaj DOM, lokalni XSS propust, te unosom skripte izvršiti određeni kod.</p>
            <p className='text-green-400 mt-2'>Napad je moguće spriječiti prethodnim pregledom korisničkog unosa (npr. DOMPurify.sanitize(input))</p>
            <p className='text-slate-400 mt-2'>{"[Primjer napada] Umjesto korisničkog imena unesite neku skriptu:"}</p>
            <p className='text-slate-400'>{"<script>alert('XSS napad')</script>"}</p>
            <p className='text-slate-400 mt-10'>Označite checkbox ako želite uspješno izvesti XSS napad. </p>
            <XSSvulnerability />
        </div>
    </div>
  )
}

export default XssPage