import { createPortal } from 'react-dom';
import { usePortal } from '../../utils';

const Portal = (props) => {
	const { children, id } = props;
	const parent = usePortal(id);
	return createPortal(children, parent);
};

export default Portal;
