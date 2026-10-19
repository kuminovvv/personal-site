import Image from "next/image";

const asset = "/design/home/";

export const CodeWindow = () => {
  return (
    <div className="mt-7.5 h-58.75 rounded-[18px] bg-[#22272b] p-4.25 [&_code]:mt-4.5 [&_code]:grid [&_code]:gap-2.75 [&_code]:whitespace-nowrap [&_code]:text-[12px] [&_code_span]:text-[#b5bbb7] [&_code_em]:not-italic [&_code_em]:text-site-green">
      <div className="flex items-center justify-between text-[11px] text-[#b5bbb7]">
        <Image
          src={asset + "stack-core-detail.svg"}
          alt=""
          width={65}
          height={12}
        />
        <span>app / components / ui.tsx</span>
      </div>
      <code>
        <span>01　 const interface = {"{"}</span>
        <span>
          02　　 framework: <em>&quot;Next.js&quot;</em>,
        </span>
        <span>
          03　　 language: <em>&quot;TypeScript&quot;</em>,
        </span>
        <span>
          04　　 components: <em>&quot;React&quot;</em>,
        </span>
        <span>05　 {"}"};</span>
      </code>
    </div>
  );
};
