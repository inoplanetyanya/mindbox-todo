import React from "react";
import { render, screen } from "@testing-library/react";
import TodoList from "./TodoList";
import { TodoListItem } from "@/types";

const mockItems: TodoListItem[] = [
	{ id: 1, text: "Task 1", done: false },
	{ id: 2, text: "Task 2", done: true },
];

describe("TodoList", () => {
	test("renders all tasks", () => {
		render(<TodoList todoList={mockItems} />);

		expect(screen.getByText("Task 1")).toBeInTheDocument();
		expect(screen.getByText("Task 2")).toBeInTheDocument();
		expect(screen.getByText("1 items left")).toBeInTheDocument();
	});

	test("renders title and input", () => {
		render(<TodoList todoList={mockItems} />);

		expect(screen.getByText("todos")).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText("What needs to be done?")
		).toBeInTheDocument();
	});
});
