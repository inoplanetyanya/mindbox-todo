import React, { useMemo } from "react";
import styles from "./Footer.module.scss";
import { Button } from "antd";
import { Filter, spaceJoinTrim } from "@/utils";

export interface Props {
	itemsLeft: string;
	setFilter: (filter: Filter) => void;
	activeFilter: Filter;
	onClearClick: () => void;
}

const Footer: React.FC<Props> = (props) => {
	const filters = useMemo(
		() => [
			{ type: Filter.ALL, label: "All" },
			{ type: Filter.ACTIVE, label: "Active" },
			{ type: Filter.COMPLETED, label: "Completed" },
		],
		[]
	);

	return (
		<div className={styles.Footer}>
			<span className={styles.itemsLeft}>{props.itemsLeft} items left</span>
			<div className={styles.filter}>
				{filters.map(({ type, label }) => (
					<Button
						key={type}
						className={spaceJoinTrim([
							styles.button,
							props.activeFilter === type ? styles.active : "",
						])}
						onClick={() => props.setFilter(type)}
					>
						{label}
					</Button>
				))}
			</div>
			<Button onClick={props.onClearClick}>Clear completed</Button>
		</div>
	);
};

export default Footer;
