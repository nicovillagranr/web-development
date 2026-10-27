import { site } from "../data/site";
import { Container } from "./ui/Container";

export function Footer() {
  return (
    <footer className="bg-surface py-8 text-[13px] text-muted">
      <Container className="flex flex-col gap-2 md:flex-row md:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}. Sitio de demostración: marca y datos ficticios.
        </p>
        <p>
          Diseño y desarrollo:{" "}
          <a
            href="https://nico-villagran.com"
            className="text-ink underline underline-offset-2 hover:text-accent"
          >
            Nico Villagrán
          </a>
        </p>
      </Container>
    </footer>
  );
}
