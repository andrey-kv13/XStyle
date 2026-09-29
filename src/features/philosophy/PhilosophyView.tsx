import { assetPath } from '../../shared/lib/assetPath';

export function PhilosophyView() {
  return (
    <section className="editorial view-padding grid h-full min-h-0 gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
      <img
        className="h-full min-h-0 w-full rounded-sm object-cover"
        src={assetPath('media/table-detail.jpg')}
        alt="Фактура и детали обеденного стола"
      />
      <div className="flex max-w-xl flex-col justify-center">
        <p className="eyebrow mb-6">Философия X-style</p>
        <h1 className="font-serif text-4xl leading-tight md:text-5xl">
          Меньше шума.
          <br />
          <span className="text-sage">Больше смысла.</span>
        </h1>
        <p className="mt-7 text-base leading-relaxed text-muted">
          Мы ценим вещи, к которым хочется прикоснуться. Честные фактуры, спокойные формы и пропорции, которые
          чувствуешь с первого взгляда.
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted">
          Хорошая мебель оставляет место для главного: вашей жизни.
        </p>
        <span className="signature mt-8 font-serif text-2xl text-brass">X-style.</span>
      </div>
    </section>
  );
}
