export function Header() {
    return (
        <header className="flex items-center justify-center py-5">
            <nav className="flex items-center justify-center">
                <ul className="flex flex-row items-center gap-x-8">
                    <li className="font-medium text-teal-600 cursor-pointer transition-all hover:scale-95">
                        Início
                    </li>
                    <li className="font-medium text-teal-600 cursor-pointer transition-all hover:scale-95">
                        <a href="/login" >Login</a>
                    </li>
                    <li className="font-medium text-teal-600 cursor-pointer transition-all hover:scale-95">
                    <a href="/register">Cadastro</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}