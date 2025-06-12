import { useEffect, useMemo, useState } from 'react';
import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Tooltip,
} from '@mui/material';
import { FiArrowUp, FiArrowDown, FiSearch } from 'react-icons/fi';
import { IoIosRefresh } from 'react-icons/io';
import { useSearchParams } from 'react-router-dom';

const Filter = ({ categories }) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const [category, setCategory] = useState('all');
	const [sortOrder, setSortOrder] = useState('asc');
	const [searchTerm, setSearchTerm] = useState('');

	// For perfomance boost
	const params = useMemo(
		() => new URLSearchParams(searchParams),
		[searchParams]
	);

	useEffect(() => {
		setCategory(params.get('category') || 'all');
		setSortOrder(params.get('sortby') || 'asc');
		setSearchTerm(params.get('keyword') || '');
	}, [params]);

	useEffect(() => {
		const handler = setTimeout(() => {
			const newParams = new URLSearchParams(params);

			if (searchTerm.trim()) {
				newParams.set('keyword', searchTerm.trim());
			} else {
				newParams.delete('keyword');
			}

			setSearchParams(newParams);
		}, 500);

		return () => clearTimeout(handler);
	}, [searchTerm, params, setSearchParams]);

	const handleCategoryChange = (e) => {
		const selectedCategory = e.target.value;
		const newParams = new URLSearchParams(params);

		if (selectedCategory === 'all') {
			newParams.delete('category'); // We don't want to show "all" in URL if there's no category selection
		} else {
			newParams.set('category', selectedCategory);
		}

		setSearchParams(newParams);
		setCategory(selectedCategory);
	};

	const toggleSortOrder = () => {
		const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
		const newParams = new URLSearchParams(params);
		newParams.set('sortby', newOrder);
		setSearchParams(newParams);
		setSortOrder(newOrder);
	};

	const handleClearFilter = () => {
		setSearchParams({});
	};

	return (
		<div className="flex flex-col md:flex-row md:justify-between items-center gap-4 w-full p-4">
			{/* SEARCH BAR */}
			<div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
				<div className="relative w-full sm:w-[350px] md:w-[300px] lg:w-[350px]">
					<input
						type="text"
						placeholder="Search Products"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
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
						<MenuItem value="all">All</MenuItem>
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
						className="w-full sm:w-auto"
						onClick={toggleSortOrder}>
						Sort By
						{sortOrder === 'asc' ? (
							<FiArrowUp className="ml-2" size={20} />
						) : (
							<FiArrowDown className="ml-2" size={20} />
						)}
					</Button>
				</Tooltip>
				<Tooltip title="Sorted by price">
					<Button
						variant="contained"
						color="error"
						className="w-full sm:w-auto"
						onClick={handleClearFilter}>
						Clear Filter
						<IoIosRefresh className="ml-2" size={20} />
					</Button>
				</Tooltip>
			</div>
		</div>
	);
};

export default Filter;
