export function spaceJoinTrim(strings: Array<string>) {
	return strings
		.map((s) => {
			if (s) {
				return s.trim();
			}
			return "";
		})
		.filter(Boolean)
		.join(" ");
}

export function createIdGenerator(list: Array<{ id: number }> = []) {
	let currentId =
		list.length > 0 ? Math.max(...list.map((item) => item.id)) : 0;

	return {
		getNextId: () => {
			currentId += 1;
			return currentId;
		},
		flush: () => {
			currentId = 0;
		},
	};
}

export const enum Filter {
	ALL,
	ACTIVE,
	COMPLETED,
}
