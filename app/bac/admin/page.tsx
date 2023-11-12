import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { NextApiRequest } from 'next';
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

export interface CustomUser {
  user: {
  name?: string | null | undefined;
  email?: string | null | undefined;
  id?: string | null | undefined;
  role?: string | null | undefined;
  isVulnerable?: boolean | null | undefined;
  }
}

const AdminPage = async () => {
  const session : CustomUser | null = await getServerSession(authOptions);
  if (!session || (session.user.isVulnerable === false && session.user.role !== "ADMIN")) {
    redirect('/bac/user')
    return null;
  } return (
    <div className='bg-slate-800 min-h-screen min-w-full'>
        <div className='m-auto pt-20 w-3/4 max-w-lg min-h-screen'>
            <h1 className='text-4xl font-bold text-red-700 mb-6'>Admin page</h1> 
            <p className='text-white font-bold text-left'>....Povjerljive informacije...</p>
            <p className='text-slate-400 mt-2'>Uspješno ste pristupili administratorskoj stranici.</p>
            <p className='text-slate-400 mt-2'>[Prijavljeni ste kao {JSON.stringify(session.user.role)} korisnik]</p>
        </div>
    </div>
  )
}

export default AdminPage





