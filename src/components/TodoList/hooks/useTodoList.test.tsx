import { renderHook } from "@testing-library/react";
import { act } from "react";
import useTodoList from "./useTodoList";
import { Filter } from "@/utils";

describe("useTodoList", () => {
	const initialItems = [
		{ id: 1, text: "Task 1", done: false },
		{ id: 2, text: "Task 2", done: true },
	];

	test("should initialize with default values", () => {
		const { result } = renderHook(() => useTodoList({ list: initialItems }));

		expect(result.current.list.value).toEqual(initialItems);
		expect(result.current.input.value).toBe("");
		expect(result.current.filter.value).toBe(Filter.ALL);
	});

	test("should add new task on Enter key", () => {
		const { result } = renderHook(() => useTodoList({ list: initialItems }));

		act(() => {
			result.current.input.setValue("New Task");
		});

		act(() => {
			const event = new KeyboardEvent("keyup", { key: "Enter" });
			result.current.onKeyEnterUp(
				event as unknown as React.KeyboardEvent<HTMLInputElement>
			);
		});

		expect(result.current.list.value).toHaveLength(3);
	});

	test("should filter tasks correctly", () => {
		const { result } = renderHook(() => useTodoList({ list: initialItems }));

		act(() => {
			result.current.filter.setValue(Filter.ACTIVE);
		});

		expect(result.current.filteredList).toHaveLength(1);
		expect(result.current.filteredList[0].text).toBe("Task 1");
		expect(result.current.itemsLeft).toBe("1");
	});

	test("should clear completed tasks", () => {
		const { result } = renderHook(() => useTodoList({ list: initialItems }));

		act(() => {
			result.current.clearCompleted();
		});

		expect(result.current.list.value).toHaveLength(1);
		expect(result.current.list.value[0].text).toBe("Task 1");
	});

	test("should update task status", () => {
		const { result } = renderHook(() => useTodoList({ list: initialItems }));

		act(() => {
			result.current.onCheckedChange(initialItems[0], true);
		});

		expect(result.current.list.value[0].done).toBe(true);
	});
});
