import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Charts from './components/Charts';
import Navbar from './components/Navbar';

import { useDarkMode } from './hooks/useDarkMode';

import './styles.scss';

//added initial values
const initialValues = {
	darkMode: 'false',
};

const App = () => {
	const [coinData, setCoinData] = useState([]);
	const [darkMode, setDarkMode] = useDarkMode(false);
	// const [darkMode, setDarkMode] = useDarkMode(false);
	// const [values, handleChanges] = useDarkMode(initialValues);

	useEffect(() => {
		axios
			.get(
				'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true'
			)
			.then((res) => setCoinData(res.data))
			.catch((err) => console.log(err));
	}, []);

	// console.log('darkMode', values.darkMode);

	return (
		<div className={darkMode ? 'dark-mode App' : 'App'}>
			{/* <div className={values.darkMode ? 'dark-mode App' : 'App'}> */}
			<Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
			{/* <Navbar darkMode={darkMode} setDarkMode={handleChanges} /> */}
			<Charts coinData={coinData} />
		</div>
	);
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
