const SectionHeading = ({ eyebrow, title, description, align = 'left' }) => {
  const alignment = align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start'

  return (
    <div className={`flex max-w-2xl flex-col gap-3 ${alignment}`}>
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </span>
      )}
      <h2 className="text-balance text-3xl font-semibold sm:text-4xl">{title}</h2>
      {description && (
        <p className="text-balance text-base leading-relaxed text-muted">{description}</p>
      )}
    </div>
  )
}

export default SectionHeading
