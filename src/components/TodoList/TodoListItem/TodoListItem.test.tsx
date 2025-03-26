import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoListItem from "./TodoListItem";
import { TodoListItem as TTodoListItem } from "@/types";

const mockItem: TTodoListItem = { id: 1, text: "Test Task", done: false };
const mockOnChange = jest.fn();

describe("TodoListItem", () => {
	test("renders task text", () => {
		render(
			<TodoListItem
				item={mockItem}
				onCheckedChange={mockOnChange}
			/>
		);
		expect(screen.getByText("Test Task")).toBeInTheDocument();
	});

	test("calls onCheckedChange when checkbox clicked", async () => {
		const user = userEvent.setup();
		render(
			<TodoListItem
				item={mockItem}
				onCheckedChange={mockOnChange}
			/>
		);

		const checkbox = screen.getByRole("checkbox");
		await user.click(checkbox);

		expect(mockOnChange).toHaveBeenCalledWith(mockItem, true);
	});

	test("shows checked style when done", () => {
		const doneItem = { ...mockItem, done: true };
		render(
			<TodoListItem
				item={doneItem}
				onCheckedChange={mockOnChange}
			/>
		);

		const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
		expect(checkbox.checked).toBe(true);
	});
});
