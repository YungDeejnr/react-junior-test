import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import Panel from "./components/Panel";

const setup = () => ({ user: userEvent.setup(), ...render(<App />) });

test("1. toggling a todo updates the UI", async () => {
  const { user } = setup();
  const box = screen.getByLabelText("Toggle Learn props");
  expect(box).not.toBeChecked();
  await user.click(box);
  expect(box).toBeChecked();
});

test("2. adds a todo and clears the input", async () => {
  const { user } = setup();
  const input = screen.getByLabelText("New todo");
  await user.type(input, "Write tests");
  await user.click(screen.getByRole("button", { name: "Add" }));
  expect(screen.getByText("Write tests")).toBeInTheDocument();
  expect(input).toHaveValue("");
});

test("2b. ignores empty or whitespace-only todos", async () => {
  const { user } = setup();
  await user.type(screen.getByLabelText("New todo"), "   ");
  await user.click(screen.getByRole("button", { name: "Add" }));
  expect(screen.getAllByRole("listitem")).toHaveLength(2);
});

test("3. deletes a todo", async () => {
  const { user } = setup();
  await user.click(screen.getByLabelText("Delete Learn useState"));
  expect(screen.queryByText("Learn useState")).not.toBeInTheDocument();
});

test("4. filters todos", async () => {
  const { user } = setup();
  await user.click(screen.getByRole("button", { name: "Active" }));
  expect(screen.queryByText("Learn useState")).not.toBeInTheDocument();
  expect(screen.getByText("Learn props")).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: "Done" }));
  expect(screen.getByText("Learn useState")).toBeInTheDocument();
  expect(screen.queryByText("Learn props")).not.toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: "All" }));
  expect(screen.getAllByRole("listitem")).toHaveLength(2);
});

test("5. shows how many items are left", async () => {
  const { user } = setup();
  expect(screen.getByText("1 item left")).toBeInTheDocument();
  await user.click(screen.getByLabelText("Toggle Learn props"));
  expect(screen.getByText("0 items left")).toBeInTheDocument();
  await user.click(screen.getByLabelText("Toggle Learn useState"));
  expect(screen.getByText("1 item left")).toBeInTheDocument();
});

test("7. Panel composes arbitrary children and an optional footer", () => {
  const { unmount } = render(
    <Panel title="Hello" footer={<p>the footer</p>}>
      <button>child one</button>
      <em>child two</em>
    </Panel>
  );
  const region = screen.getByRole("region", { name: "Hello" });
  expect(within(region).getByRole("heading", { name: "Hello" })).toBeInTheDocument();
  expect(within(region).getByRole("button", { name: "child one" })).toBeInTheDocument();
  expect(within(region).getByText("child two")).toBeInTheDocument();
  expect(within(region).getByText("the footer")).toBeInTheDocument();
  unmount();

  render(<Panel title="No footer"><p>body</p></Panel>);
  expect(screen.getByText("body")).toBeInTheDocument();
  expect(screen.queryByText("the footer")).not.toBeInTheDocument();
});

test("7b. App uses Panel around the list, with the count as footer", () => {
  setup();
  const region = screen.getByRole("region", { name: "Your todos" });
  expect(within(region).getAllByRole("listitem")).toHaveLength(2);
  expect(within(region).getByText("1 item left")).toBeInTheDocument();
});
