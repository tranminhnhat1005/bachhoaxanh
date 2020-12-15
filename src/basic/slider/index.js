/**@jsx jsx */
import { jsx } from '@emotion/core';
import { Container } from './container';
import { Item } from './item';
const SliderSample = () => {
	return (
		<Container>
			<Item />
		</Container>
	);
};

export default SliderSample;

const source = [
	{
		name: 'First',
		url:
			'https://img.fcbayern.com/image/upload/t_cms-16x9/f_auto/w_1366,h_768,c_fill/v1606341335/cms/public/images/fcbayern-com/homepage/saison-20-21/galerien/spiele/FCB-Salzburg/FCBFCS_20_don_251120.jpg',
	},
	{
		name: 'Second',
		url:
			'https://img.fcbayern.com/image/upload/t_cms-16x9/f_auto/w_1366,h_768,c_fill/v1606341335/cms/public/images/fcbayern-com/homepage/saison-20-21/galerien/spiele/FCB-Salzburg/FCBFCS_30_don_251120.jpg',
	},
	{
		name: 'Third',
		url:
			'https://img.fcbayern.com/image/upload/t_cms-16x9/f_auto/w_1366,h_768,c_fill/v1606341335/cms/public/images/fcbayern-com/homepage/saison-20-21/galerien/spiele/FCB-Salzburg/FCBFCS_13_don_251120.jpg',
	},
];
