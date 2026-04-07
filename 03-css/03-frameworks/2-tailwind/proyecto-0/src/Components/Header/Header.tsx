import "./Header.css"

import { Title } from "../UI/Title/Title";
import { NavBar } from "./NavBar/NavBar";

export const Header = () => {
    return (
        <header className="header">
            <Title title="Feature Games" />
            <NavBar />
        </header>
    )
}