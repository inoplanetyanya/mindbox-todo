import React from "react";
import styles from "./App.module.scss";
import TodoList from "./components/TodoList/TodoList";
import { defaultList } from "./mocData";

export interface Props {}

const App: React.FC<Props> = (props) => {
	return (
		<div className={styles.App}>
			<TodoList todoList={defaultList} />
		</div>
	);
};

export default App;
