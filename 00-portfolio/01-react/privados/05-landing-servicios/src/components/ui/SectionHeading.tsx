import type { ReactNode } from "react";

type Props = {
  /** Va en el <h2>: la <section> lo usa en aria-labelledby. */
  id: string;
  eyebrow: string;
  /** El color del antetítulo: cada sección usa el de un servicio. */
  eyebrowClassName: string;
  title: string;
  children?: ReactNode;
};

export function SectionHeading({ id, eyebrow, eyebrowClassName, title, children }: Props) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      {/* En mayúsculas por CSS y no en el texto: escrito "NUESTROS SERVICIOS", algunos
          lectores de pantalla lo deletrean como si fuera una sigla. */}
      <p
        className={`text-[13px] font-bold tracking-[1.5px] uppercase md:text-[14px] ${eyebrowClassName}`}
      >
        {eyebrow}
      </p>
      <h2
        id={id}
        className="font-display text-[30px] leading-[1.1] font-bold text-balance md:text-[36px] lg:text-[44px]"
      >
        {title}
      </h2>
      {children && (
        <p className="max-w-[620px] text-[16px] leading-[1.6] text-pretty text-muted md:text-[18px]">
          {children}
        </p>
      )}
    </div>
  );
}
