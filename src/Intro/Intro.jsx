import React from 'react';
import './intro.scss';

const Intro = ({ offices }) => {
    return (
        <td className="intro-container">
            <tr className="images-container" colspan='2'>
                <img src="https://drive.google.com/uc?export=view&id=1nHVFqOstuKrznWN8Jd6-FBgq4gcDnp3I" alt="First Image"/>
            </tr>
            <tr className="text-container" colspan='2'>
                <h1>Привіт, друзі!</h1>
                <p>Час дізнатися більше про Перевершників, які приєдналися до нашої родини чи отримали підвищення у першій половині вересня.</p>
                <p>Сьогодні до вашої уваги пропонуємо кадрові зміни у {offices.join(', ')}.</p>
                <p>Гайда знайомитися!</p>
            </tr>
        </td>
    );
}

export default Intro;
