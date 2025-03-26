import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "./Header";

describe("Header Component", () => {
	const mockProps = {
		input: {
			placeholder: "What needs to be done?",
			value: "",
			onInput: jest.fn(),
			onKeyUp: jest.fn(),
		},
	};

	test("renders input field with placeholder", () => {
		render(<Header {...mockProps} />);
		expect(
			screen.getByPlaceholderText("What needs to be done?")
		).toBeInTheDocument();
	});

	test("renders down arrow icon inside input prefix", () => {
		render(<Header {...mockProps} />);
		const input = screen.getByRole("textbox");
		const prefix = input.previousElementSibling;
		const svg = prefix?.querySelector("svg");
		expect(svg).toBeInTheDocument();
		expect(svg).toHaveAttribute("xmlns", "http://www.w3.org/2000/svg");
	});

	test("displays passed value in input", () => {
		const propsWithValue = {
			...mockProps,
			input: {
				...mockProps.input,
				value: "Current value",
			},
		};

		render(<Header {...propsWithValue} />);
		expect(screen.getByDisplayValue("Current value")).toBeInTheDocument();
	});
});
