import React, { useEffect, useMemo } from 'react';
import Intro from './Intro/Intro';
import Footer from './Footer/Footer';
import replaceQuotesWithUkrainian from './functions/replaceQuot';
import { newbies } from './newbie';
import User from './User/User';
import './styles.scss';

const App = () => {
  useEffect(() => {
    replaceQuotesWithUkrainian(document);
  }, []);

  const officePriority = [
    "Офіс комерційний",
    "Офіс операційний",
    "Офіс Е-ком",
    "Офіс маркетингу",
    "Офіс фінансовий",
    "Офіс адміністративний",
    "Офіс будівництва та управління нерухомістю",
    "Офіс управління центральними виробництвами",
    "Офіс персоналу"
  ];

  // Сортуємо список користувачів за пріоритетом офісу, потім за статусом (promoted або newbie)
  const sortedUsers = useMemo(() => {
    return [...newbies].sort((a, b) => {
      if (a.office !== b.office) {
        return officePriority.indexOf(a.office) - officePriority.indexOf(b.office);
      }
      if (a.status === 'promoted' && b.status !== 'promoted') {
        return -1;
      }
      if (a.status !== 'promoted' && b.status === 'promoted') {
        return 1;
      }
      return 0;
    });
  }, [newbies]);

  const officesList = useMemo(() => {
    const officesFromUsers = newbies.map(user => user.office);
    return [...new Set(officesFromUsers)];
  }, [newbies]);

    return (
      <table className='parent-root'>
        <tbody>
          <tr className="images-container" >
            <td colSpan='2' >
                <img style={{maxWidth: '800px'}} src="https://drive.google.com/uc?export=view&id=1nHVFqOstuKrznWN8Jd6-FBgq4gcDnp3I" alt="First Image"/>
            </td>
          </tr>
        <Intro offices={officesList} />
          {sortedUsers.reduce((acc, user) => {
            if (!acc.find(u => u.office === user.office)) {
              acc.push({ office: user.office, type: 'office' });
            }
            acc.push(user);
            return acc;
          }, []).map((item, index) => {
            if (item.type === 'office') {
              return (
                <React.Fragment key={index}>
                  <tr className='invisible-background'></tr>
                  <tr>
                    <td className="office-header" colSpan="2">{item.office}</td>
                  </tr>
                  <tr className='invisible-background'></tr>
                </React.Fragment>
              );
            } else {
              return (
                <React.Fragment key={index}>
                <tr key={index}>
                  <User userdata={item} />
                </tr>
                <tr className='invisible-background'></tr>
                 </React.Fragment>
              );
            }
          })}
        <Footer />
        </tbody>
      </table>
    );    
}

export default App;
