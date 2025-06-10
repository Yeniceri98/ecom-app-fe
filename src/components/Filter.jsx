import { useState } from 'react';
import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Tooltip,
} from '@mui/material';
import { FiArrowUp, FiSearch } from 'react-icons/fi';

const Filter = () => {
	const categories = [
		{
			categoryId: 1,
			categoryName: 'Phone',
		},
		{
			categoryId: 2,
			categoryName: 'TV',
		},
		{
			categoryId: 3,
			categoryName: 'Clothes',
		},
	];

	const [category, setCategory] = useState('all');

	const handleCategoryChange = (e) => {
		setCategory(e.target.value);
	};

	return (
		<div className="flex flex-col md:flex-row md:justify-between items-center gap-4 w-full p-4">
			{/* SEARCH BAR */}
			<div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
				<div className="relative w-full sm:w-[350px] md:w-[300px] lg:w-[350px]">
					<input
						type="text"
						placeholder="Search Products"
						className="w-full px-10 py-2 border border-gray-400 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:border-primary"
					/>
					<FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-800 text-xl" />
				</div>

				{/* CATEGORY SELECTION */}
				<FormControl
					className="w-full sm:w-[200px]"
					variant="outlined"
					size="small">
					<InputLabel id="category-select-label">Category</InputLabel>
					<Select
						className="text-slate-800 border-slate-700"
						labelId="category-select-label"
						label="Category"
						value={category}
						onChange={handleCategoryChange}>
						<MenuItem value="all">All Categories</MenuItem>
						{categories.map((item) => (
							<MenuItem key={item.categoryId} value={item.categoryName}>
								{item.categoryName}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</div>

			{/* SORT BUTTON & CLEAR FILTER */}
			<div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
				<Tooltip title="Sorted by price">
					<Button
						variant="contained"
						color="primary"
						className="w-full sm:w-auto">
						Sort By
						<FiArrowUp className="ml-2" size={20} />
					</Button>
				</Tooltip>
				<Tooltip title="Sorted by price">
					<Button
						variant="contained"
						color="error"
						className="w-full sm:w-auto">
						Clear Filter
					</Button>
				</Tooltip>
			</div>
		</div>
	);
};

export default Filter;
