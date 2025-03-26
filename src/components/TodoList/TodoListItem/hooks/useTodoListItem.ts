import { TodoListItem } from "@/types";
import { CheckboxChangeEvent } from "antd";
import { useCallback, useState } from "react";

interface Args {
	item: TodoListItem;
	onCheckedChange: (item: TodoListItem, value: boolean) => void;
}

export default function useTodoListItem(args: Args) {
	const [done, setDone] = useState<boolean>(args.item.done ?? false);

	const onChange = useCallback((e: CheckboxChangeEvent) => {
		const value = e.target.checked;
		setDone(value);
		args.onCheckedChange(args.item, value);
	}, []);

	return {
		done: {
			value: done,
			setValue: setDone,
		},
		onChange,
	};
}
