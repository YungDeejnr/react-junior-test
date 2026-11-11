// Task 7: build a reusable Panel using composition.
//
// <Panel title="Your todos" footer={<p>2 items left</p>}>
//   ...any children...
// </Panel>
//
// - Renders a <section> labelled by `title` (aria-label={title}) with an <h2> heading.
// - Renders `children` as the body. Panel must not know about todos.
// - Renders `footer` after the body only if it is provided.
export default function Panel({title,children,footer}) {
  return (
    <section aria-label={title}>
      <h2>{title}</h2>
      {children}
      {footer && <footer>{footer}</footer>}
    </section>
  );
}
