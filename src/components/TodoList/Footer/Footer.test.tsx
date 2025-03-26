import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Footer from "./Footer";
import { Filter } from "@/utils";

const mockProps = {
	itemsLeft: "5",
	setFilter: jest.fn(),
	activeFilter: Filter.ALL,
	onClearClick: jest.fn(),
};

describe("Footer", () => {
	test("displays items left count", () => {
		render(<Footer {...mockProps} />);
		expect(screen.getByText("5 items left")).toBeInTheDocument();
	});

	test("renders all filter buttons", () => {
		render(<Footer {...mockProps} />);

		expect(screen.getByText("All")).toBeInTheDocument();
		expect(screen.getByText("Active")).toBeInTheDocument();
		expect(screen.getByText("Completed")).toBeInTheDocument();
	});

	test("calls setFilter when button clicked", async () => {
		const user = userEvent.setup();
		render(<Footer {...mockProps} />);

		const activeButton = screen.getByText("Active");
		await user.click(activeButton);

		expect(mockProps.setFilter).toHaveBeenCalledWith(Filter.ACTIVE);
	});

	test("calls onClearClick when clear button clicked", async () => {
		const user = userEvent.setup();
		render(<Footer {...mockProps} />);

		const clearButton = screen.getByText("Clear completed");
		await user.click(clearButton);

		expect(mockProps.onClearClick).toHaveBeenCalled();
	});
});
