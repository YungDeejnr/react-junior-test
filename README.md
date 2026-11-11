# React Junior Test

A small todo app with missing and broken pieces. About 30-45 minutes.

## Setup

    npm install
    npm run dev      # run the app
    npm test         # run the checks

## Tasks

Edit `src/App.jsx`, `src/components/TodoForm.jsx` and `src/components/TodoList.jsx`.
Do not edit `src/App.test.jsx`.

1. **Fix toggle.** Clicking a checkbox should visibly toggle the todo.
2. **Add todo.** Controlled input, clears after adding, ignores empty text. Give new todos a unique id.
3. **Delete todo.**
4. **Filter.** Buttons named `All`, `Active`, `Done`.
5. **Items left.** Show `N items left` (`1 item left` when N is 1).
6. **Fix the smell** in `TodoList.jsx`.
7. **Composition.** Build `Panel` (`src/components/Panel.jsx`) so it takes `title`, `children`
   and an optional `footer`. Wrap the list in `<Panel title="Your todos">` and pass the
   items-left text as the footer. `Panel` must not know anything about todos.

Bonus (optional): persist todos to `localStorage`, or refactor to `useReducer`.

## Notes for the candidate

Keep it simple. No extra libraries. Be ready to explain your choices.

---

## Reviewer guide

| Task | What good looks like | Red flags |
|------|----------------------|-----------|
| 1 | New array via `map`, new object via spread | Still mutating, or `setTodos([...todos])` hack |
| 2 | `useState` in form, `onChange`, `e.preventDefault()`, `trim()` | Reading the input via `document.querySelector` or ref for no reason |
| 3 | `filter` | `splice` on state |
| 4 | Store only the filter string, compute the list during render | Storing a second `filteredTodos` state and syncing it with `useEffect` |
| 5 | Derived value during render | A `remaining` state updated in every handler |
| 6 | `key={todo.id}` | Index keys left in place |
| 7 | `children` and a `footer` slot; Panel is generic and reusable | Panel importing `TodoList`, passing an `items` prop, a `type` prop that switches content, `dangerouslySetInnerHTML` |

Follow-up questions:
- Why did Task 1 not re-render even though `setTodos` was called?
- Where should the filter state live, and why?
- Why `children` instead of a `content` or `items` prop? When would you use a render prop or Context instead?
- When would you reach for `useReducer` or Context instead of `useState`?
