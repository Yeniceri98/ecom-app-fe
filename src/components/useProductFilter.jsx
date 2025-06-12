import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getAllProducts } from '../redux/actions/actions';

const useProductFilter = () => {
	const [searchParams] = useSearchParams();
	const dispatch = useDispatch();

	const params = useMemo(
		() => new URLSearchParams(searchParams),
		[searchParams]
	);

	useEffect(() => {
		const newParams = new URLSearchParams(params);

		const currentPage = searchParams.get('page')
			? Number(searchParams.get('page'))
			: 1;
		newParams.set('pageNumber', currentPage - 1);

		const sortOrder = searchParams.get('sortby') || 'asc';
		const categoryParams = searchParams.get('category') || null;
		const keyword = searchParams.get('keyword') || null;

		newParams.set('sortBy', 'price');
		newParams.set('sortOrder', sortOrder);

		if (categoryParams) {
			newParams.set('category', categoryParams);
		}

		if (keyword) {
			newParams.set('keyword', keyword);
		}

		const queryString = newParams.toString();
		dispatch(getAllProducts(queryString));
	}, [dispatch, searchParams, params]);
};

export default useProductFilter;
