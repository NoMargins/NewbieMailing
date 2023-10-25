import React from 'react';

const Intro = ({ offices }) => {
    return (
        <tr>
            <td className="text-container" colSpan='2'>
                <h3 style={{margin: 0, padding: 0}}>Привіт, друзі!</h3>
                <p>Поспішаємо до вас з новинами про Перевершників, які приєдналися до нашої родини чи отримали підвищення у першій половині жовтня.</p>
                <p>Сьогодні до вашої уваги пропонуємо кадрові зміни у {offices.join(', ')}.</p>
                <p>Гайда знайомитися!</p>
            </td>
        </tr>
    );
}

export default Intro;
