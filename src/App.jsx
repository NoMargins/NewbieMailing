import React, { useEffect, useMemo } from 'react';
import Intro from './Intro/Intro';
import replaceQuotesWithUkrainian from './functions/replaceQuot';
import { newbies } from './users/newbie';
import User from './User';
import './styles.scss';

const App = () => {
  useEffect(() => {
    replaceQuotesWithUkrainian(document);
  }, []);

  const officePriority = [
    "Офіс комерційний",
    "Офіс операційний",
    "Е-ком",
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
          <tr>
            <td colSpan={2}><Intro offices={officesList} /></td>
          </tr>
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
                  <tr>    </tr>
                  <tr>
                    <td className="office-header" colSpan="2">{item.office}</td>
                  </tr>
                  <tr>    </tr>
                </React.Fragment>
              );
            } else {
              return (
                <tr key={index}>
                  <User userdata={item} />
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    );    
}

export default App;
