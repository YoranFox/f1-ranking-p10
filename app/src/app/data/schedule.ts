export const getNextRaceNumber = () => {
  const nextRace = schedule.MRData.RaceTable.Race.findIndex(
    (race) => new Date(race.Date) > new Date()
  );
  return nextRace + 1;
};

export const getRace = (raceNumber: number) => {
  const race = schedule.MRData.RaceTable.Race[raceNumber - 1];
  return race;
};

export const schedule = {
  MRData: {
    RaceTable: {
      Race: [
        {
          RaceName: 'Bahrain Grand Prix',
          Circuit: {
            CircuitName: 'Bahrain International Circuit',
            Location: {
              Locality: 'Sakhir',
              Country: 'Bahrain',
            },
          },
          Date: '2023-03-05',
          Time: '15:00:00Z',
          FirstPractice: {
            Date: '2023-03-03',
            Time: '11:30:00Z',
          },
          SecondPractice: {
            Date: '2023-03-03',
            Time: '15:00:00Z',
          },
          ThirdPractice: {
            Date: '2023-03-04',
            Time: '11:30:00Z',
          },
          Qualifying: {
            Date: '2023-03-04',
            Time: '15:00:00Z',
          },
        },
        {
          RaceName: 'Saudi Arabian Grand Prix',
          Circuit: {
            CircuitName: 'Jeddah Corniche Circuit',
            Location: {
              Locality: 'Jeddah',
              Country: 'Saudi Arabia',
            },
          },
          Date: '2023-03-19',
          Time: '17:00:00Z',
          FirstPractice: {
            Date: '2023-03-17',
            Time: '13:30:00Z',
          },
          SecondPractice: {
            Date: '2023-03-17',
            Time: '17:00:00Z',
          },
          ThirdPractice: {
            Date: '2023-03-18',
            Time: '13:30:00Z',
          },
          Qualifying: {
            Date: '2023-03-18',
            Time: '17:00:00Z',
          },
        },
        {
          RaceName: 'Australian Grand Prix',
          Circuit: {
            CircuitName: 'Albert Park Grand Prix Circuit',
            Location: {
              Locality: 'Melbourne',
              Country: 'Australia',
            },
          },
          Date: '2023-04-02',
          Time: '05:00:00Z',
          FirstPractice: {
            Date: '2023-03-31',
            Time: '01:30:00Z',
          },
          SecondPractice: {
            Date: '2023-03-31',
            Time: '05:00:00Z',
          },
          ThirdPractice: {
            Date: '2023-04-01',
            Time: '01:30:00Z',
          },
          Qualifying: {
            Date: '2023-04-01',
            Time: '05:00:00Z',
          },
        },
        {
          RaceName: 'Azerbaijan Grand Prix',
          Circuit: {
            CircuitName: 'Baku City Circuit',
            Location: {
              Locality: 'Baku',
              Country: 'Azerbaijan',
            },
          },
          Date: '2023-04-30',
          Time: '11:00:00Z',
          FirstPractice: {
            Date: '2023-04-28',
            Time: '09:30:00Z',
          },
          Qualifying: {
            Date: '2023-04-28',
            Time: '13:00:00Z',
          },
          SecondPractice: {
            Date: '2023-04-29',
            Time: '09:30:00Z',
          },
          Sprint: {
            Date: '2023-04-29',
            Time: '13:30:00Z',
          },
        },
        {
          RaceName: 'Miami Grand Prix',
          Circuit: {
            CircuitName: 'Miami International Autodrome',
            Location: {
              Locality: 'Miami',
              Country: 'USA',
            },
          },
          Date: '2023-05-07',
          Time: '19:30:00Z',
          FirstPractice: {
            Date: '2023-05-05',
            Time: '17:30:00Z',
          },
          SecondPractice: {
            Date: '2023-05-05',
            Time: '21:00:00Z',
          },
          ThirdPractice: {
            Date: '2023-05-06',
            Time: '16:30:00Z',
          },
          Qualifying: {
            Date: '2023-05-06',
            Time: '20:00:00Z',
          },
        },
        {
          RaceName: 'Emilia Romagna Grand Prix',
          Circuit: {
            CircuitName: 'Autodromo Enzo e Dino Ferrari',
            Location: {
              Locality: 'Imola',
              Country: 'Italy',
            },
          },
          Date: '2023-05-21',
          Time: '13:00:00Z',
          FirstPractice: {
            Date: '2023-05-19',
            Time: '11:30:00Z',
          },
          SecondPractice: {
            Date: '2023-05-19',
            Time: '15:00:00Z',
          },
          ThirdPractice: {
            Date: '2023-05-20',
            Time: '10:30:00Z',
          },
          Qualifying: {
            Date: '2023-05-20',
            Time: '14:00:00Z',
          },
        },
        {
          RaceName: 'Monaco Grand Prix',
          Circuit: {
            CircuitName: 'Circuit de Monaco',
            Location: {
              Locality: 'Monte-Carlo',
              Country: 'Monaco',
            },
          },
          Date: '2023-05-28',
          Time: '13:00:00Z',
          FirstPractice: {
            Date: '2023-05-26',
            Time: '11:30:00Z',
          },
          SecondPractice: {
            Date: '2023-05-26',
            Time: '15:00:00Z',
          },
          ThirdPractice: {
            Date: '2023-05-27',
            Time: '10:30:00Z',
          },
          Qualifying: {
            Date: '2023-05-27',
            Time: '14:00:00Z',
          },
        },
        {
          RaceName: 'Spanish Grand Prix',
          Circuit: {
            CircuitName: 'Circuit de Barcelona-Catalunya',
            Location: {
              Locality: 'Montmeló',
              Country: 'Spain',
            },
          },
          Date: '2023-06-04',
          Time: '13:00:00Z',
          FirstPractice: {
            Date: '2023-06-02',
            Time: '11:30:00Z',
          },
          SecondPractice: {
            Date: '2023-06-02',
            Time: '15:00:00Z',
          },
          ThirdPractice: {
            Date: '2023-06-03',
            Time: '10:30:00Z',
          },
          Qualifying: {
            Date: '2023-06-03',
            Time: '14:00:00Z',
          },
        },
        {
          RaceName: 'Canadian Grand Prix',
          Circuit: {
            CircuitName: 'Circuit Gilles Villeneuve',
            Location: {
              Locality: 'Montreal',
              Country: 'Canada',
            },
          },
          Date: '2023-06-18',
          Time: '18:00:00Z',
          FirstPractice: {
            Date: '2023-06-16',
            Time: '17:30:00Z',
          },
          SecondPractice: {
            Date: '2023-06-16',
            Time: '21:00:00Z',
          },
          ThirdPractice: {
            Date: '2023-06-17',
            Time: '16:30:00Z',
          },
          Qualifying: {
            Date: '2023-06-17',
            Time: '20:00:00Z',
          },
        },
        {
          RaceName: 'Austrian Grand Prix',
          Circuit: {
            CircuitName: 'Red Bull Ring',
            Location: {
              Locality: 'Spielberg',
              Country: 'Austria',
            },
          },
          Date: '2023-07-02',
          Time: '13:00:00Z',
          FirstPractice: {
            Date: '2023-06-30',
            Time: '11:30:00Z',
          },
          Qualifying: {
            Date: '2023-06-30',
            Time: '15:00:00Z',
          },
          SecondPractice: {
            Date: '2023-07-01',
            Time: '10:30:00Z',
          },
          Sprint: {
            Date: '2023-07-01',
            Time: '14:30:00Z',
          },
        },
        {
          RaceName: 'British Grand Prix',
          Circuit: {
            CircuitName: 'Silverstone Circuit',
            Location: {
              Locality: 'Silverstone',
              Country: 'UK',
            },
          },
          Date: '2023-07-09',
          Time: '14:00:00Z',
          FirstPractice: {
            Date: '2023-07-07',
            Time: '11:30:00Z',
          },
          SecondPractice: {
            Date: '2023-07-07',
            Time: '15:00:00Z',
          },
          ThirdPractice: {
            Date: '2023-07-08',
            Time: '10:30:00Z',
          },
          Qualifying: {
            Date: '2023-07-08',
            Time: '14:00:00Z',
          },
        },
        {
          RaceName: 'Hungarian Grand Prix',
          Circuit: {
            CircuitName: 'Hungaroring',
            Location: {
              Locality: 'Budapest',
              Country: 'Hungary',
            },
          },
          Date: '2023-07-23',
          Time: '13:00:00Z',
          FirstPractice: {
            Date: '2023-07-21',
            Time: '11:30:00Z',
          },
          SecondPractice: {
            Date: '2023-07-21',
            Time: '15:00:00Z',
          },
          ThirdPractice: {
            Date: '2023-07-22',
            Time: '10:30:00Z',
          },
          Qualifying: {
            Date: '2023-07-22',
            Time: '14:00:00Z',
          },
        },
        {
          RaceName: 'Belgian Grand Prix',
          Circuit: {
            CircuitName: 'Circuit de Spa-Francorchamps',
            Location: {
              Locality: 'Spa',
              Country: 'Belgium',
            },
          },
          Date: '2023-07-30',
          Time: '13:00:00Z',
          FirstPractice: {
            Date: '2023-07-28',
            Time: '11:30:00Z',
          },
          Qualifying: {
            Date: '2023-07-28',
            Time: '15:00:00Z',
          },
          SecondPractice: {
            Date: '2023-07-29',
            Time: '10:30:00Z',
          },
          Sprint: {
            Date: '2023-07-29',
            Time: '14:30:00Z',
          },
        },
        {
          RaceName: 'Dutch Grand Prix',
          Circuit: {
            CircuitName: 'Circuit Park Zandvoort',
            Location: {
              Locality: 'Zandvoort',
              Country: 'Netherlands',
            },
          },
          Date: '2023-08-27',
          Time: '13:00:00Z',
          FirstPractice: {
            Date: '2023-08-25',
            Time: '10:30:00Z',
          },
          SecondPractice: {
            Date: '2023-08-25',
            Time: '14:00:00Z',
          },
          ThirdPractice: {
            Date: '2023-08-26',
            Time: '09:30:00Z',
          },
          Qualifying: {
            Date: '2023-08-26',
            Time: '13:00:00Z',
          },
        },
        {
          RaceName: 'Italian Grand Prix',
          Circuit: {
            CircuitName: 'Autodromo Nazionale di Monza',
            Location: {
              Locality: 'Monza',
              Country: 'Italy',
            },
          },
          Date: '2023-09-03',
          Time: '13:00:00Z',
          FirstPractice: {
            Date: '2023-09-01',
            Time: '11:30:00Z',
          },
          SecondPractice: {
            Date: '2023-09-01',
            Time: '15:00:00Z',
          },
          ThirdPractice: {
            Date: '2023-09-02',
            Time: '10:30:00Z',
          },
          Qualifying: {
            Date: '2023-09-02',
            Time: '14:00:00Z',
          },
        },
        {
          RaceName: 'Singapore Grand Prix',
          Circuit: {
            CircuitName: 'Marina Bay Street Circuit',
            Location: {
              Locality: 'Marina Bay',
              Country: 'Singapore',
            },
          },
          Date: '2023-09-17',
          Time: '12:00:00Z',
          FirstPractice: {
            Date: '2023-09-15',
            Time: '09:30:00Z',
          },
          SecondPractice: {
            Date: '2023-09-15',
            Time: '13:00:00Z',
          },
          ThirdPractice: {
            Date: '2023-09-16',
            Time: '09:30:00Z',
          },
          Qualifying: {
            Date: '2023-09-16',
            Time: '13:00:00Z',
          },
        },
        {
          RaceName: 'Japanese Grand Prix',
          Circuit: {
            CircuitName: 'Suzuka Circuit',
            Location: {
              Locality: 'Suzuka',
              Country: 'Japan',
            },
          },
          Date: '2023-09-24',
          Time: '05:00:00Z',
          FirstPractice: {
            Date: '2023-09-22',
            Time: '02:30:00Z',
          },
          SecondPractice: {
            Date: '2023-09-22',
            Time: '06:00:00Z',
          },
          ThirdPractice: {
            Date: '2023-09-23',
            Time: '02:30:00Z',
          },
          Qualifying: {
            Date: '2023-09-23',
            Time: '06:00:00Z',
          },
        },
        {
          RaceName: 'Qatar Grand Prix',
          Circuit: {
            CircuitName: 'Losail International Circuit',
            Location: {
              Locality: 'Al Daayen',
              Country: 'Qatar',
            },
          },
          Date: '2023-10-08',
          Time: '14:00:00Z',
          FirstPractice: {
            Date: '2023-10-06',
            Time: '10:30:00Z',
          },
          Qualifying: {
            Date: '2023-10-06',
            Time: '14:00:00Z',
          },
          SecondPractice: {
            Date: '2023-10-07',
            Time: '10:30:00Z',
          },
          Sprint: {
            Date: '2023-10-07',
            Time: '14:30:00Z',
          },
        },
        {
          RaceName: 'United States Grand Prix',
          Circuit: {
            CircuitName: 'Circuit of the Americas',
            Location: {
              Locality: 'Austin',
              Country: 'USA',
            },
          },
          Date: '2023-10-22',
          Time: '19:00:00Z',
          FirstPractice: {
            Date: '2023-10-20',
            Time: '17:30:00Z',
          },
          Qualifying: {
            Date: '2023-10-20',
            Time: '21:00:00Z',
          },
          SecondPractice: {
            Date: '2023-10-21',
            Time: '18:00:00Z',
          },
          Sprint: {
            Date: '2023-10-21',
            Time: '22:00:00Z',
          },
        },
        {
          RaceName: 'Mexico City Grand Prix',
          Circuit: {
            CircuitName: 'Autódromo Hermanos Rodríguez',
            Location: {
              Locality: 'Mexico City',
              Country: 'Mexico',
            },
          },
          Date: '2023-10-29',
          Time: '20:00:00Z',
          FirstPractice: {
            Date: '2023-10-27',
            Time: '18:30:00Z',
          },
          SecondPractice: {
            Date: '2023-10-27',
            Time: '22:00:00Z',
          },
          ThirdPractice: {
            Date: '2023-10-28',
            Time: '17:30:00Z',
          },
          Qualifying: {
            Date: '2023-10-28',
            Time: '21:00:00Z',
          },
        },
        {
          RaceName: 'São Paulo Grand Prix',
          Circuit: {
            CircuitName: 'Autódromo José Carlos Pace',
            Location: {
              Locality: 'São Paulo',
              Country: 'Brazil',
            },
          },
          Date: '2023-11-05',
          Time: '17:00:00Z',
          FirstPractice: {
            Date: '2023-11-03',
            Time: '14:30:00Z',
          },
          Qualifying: {
            Date: '2023-11-03',
            Time: '18:00:00Z',
          },
          SecondPractice: {
            Date: '2023-11-04',
            Time: '14:30:00Z',
          },
          Sprint: {
            Date: '2023-11-04',
            Time: '18:30:00Z',
          },
        },
        {
          RaceName: 'Las Vegas Grand Prix',
          Circuit: {
            CircuitName: 'Las Vegas Strip Street Circuit',
            Location: {
              Locality: 'Las Vegas',
              Country: 'United States',
            },
          },
          Date: '2023-11-19',
          Time: '06:00:00Z',
          FirstPractice: {
            Date: '2023-11-17',
            Time: '04:30:00Z',
          },
          SecondPractice: {
            Date: '2023-11-17',
            Time: '08:00:00Z',
          },
          ThirdPractice: {
            Date: '2023-11-18',
            Time: '04:30:00Z',
          },
          Qualifying: {
            Date: '2023-11-18',
            Time: '08:00:00Z',
          },
        },
        {
          RaceName: 'Abu Dhabi Grand Prix',
          Circuit: {
            CircuitName: 'Yas Marina Circuit',
            Location: {
              Locality: 'Abu Dhabi',
              Country: 'UAE',
            },
          },
          Date: '2023-11-26',
          Time: '13:00:00Z',
          FirstPractice: {
            Date: '2023-11-24',
            Time: '09:30:00Z',
          },
          SecondPractice: {
            Date: '2023-11-24',
            Time: '13:00:00Z',
          },
          ThirdPractice: {
            Date: '2023-11-25',
            Time: '10:30:00Z',
          },
          Qualifying: {
            Date: '2023-11-25',
            Time: '14:00:00Z',
          },
        },
      ],
    },
  },
};
