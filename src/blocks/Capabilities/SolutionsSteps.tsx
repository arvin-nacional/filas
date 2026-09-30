import type { ApproachBlock } from '@/payload-types'

export const SolutionsSteps = ({
  anchorId,
  eyebrow,
  heading,
  description,
  steps,
}: Pick<ApproachBlock, 'anchorId' | 'eyebrow' | 'heading' | 'description' | 'steps'>) => (
  <section id={anchorId} className="bg-filas-ink py-16 text-filas-paper sm:py-20">
    <div className="mx-auto max-w-[1392px] px-5 sm:px-8 lg:px-14">
      <p className="font-mono text-xs uppercase tracking-widest text-[#e6a48a]">{eyebrow}</p>
      <div className="mt-6 grid gap-6 md:grid-cols-2 md:gap-16">
        <h2 className="text-4xl font-medium leading-tight tracking-tighter sm:text-5xl">
          {heading}
        </h2>
        <p className="max-w-lg text-lg leading-relaxed text-[#c8c4bd]">{description}</p>
      </div>
      <ol className="mt-10 grid gap-8 md:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.id || index} className="border-t border-[#4b4843] pt-5">
            <span className="font-mono text-xs text-[#e6a48a]">0{index + 1}</span>
            <h3 className="mt-4 text-xl font-medium">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#c8c4bd]">{step.description}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
)
