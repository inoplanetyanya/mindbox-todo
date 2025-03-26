import { TodoListItem } from "@/types";
import { createIdGenerator, Filter } from "@/utils";
import { useCallback, useEffect, useMemo, useState } from "react";

export interface Args {
	list: Array<TodoListItem>;
}

export default function useTodoList(args: Args) {
	const [list, setList] = useState<Array<TodoListItem>>(args.list ?? []);
	const [input, setInput] = useState("");
	const [filter, setFilter] = useState<Filter>(Filter.ALL);

	const { active, completed, filteredList, itemsLeft } = useMemo(() => {
		const active = list.filter((el) => !el.done);
		const completed = list.filter((el) => el.done);

		let filteredList: Array<TodoListItem>;
		if (filter === Filter.ALL) {
			filteredList = list;
		} else if (filter === Filter.ACTIVE) {
			filteredList = active;
		} else if (filter === Filter.COMPLETED) {
			filteredList = completed;
		} else {
			filteredList = [];
		}

		const itemsLeft = active.length >= 100 ? "99+" : active.length.toString();

		return { active, completed, filteredList, itemsLeft };
	}, [list, filter]);

	const onCheckedChange = useCallback((item: TodoListItem, value: boolean) => {
		setList((prev) =>
			prev.map((el) => (el.id === item.id ? { ...el, done: value } : el))
		);
	}, []);

	const onInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
	}, []);

	const idGenerator = createIdGenerator(list);

	const onKeyEnterUp = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "Enter" && input.trim()) {
				setList((prev) => [
					...prev,
					{
						id: idGenerator.getNextId(),
						text: input.trim(),
						done: false,
					},
				]);
				setInput("");
			}
		},
		[input]
	);

	const clearCompleted = useCallback(() => {
		setList((prev) => prev.filter((el) => !el.done));
	}, []);

	return {
		list: { value: list, setValue: setList },
		input: { value: input, setValue: setInput },
		filter: { value: filter, setValue: setFilter },
		onCheckedChange,
		onInput,
		onKeyEnterUp,
		filteredList,
		itemsLeft,
		clearCompleted,
	};
}
