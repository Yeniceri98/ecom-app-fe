import Pagination from '@mui/material/Pagination';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FormControl, Select, MenuItem, Box } from '@mui/material';

const Paginations = ({ paginationObject }) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const params = useMemo(
		() => new URLSearchParams(searchParams),
		[searchParams]
	);

	const pageNumber = searchParams.get('page')
		? Number(searchParams.get('page'))
		: 1;

	const pageSize = searchParams.get('size')
		? Number(searchParams.get('size'))
		: 6;

	const onPageChangeHandler = (e, value) => {
		const newParams = new URLSearchParams(params);
		newParams.set('page', value.toString());
		setSearchParams(newParams);
	};

	const onSizeChangeHandler = (e) => {
		const newParams = new URLSearchParams(params);
		newParams.set('size', e.target.value.toString());
		// Reset to first page when changing page size
		newParams.set('page', '1');
		setSearchParams(newParams);
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: 2,
			}}>
			<Pagination
				count={paginationObject.totalPages}
				page={pageNumber}
				defaultPage={1}
				siblingCount={2}
				boundaryCount={2}
				shape="rounded"
				onChange={onPageChangeHandler}
			/>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
				<span>Items per page:</span>
				<FormControl size="small">
					<Select value={pageSize} onChange={onSizeChangeHandler} displayEmpty>
						<MenuItem value={1}>1</MenuItem>
						<MenuItem value={2}>2</MenuItem>
						<MenuItem value={3}>3</MenuItem>
						<MenuItem value={4}>4</MenuItem>
					</Select>
				</FormControl>
			</Box>
		</Box>
	);
};

export default Paginations;
