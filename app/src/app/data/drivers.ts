export const getDriver = (driverNumber: number) => {
  const driver = drivers.MRData.DriverTable.Driver.find(
    (driver) => driver.PermanentNumber === driverNumber
  );
  return driver;
};

export const drivers = {
  MRData: {
    DriverTable: {
      Driver: [
        {
          PermanentNumber: 23,
          GivenName: 'Alexander',
          FamilyName: 'Albon',
          DateOfBirth: '1996-03-23',
          Nationality: 'Thai',
        },
        {
          PermanentNumber: 14,
          GivenName: 'Fernando',
          FamilyName: 'Alonso',
          DateOfBirth: '1981-07-29',
          Nationality: 'Spanish',
        },
        {
          PermanentNumber: 77,
          GivenName: 'Valtteri',
          FamilyName: 'Bottas',
          DateOfBirth: '1989-08-28',
          Nationality: 'Finnish',
        },
        {
          PermanentNumber: 45,
          GivenName: 'Nyck',
          FamilyName: 'de Vries',
          DateOfBirth: '1995-02-06',
          Nationality: 'Dutch',
        },
        {
          PermanentNumber: 10,
          GivenName: 'Pierre',
          FamilyName: 'Gasly',
          DateOfBirth: '1996-02-07',
          Nationality: 'French',
        },
        {
          PermanentNumber: 44,
          GivenName: 'Lewis',
          FamilyName: 'Hamilton',
          DateOfBirth: '1985-01-07',
          Nationality: 'British',
        },
        {
          PermanentNumber: 27,
          GivenName: 'Nico',
          FamilyName: 'Hülkenberg',
          DateOfBirth: '1987-08-19',
          Nationality: 'German',
        },
        {
          PermanentNumber: 16,
          GivenName: 'Charles',
          FamilyName: 'Leclerc',
          DateOfBirth: '1997-10-16',
          Nationality: 'Monegasque',
        },
        {
          PermanentNumber: 20,
          GivenName: 'Kevin',
          FamilyName: 'Magnussen',
          DateOfBirth: '1992-10-05',
          Nationality: 'Danish',
        },
        {
          PermanentNumber: 4,
          GivenName: 'Lando',
          FamilyName: 'Norris',
          DateOfBirth: '1999-11-13',
          Nationality: 'British',
        },
        {
          PermanentNumber: 31,
          GivenName: 'Esteban',
          FamilyName: 'Ocon',
          DateOfBirth: '1996-09-17',
          Nationality: 'French',
        },
        {
          PermanentNumber: 11,
          GivenName: 'Sergio',
          FamilyName: 'Pérez',
          DateOfBirth: '1990-01-26',
          Nationality: 'Mexican',
        },
        {
          PermanentNumber: 81,
          GivenName: 'Oscar',
          FamilyName: 'Piastri',
          DateOfBirth: '2001-04-06',
          Nationality: 'Australian',
        },
        {
          PermanentNumber: 63,
          GivenName: 'George',
          FamilyName: 'Russell',
          DateOfBirth: '1998-02-15',
          Nationality: 'British',
        },
        {
          PermanentNumber: 55,
          GivenName: 'Carlos',
          FamilyName: 'Sainz',
          DateOfBirth: '1994-09-01',
          Nationality: 'Spanish',
        },
        {
          PermanentNumber: 2,
          GivenName: 'Logan',
          FamilyName: 'Sargeant',
          DateOfBirth: '2000-12-31',
          Nationality: 'American',
        },
        {
          PermanentNumber: 18,
          GivenName: 'Lance',
          FamilyName: 'Stroll',
          DateOfBirth: '1998-10-29',
          Nationality: 'Canadian',
        },
        {
          PermanentNumber: 22,
          GivenName: 'Yuki',
          FamilyName: 'Tsunoda',
          DateOfBirth: '2000-05-11',
          Nationality: 'Japanese',
        },
        {
          PermanentNumber: 33,
          GivenName: 'Max',
          FamilyName: 'Verstappen',
          DateOfBirth: '1997-09-30',
          Nationality: 'Dutch',
        },
        {
          PermanentNumber: 24,
          GivenName: 'Guanyu',
          FamilyName: 'Zhou',
          DateOfBirth: '1999-05-30',
          Nationality: 'Chinese',
        },
      ],
    },
  },
};
