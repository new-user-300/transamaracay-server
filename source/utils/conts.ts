import axios from 'axios';

export const NAMEAPP = 'BLOCKMORT';
export const FILEROOT = process.cwd();
export const EMAIL_PAGOS =
	process.env.NODE_ENV === 'development'
		? 'darioflores170@gmail.com'
		: 'cedeescursos@gmail.com';

export const URLPAYPALCHECKOUT = (id: string) =>
	`${process.env.URLPAYPAL}/v2/checkout/orders/${id}`;
export const getTokenPaypal = async (): Promise<string> => {
	const params = new URLSearchParams();
	params.append('grant_type', 'client_credentials');

	// Generate an access token

	const url = `${process.env.URLPAYPAL}/v1/oauth2/token`;
	const {
		data: { access_token },
	} = await axios.post(url, params, {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		auth: {
			username: process.env.CLIENTE_ID_PAYPAL,
			password: process.env.SECRETKEYPAYPAL,
		},
	});

	return access_token;
};

export const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	maximumFractionDigits: 2,
});
