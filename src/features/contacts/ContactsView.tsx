export function ContactsView() {
  return (
    <section className="editorial view-padding grid h-full gap-8 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
      <div className="flex max-w-xl flex-col justify-center">
        <p className="eyebrow mb-6">Личное знакомство</p>
        <h1 className="font-serif text-4xl leading-tight md:text-5xl">
          Почувствуйте
          <br />
          свой интерьер.
        </h1>
        <p className="mt-7 text-base leading-relaxed text-muted">
          Рассмотрите фактуры, сравните оттенки и найдите предметы, с которыми хочется жить.
        </p>
        <p className="mt-6 border-t border-ink/15 pt-6 text-sm text-muted">Контакты шоурума скоро появятся здесь.</p>
      </div>
      <img src="/media/decor.jpg" alt="Детали интерьера шоурума" className="h-full min-h-0 w-full rounded-sm object-cover" />
    </section>
  );
}
