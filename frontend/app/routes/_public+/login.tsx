import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useOptionalUser } from "~/root";

export default function Login() {
    const user = useOptionalUser();

    return (
        <div className="max-w-[600px] mx-auto">
            <h1>Connexion</h1>
            {JSON.stringify(user, null, 2)}

            <form method='POST' action="/auth/login" className="flex flex-col gap-2">
                <Input type="email" name="email"/>
                <Input type="password" name="password"/>

                <Button className="ml-auto" type="submit">Se connecter</Button>
            </form>
        </div>
    )
}