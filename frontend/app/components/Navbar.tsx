import { Link } from "@remix-run/react";
import { Bell, ReceiptEuro, UserRound } from "lucide-react";
import { useOptionalUser } from "~/root";

export const Navbar = ({ logo }: { logo: string }) => {
    const user = useOptionalUser();

    return (<nav className='px-3 py-2 bg-bleu text-white flex justify-between items-center'>
        <img src={logo} className='w-full h-auto max-w-[120px]' />
        <div className='flex gap-2'>
            { user ? <span>{user.name}</span> : null }
            <Link to='/'><ReceiptEuro className="flex-shrink-0" /></Link>
            <Link to='/'><Bell className="fill-white flex-shrink-0" /></Link>
            <Link to={user ? '/profile' : '/login'}>
                <UserRound className="flex-shrink-0" />
            </Link>
            { user ? 
                    <form method="POST" action="/auth/logout">
                        <button type="submit">Se déconnecter</button>
                    </form> 
                : 
                    null 
            }
        </div>
    </nav>)
}