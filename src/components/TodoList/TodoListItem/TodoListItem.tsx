import React from "react";
import styles from "./TodoListItem.module.scss";
import { TodoListItem as TTodoListItem } from "@/types";
import { Checkbox } from "antd";
import useTodoListItem from "./hooks/useTodoListItem";
import { spaceJoinTrim } from "@/utils";

export interface Props {
	item: TTodoListItem;
	onCheckedChange: (item: TTodoListItem, value: boolean) => void;
}

const TodoListItem: React.FC<Props> = (props) => {
	const hook = useTodoListItem({
		item: props.item,
		onCheckedChange: props.onCheckedChange,
	});

	return (
		<div className={styles.TodoListItem}>
			<Checkbox
				onChange={hook.onChange}
				checked={hook.done.value}
				className={spaceJoinTrim([
					styles.checkbox,
					hook.done.value ? styles.checked : "",
				])}
			>
				{props.item.text}
			</Checkbox>
		</div>
	);
};

export default TodoListItem;
