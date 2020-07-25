import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";

export const AddTodo = () => {
	const [todos, setTodos] = useState({
		todoContent: "",
		todoPriority: 4,
		todoDate: new Date(),
	});

	const onChangeTodoContent = (event) => {
		setTodos({ ...todos, todoContent: event.target.value });
	};

	const onChangeTodoPriority = (event) => {
		setTodos({ ...todos, todoPriority: event.target.value });
	};

	const onChangeTodoDate = (todoDate) => {
		setTodos({ ...todos, todoDate });
	};

	const onSubmit = (event) => {
		event.preventDefault();

		const todo = {
			todoContent: todos.todoContent,
			todoPriority: todos.todoPriority,
			todoDate: todos.todoDate,
		};

		axios
			.post("http://localhost:5000/add", todo)
			.then((res) => console.log(res.data))
			.then(() => {
				window.location = "/";
			})
			.catch((err) => console.error(err));
	};
	return (
		<form className="pt-16" onSubmit={onSubmit}>
			<div className="mb-2 text-center">
				<label>Todo Content: </label>
				<input
					className="border border-indigo-600"
					type="text"
					required
					value={todos.todoContent}
					onChange={onChangeTodoContent}
				/>
			</div>
			<div className="mb-2 text-center">
				<label>Todo Priority: </label>
				<input
					className="border border-indigo-600"
					type="number"
					min={1}
					max={4}
					value={todos.todoPriority}
					onChange={onChangeTodoPriority}
				/>
			</div>
			<div className="mb-2 text-center">
				<label>Todo Due Date: </label>
				<DatePicker selected={todos.todoDate} onChange={onChangeTodoDate} />
			</div>
			<div className="text-center">
				<input
					className="px-4 py-2 rounded bg-indigo-200 hover:bg-indigo-400 cursor-pointer"
					type="submit"
					value="Create Todo"
				/>
			</div>
		</form>
	);
};
