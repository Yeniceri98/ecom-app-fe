import Pagination from '@mui/material/Pagination';

const Paginations = () => {
	return (
		<Pagination
			count={10}
			defaultPage={1}
			siblingCount={2}
			boundaryCount={2}
			shape="rounded"
		/>
	);
};

export default Paginations;
