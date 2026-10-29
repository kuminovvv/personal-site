import type {Locale} from "@/shared/lib/i18n/locale";
import {getVisualText} from "../model/locale-content";

type VisualHeroProps = { locale?: Locale };

export const VisualHero = (props: VisualHeroProps) => {
    const {
        locale = "ru",
    } = props;
    const text = getVisualText(locale);
    return (
        <section
            className="relative left-1/2 flex w-[calc(100%+140px)] max-w-[1660px] -translate-x-1/2 flex-col items-center gap-9 text-center max-[1200px]:w-full max-[768px]:gap-7">
            <h1 className="flex flex-col items-center text-[clamp(48px,10vw,192px)] leading-[.94] font-semibold tracking-[-.046em] text-site-home-text max-[1024px]:text-[clamp(36px,7.7vw,78px)]">
                <span data-motion-intro="line" data-motion-order="0" className="block">{text.heroLines[0]}</span>
                <span data-motion-intro="line" data-motion-order="1"
                      className="-mt-[.099em] block">{text.heroLines[1]}</span>
            </h1>
            <p data-motion-intro="description"
               className="font-(family-name:--font-visual-text) text-[clamp(15px,1.1vw,21px)] leading-[1.38] tracking-[-.0018em] text-site-home-text">
                {text.heroDescription}
            </p>
        </section>
    );
};
