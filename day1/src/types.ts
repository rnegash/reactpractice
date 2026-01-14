export type Name = {
  language: string;
  text: string;
};

export type Country = {
  name: Name[];
  isoCode?: string;
  officialLanguages?: string[];
};
export type Countries = Country[];

type Short = {
  code: string;
  shortName: string;
};

export type PublicHolidays = [
  {
    comment: [
      {
        language: string;
        text: string;
      }
    ];
    endDate: string;
    id: string;
    name: Name[];
    nationwide: true;
    regionalScope: string;
    startDate: string;
    subdivisions: Short[];
    groups: Short[];
    tags: string;
    temporalScope: string;
    type: string;
  }
];
