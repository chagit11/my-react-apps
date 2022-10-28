import './--sass/HomePage.sass'
// 
import { Link } from "react-router-dom";
import { Timer } from './--apps/Timer/Timer';


const appsData = [
	[1, '/counter', 'Счетчик'],
	[2, '/modal', 'Модальное окно'],
	[3, '/quiz', 'Опросник'],
	[4, '/users', 'Приглащение пользователей'],
	[5, '/currency-convertor', 'Конвертер курса валют'],
	[6, '/photo-collection', 'Фото коллекция'],
	[7, '/timer', 'Таймер'],
]




export const HomePage = () => {
	return (
		<>
			{/* === HEADER === */}
			<header className="header">
			</header>

			{/* === MAIN === */}
			<main className="main">
				<div className='homepage'>
					<div className='homepage__wrapper container'>
						<div className='homepage__apps'>
							{
								appsData.map(([id, href, text]) => (
									<Link key={id} to={href} className='homepage__app'>
										{text}
									</Link>
								))
							}
						</div>
					</div>
				</div>
					
			</main>

			{/* === FOOTER === */}
			<footer className="footer">
					
			</footer>
		</>
	);
}

