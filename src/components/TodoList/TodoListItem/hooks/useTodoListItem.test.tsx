import { renderHook } from "@testing-library/react";
import { act } from "react";
import useTodoListItem from "./useTodoListItem";
import { TodoListItem } from "@/types";

describe("useTodoListItem", () => {
	const mockItem: TodoListItem = { id: 1, text: "Test Task", done: false };
	const mockOnChange = jest.fn();

	test("should initialize with item status", () => {
		const { result } = renderHook(() =>
			useTodoListItem({ item: mockItem, onCheckedChange: mockOnChange })
		);

		expect(result.current.done.value).toBe(false);
	});

	test("should update status and call callback", () => {
		const { result } = renderHook(() =>
			useTodoListItem({ item: mockItem, onCheckedChange: mockOnChange })
		);

		act(() => {
			//@ts-ignore
			result.current.onChange({
				target: { checked: true },
			} as React.ChangeEvent<HTMLInputElement>);
		});

		expect(result.current.done.value).toBe(true);
		expect(mockOnChange).toHaveBeenCalledWith(mockItem, true);
	});
});
