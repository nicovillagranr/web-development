import { Title } from "../UI/Title/Title";
import { NavBar } from "./NavBar/NavBar";

export const Header = () => {
    return (
        <header className="h-[10vh] bg-gray-900 flex justify-between items-center px-8">
            <Title title="Feature Games" />
            <NavBar />
        </header>
    )
}