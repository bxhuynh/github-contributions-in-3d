import './App.css';
import { useEffect, useState } from 'react';
import Map3D from './components/Map3D';
import mockData from './mockData';

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      async function getContributions(token, username) {
        const headers = {
          Authorization: `bearer ${token}`,
        };
        const body = {
          query: `query {
            user(login: "${username}") {
              name
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      color
                      contributionCount
                      date
                      weekday
                    }
                    firstDay
                  }
                }
              }
            }
          }`,
        };
        const response = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          body: JSON.stringify(body),
          headers: headers,
        });
        const data = await response.json();
        return data;
      }

      getContributions(process.env.REACT_APP_TOKEN, 'bxhuynh').then((res) => {
        setData(res?.data?.user);
      });
    } else {
      setData(mockData.data.user);
    }
  }, []);

  return (
    <div className='App'>
      <Map3D data={data} />
    </div>
  );
}

export default App;
