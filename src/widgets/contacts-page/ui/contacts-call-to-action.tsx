import { ArrowRight02StrokeRoundedIcon } from "@/shared/lib/icons";
import { Button } from "@/shared/ui/button";

type Props = {
  telegramHref: string;
};

export const ContactsCallToAction = (props: Props) => {
  const { telegramHref } = props;

  return (
    <section className="flex min-h-32.5 items-center justify-between gap-6 rounded-site-24 bg-site-surface px-8 py-7.5 max-[680px]:flex-col max-[680px]:items-start max-[680px]:p-6">
      <div className="min-w-0">
        <h2 className="font-heading text-[21px]! leading-[1.25]! font-semibold max-[680px]:text-[18px]!">
          Начните с пары предложений.
        </h2>
        <p className="mt-2 text-[15px] leading-[1.4] text-site-subtle max-[680px]:text-[14px]">
          Напишите, что нужно сделать. Остальное уточним по ходу разговора.
        </p>
      </div>
      <Button
        nativeButton={false}
        render={<a href={telegramHref} target="_blank" rel="noopener noreferrer" />}
        size="lg"
        className="min-h-14.5 shrink-0 cursor-pointer gap-2 rounded-full bg-site-green px-6 text-[15px] font-semibold text-[#0d2315] hover:bg-site-green focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-site-text max-[680px]:w-full"
      >
        Написать в Telegram
        <ArrowRight02StrokeRoundedIcon aria-hidden="true" size={20} />
      </Button>
    </section>
  );
};
