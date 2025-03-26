import React from "react";
import styles from "./TodoList.module.scss";
import TodoListItem from "./TodoListItem/TodoListItem";
import { TodoListItem as TTodoListItem } from "@/types";
import useTodoList from "./hooks/useTodoList";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

export interface Props {
	todoList: Array<TTodoListItem>;
}

const TodoList: React.FC<Props> = (props) => {
	const hook = useTodoList({
		list: props.todoList,
	});

	return (
		<div className={styles.TodoList}>
			<h1 className={styles.title}>todos</h1>

			<div className={styles.container}>
				<Header
					input={{
						value: hook.input.value,
						onInput: hook.onInput,
						onKeyUp: hook.onKeyEnterUp,
						placeholder: "What needs to be done?",
					}}
				/>
				<div className={styles.list}>
					{hook.filteredList?.map((el) => {
						return (
							<TodoListItem
								item={el}
								key={`todo-list-item-${el.id}`}
								onCheckedChange={hook.onCheckedChange}
							></TodoListItem>
						);
					})}
				</div>
				<Footer
					itemsLeft={hook.itemsLeft}
					setFilter={hook.filter.setValue}
					activeFilter={hook.filter.value}
					onClearClick={hook.clearCompleted}
				/>
			</div>
		</div>
	);
};

export default TodoList;
