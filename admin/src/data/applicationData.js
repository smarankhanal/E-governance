export const INITIAL_APPLICATIONS = [
  {
    id: 1001,
    status: "Pending",
    createdAt: "2026-09-28T09:30:00",
    updatedAt: "2026-09-28T09:30:00",

    passportType: {
      id: "first-issuance",
      en1: "FIRST ISSUANCE",
      en2: "(NEW)",
      keyword: "NEW",
    },

    personalDetails: {
      personal: {
        givenName: "Sita",
        middleName: "",
        surname: "Shrestha",
        gender: "Female",
        dateOfBirth: "2000-05-14",
        placeOfBirth: "Kathmandu",
        nationality: "Nepali",
        nin: "1234567890",
      },

      citizenship: {
        citizenshipNumber: "12-34-56-78901",
        issueDate: "2018-06-20",
        issueDistrict: "Kathmandu",
      },
    },

    contact: {
      email: "sita.shrestha@example.com",
      phoneNumber: "9841234567",
      alternatePhone: "",
    },

    address: {
      permanent: {
        country: "Nepal",
        province: "Bagmati",
        provinceName: "Bagmati Province",
        district: "Kathmandu",
        districtName: "Kathmandu",
        municipality: "Kathmandu Metropolitan City",
        ward: "10",
        street: "Baneshwor",
      },

      temporary: {
        country: "Nepal",
        province: "Bagmati",
        provinceName: "Bagmati Province",
        district: "Kathmandu",
        districtName: "Kathmandu",
        municipality: "Kathmandu Metropolitan City",
        ward: "10",
        street: "Baneshwor",
      },
    },

    appointment: {
      province: "Bagmati",
      provinceName: "Bagmati Province",
      district: "Kathmandu",
      districtName: "Kathmandu",
      location: "DOP_KATHMANDU",
      locationName: "Department of Passports",
      appointmentDate: "2026-10-05",
      appointmentTime: "10:00:00",
      email: "sita.shrestha@example.com",
      phoneNumber: "9841234567",
    },

    previousPassport: {
      passportNumber: "",
      issueDate: "",
      expiryDate: "",
      issuePlace: "",
    },

    proxy: {
      isProxy: false,
      givenName: "",
      surname: "",
      relationship: "",
      citizenshipNumber: "",
    },

    documents: [
      {
        id: "citizenship",
        name: "Citizenship Certificate",
        fileName: "citizenship-sita.pdf",
        status: "Verified",
        uploadedAt: "2026-09-28T09:40:00",
      },
    ],

    additionalDocuments: [],
  },

  {
    id: 1002,
    status: "Approved",
    createdAt: "2026-09-26T10:15:00",
    updatedAt: "2026-09-29T14:20:00",

    passportType: {
      id: "renewal",
      en1: "RENEWAL",
      en2: "",
      keyword: "RENEWAL",
    },

    personalDetails: {
      personal: {
        givenName: "Ramesh",
        middleName: "Prasad",
        surname: "Adhikari",
        gender: "Male",
        dateOfBirth: "1995-03-21",
        placeOfBirth: "Pokhara",
        nationality: "Nepali",
        nin: "2345678901",
      },

      citizenship: {
        citizenshipNumber: "34-56-78-90123",
        issueDate: "2013-08-15",
        issueDistrict: "Kaski",
      },
    },

    contact: {
      email: "ramesh.adhikari@example.com",
      phoneNumber: "9851234567",
      alternatePhone: "9812345678",
    },

    address: {
      permanent: {
        country: "Nepal",
        province: "Gandaki",
        provinceName: "Gandaki Province",
        district: "Kaski",
        districtName: "Kaski",
        municipality: "Pokhara Metropolitan City",
        ward: "8",
        street: "Lakeside",
      },

      temporary: {
        country: "Nepal",
        province: "Bagmati",
        provinceName: "Bagmati Province",
        district: "Kathmandu",
        districtName: "Kathmandu",
        municipality: "Kathmandu Metropolitan City",
        ward: "3",
        street: "Lazimpat",
      },
    },

    appointment: {
      province: "Bagmati",
      provinceName: "Bagmati Province",
      district: "Kathmandu",
      districtName: "Kathmandu",
      location: "DOP_KATHMANDU",
      locationName: "Department of Passports",
      appointmentDate: "2026-10-06",
      appointmentTime: "11:30:00",
      email: "ramesh.adhikari@example.com",
      phoneNumber: "9851234567",
    },

    previousPassport: {
      passportNumber: "PA1234567",
      issueDate: "2018-05-10",
      expiryDate: "2028-05-09",
      issuePlace: "Kathmandu",
    },

    proxy: {
      isProxy: false,
      givenName: "",
      surname: "",
      relationship: "",
      citizenshipNumber: "",
    },

    documents: [
      {
        id: "citizenship",
        name: "Citizenship Certificate",
        fileName: "citizenship-ramesh.pdf",
        status: "Verified",
        uploadedAt: "2026-09-26T10:25:00",
      },
      {
        id: "passport",
        name: "Previous Passport",
        fileName: "passport-ramesh.pdf",
        status: "Verified",
        uploadedAt: "2026-09-26T10:28:00",
      },
    ],

    additionalDocuments: [],
  },

  {
    id: 1003,
    status: "Rejected",
    createdAt: "2026-09-24T11:00:00",
    updatedAt: "2026-09-27T15:10:00",

    passportType: {
      id: "lost-stolen",
      en1: "LOST / STOLEN",
      en2: "",
      keyword: "LOST/STOLEN",
    },

    personalDetails: {
      personal: {
        givenName: "Mina",
        middleName: "",
        surname: "Gurung",
        gender: "Female",
        dateOfBirth: "1998-11-08",
        placeOfBirth: "Dharan",
        nationality: "Nepali",
        nin: "3456789012",
      },

      citizenship: {
        citizenshipNumber: "45-67-89-01234",
        issueDate: "2016-04-12",
        issueDistrict: "Sunsari",
      },
    },

    contact: {
      email: "mina.gurung@example.com",
      phoneNumber: "9861234567",
      alternatePhone: "",
    },

    address: {
      permanent: {
        country: "Nepal",
        province: "Koshi",
        provinceName: "Koshi Province",
        district: "Sunsari",
        districtName: "Sunsari",
        municipality: "Dharan Sub-Metropolitan City",
        ward: "12",
        street: "Bhanu Chowk",
      },

      temporary: {
        country: "Nepal",
        province: "Bagmati",
        provinceName: "Bagmati Province",
        district: "Kathmandu",
        districtName: "Kathmandu",
        municipality: "Kathmandu Metropolitan City",
        ward: "16",
        street: "Balaju",
      },
    },

    appointment: {
      province: "Bagmati",
      provinceName: "Bagmati Province",
      district: "Kathmandu",
      districtName: "Kathmandu",
      location: "DOP_KATHMANDU",
      locationName: "Department of Passports",
      appointmentDate: "2026-10-07",
      appointmentTime: "09:30:00",
      email: "mina.gurung@example.com",
      phoneNumber: "9861234567",
    },

    previousPassport: {
      passportNumber: "PB7654321",
      issueDate: "2019-07-20",
      expiryDate: "2029-07-19",
      issuePlace: "Kathmandu",
    },

    proxy: {
      isProxy: false,
      givenName: "",
      surname: "",
      relationship: "",
      citizenshipNumber: "",
    },

    documents: [
      {
        id: "citizenship",
        name: "Citizenship Certificate",
        fileName: "citizenship-mina.pdf",
        status: "Verified",
        uploadedAt: "2026-09-24T11:10:00",
      },
      {
        id: "police-report",
        name: "Police Report",
        fileName: "police-report-mina.pdf",
        status: "Rejected",
        uploadedAt: "2026-09-24T11:15:00",
      },
    ],

    additionalDocuments: [],
  },

  {
    id: 1004,
    status: "Pending",
    createdAt: "2026-09-29T08:45:00",
    updatedAt: "2026-09-29T08:45:00",

    passportType: {
      id: "damaged",
      en1: "DAMAGED",
      en2: "",
      keyword: "DAMAGED",
    },

    personalDetails: {
      personal: {
        givenName: "Bikash",
        middleName: "Kumar",
        surname: "Thapa",
        gender: "Male",
        dateOfBirth: "1992-09-17",
        placeOfBirth: "Chitwan",
        nationality: "Nepali",
        nin: "4567890123",
      },

      citizenship: {
        citizenshipNumber: "56-78-90-12345",
        issueDate: "2012-02-18",
        issueDistrict: "Chitwan",
      },
    },

    contact: {
      email: "bikash.thapa@example.com",
      phoneNumber: "9871234567",
      alternatePhone: "",
    },

    address: {
      permanent: {
        country: "Nepal",
        province: "Bagmati",
        provinceName: "Bagmati Province",
        district: "Chitwan",
        districtName: "Chitwan",
        municipality: "Bharatpur Metropolitan City",
        ward: "10",
        street: "Hakim Chowk",
      },

      temporary: {
        country: "Nepal",
        province: "Bagmati",
        provinceName: "Bagmati Province",
        district: "Kathmandu",
        districtName: "Kathmandu",
        municipality: "Kathmandu Metropolitan City",
        ward: "5",
        street: "New Baneshwor",
      },
    },

    appointment: {
      province: "Bagmati",
      provinceName: "Bagmati Province",
      district: "Kathmandu",
      districtName: "Kathmandu",
      location: "DOP_KATHMANDU",
      locationName: "Department of Passports",
      appointmentDate: "2026-10-08",
      appointmentTime: "13:00:00",
      email: "bikash.thapa@example.com",
      phoneNumber: "9871234567",
    },

    previousPassport: {
      passportNumber: "PC1122334",
      issueDate: "2017-03-15",
      expiryDate: "2027-03-14",
      issuePlace: "Kathmandu",
    },

    proxy: {
      isProxy: false,
      givenName: "",
      surname: "",
      relationship: "",
      citizenshipNumber: "",
    },

    documents: [
      {
        id: "citizenship",
        name: "Citizenship Certificate",
        fileName: "citizenship-bikash.pdf",
        status: "Verified",
        uploadedAt: "2026-09-29T08:55:00",
      },
      {
        id: "passport",
        name: "Damaged Passport",
        fileName: "damaged-passport-bikash.pdf",
        status: "Pending",
        uploadedAt: "2026-09-29T09:00:00",
      },
    ],

    additionalDocuments: [],
  },

  {
    id: 1005,
    status: "Approved",
    createdAt: "2026-09-22T13:20:00",
    updatedAt: "2026-09-25T10:30:00",

    passportType: {
      id: "modified",
      en1: "DATA CORRECTION",
      en2: "",
      keyword: "DATA CORRECTION",
    },

    personalDetails: {
      personal: {
        givenName: "Anita",
        middleName: "",
        surname: "Karki",
        gender: "Female",
        dateOfBirth: "1990-01-25",
        placeOfBirth: "Lalitpur",
        nationality: "Nepali",
        nin: "5678901234",
      },

      citizenship: {
        citizenshipNumber: "67-89-01-23456",
        issueDate: "2010-09-11",
        issueDistrict: "Lalitpur",
      },
    },

    contact: {
      email: "anita.karki@example.com",
      phoneNumber: "9881234567",
      alternatePhone: "9801234567",
    },

    address: {
      permanent: {
        country: "Nepal",
        province: "Bagmati",
        provinceName: "Bagmati Province",
        district: "Lalitpur",
        districtName: "Lalitpur",
        municipality: "Lalitpur Metropolitan City",
        ward: "4",
        street: "Jawalakhel",
      },

      temporary: {
        country: "Nepal",
        province: "Bagmati",
        provinceName: "Bagmati Province",
        district: "Lalitpur",
        districtName: "Lalitpur",
        municipality: "Lalitpur Metropolitan City",
        ward: "4",
        street: "Jawalakhel",
      },
    },

    appointment: {
      province: "Bagmati",
      provinceName: "Bagmati Province",
      district: "Kathmandu",
      districtName: "Kathmandu",
      location: "DOP_KATHMANDU",
      locationName: "Department of Passports",
      appointmentDate: "2026-10-09",
      appointmentTime: "14:30:00",
      email: "anita.karki@example.com",
      phoneNumber: "9881234567",
    },

    previousPassport: {
      passportNumber: "PD9988776",
      issueDate: "2016-01-12",
      expiryDate: "2026-01-11",
      issuePlace: "Kathmandu",
    },

    proxy: {
      isProxy: false,
      givenName: "",
      surname: "",
      relationship: "",
      citizenshipNumber: "",
    },

    documents: [
      {
        id: "citizenship",
        name: "Citizenship Certificate",
        fileName: "citizenship-anita.pdf",
        status: "Verified",
        uploadedAt: "2026-09-22T13:30:00",
      },
      {
        id: "passport",
        name: "Previous Passport",
        fileName: "passport-anita.pdf",
        status: "Verified",
        uploadedAt: "2026-09-22T13:35:00",
      },
    ],

    additionalDocuments: [
      {
        id: "national-id",
        name: "National Identity Card",
        fileName: "national-id-anita.pdf",
        status: "Verified",
        uploadedAt: "2026-09-22T13:40:00",
      },
    ],
  },

  {
    id: 1006,
    status: "Pending",
    createdAt: "2026-09-30T09:10:00",
    updatedAt: "2026-09-30T09:10:00",

    passportType: {
      id: "first-issuance",
      en1: "FIRST ISSUANCE",
      en2: "(NEW)",
      keyword: "NEW",
    },

    personalDetails: {
      personal: {
        givenName: "Prakash",
        middleName: "Raj",
        surname: "Bhandari",
        gender: "Male",
        dateOfBirth: "2003-07-03",
        placeOfBirth: "Butwal",
        nationality: "Nepali",
        nin: "6789012345",
      },

      citizenship: {
        citizenshipNumber: "78-90-12-34567",
        issueDate: "2021-05-24",
        issueDistrict: "Rupandehi",
      },
    },

    contact: {
      email: "prakash.bhandari@example.com",
      phoneNumber: "9811234567",
      alternatePhone: "",
    },

    address: {
      permanent: {
        country: "Nepal",
        province: "Lumbini",
        provinceName: "Lumbini Province",
        district: "Rupandehi",
        districtName: "Rupandehi",
        municipality: "Butwal Sub-Metropolitan City",
        ward: "11",
        street: "Traffic Chowk",
      },

      temporary: {
        country: "Nepal",
        province: "Bagmati",
        provinceName: "Bagmati Province",
        district: "Kathmandu",
        districtName: "Kathmandu",
        municipality: "Kathmandu Metropolitan City",
        ward: "7",
        street: "Chabahil",
      },
    },

    appointment: {
      province: "Bagmati",
      provinceName: "Bagmati Province",
      district: "Kathmandu",
      districtName: "Kathmandu",
      location: "DOP_KATHMANDU",
      locationName: "Department of Passports",
      appointmentDate: "2026-10-10",
      appointmentTime: "10:30:00",
      email: "prakash.bhandari@example.com",
      phoneNumber: "9811234567",
    },

    previousPassport: {
      passportNumber: "",
      issueDate: "",
      expiryDate: "",
      issuePlace: "",
    },

    proxy: {
      isProxy: false,
      givenName: "",
      surname: "",
      relationship: "",
      citizenshipNumber: "",
    },

    documents: [
      {
        id: "citizenship",
        name: "Citizenship Certificate",
        fileName: "citizenship-prakash.pdf",
        status: "Verified",
        uploadedAt: "2026-09-30T09:20:00",
      },
    ],

    additionalDocuments: [],
  },

  {
    id: 1007,
    status: "Approved",
    createdAt: "2026-09-20T15:00:00",
    updatedAt: "2026-09-23T11:45:00",

    passportType: {
      id: "renewal",
      en1: "RENEWAL",
      en2: "",
      keyword: "RENEWAL",
    },

    personalDetails: {
      personal: {
        givenName: "Saroj",
        middleName: "",
        surname: "Sharma",
        gender: "Male",
        dateOfBirth: "1987-12-12",
        placeOfBirth: "Biratnagar",
        nationality: "Nepali",
        nin: "7890123456",
      },

      citizenship: {
        citizenshipNumber: "89-01-23-45678",
        issueDate: "2007-07-18",
        issueDistrict: "Morang",
      },
    },

    contact: {
      email: "saroj.sharma@example.com",
      phoneNumber: "9821234567",
      alternatePhone: "",
    },

    address: {
      permanent: {
        country: "Nepal",
        province: "Koshi",
        provinceName: "Koshi Province",
        district: "Morang",
        districtName: "Morang",
        municipality: "Biratnagar Metropolitan City",
        ward: "5",
        street: "Main Road",
      },

      temporary: {
        country: "Nepal",
        province: "Bagmati",
        provinceName: "Bagmati Province",
        district: "Kathmandu",
        districtName: "Kathmandu",
        municipality: "Kathmandu Metropolitan City",
        ward: "14",
        street: "Kalanki",
      },
    },

    appointment: {
      province: "Bagmati",
      provinceName: "Bagmati Province",
      district: "Kathmandu",
      districtName: "Kathmandu",
      location: "DOP_KATHMANDU",
      locationName: "Department of Passports",
      appointmentDate: "2026-10-12",
      appointmentTime: "11:00:00",
      email: "saroj.sharma@example.com",
      phoneNumber: "9821234567",
    },

    previousPassport: {
      passportNumber: "PE4455667",
      issueDate: "2016-06-22",
      expiryDate: "2026-06-21",
      issuePlace: "Kathmandu",
    },

    proxy: {
      isProxy: false,
      givenName: "",
      surname: "",
      relationship: "",
      citizenshipNumber: "",
    },

    documents: [
      {
        id: "citizenship",
        name: "Citizenship Certificate",
        fileName: "citizenship-saroj.pdf",
        status: "Verified",
        uploadedAt: "2026-09-20T15:10:00",
      },
      {
        id: "passport",
        name: "Previous Passport",
        fileName: "passport-saroj.pdf",
        status: "Verified",
        uploadedAt: "2026-09-20T15:15:00",
      },
    ],

    additionalDocuments: [],
  },

  {
    id: 1008,
    status: "Rejected",
    createdAt: "2026-09-18T12:30:00",
    updatedAt: "2026-09-21T16:20:00",

    passportType: {
      id: "first-issuance",
      en1: "FIRST ISSUANCE",
      en2: "(NEW)",
      keyword: "NEW",
    },

    personalDetails: {
      personal: {
        givenName: "Nisha",
        middleName: "",
        surname: "Rai",
        gender: "Female",
        dateOfBirth: "2001-09-28",
        placeOfBirth: "Itahari",
        nationality: "Nepali",
        nin: "8901234567",
      },

      citizenship: {
        citizenshipNumber: "90-12-34-56789",
        issueDate: "2019-03-10",
        issueDistrict: "Sunsari",
      },
    },

    contact: {
      email: "nisha.rai@example.com",
      phoneNumber: "9801234567",
      alternatePhone: "",
    },

    address: {
      permanent: {
        country: "Nepal",
        province: "Koshi",
        provinceName: "Koshi Province",
        district: "Sunsari",
        districtName: "Sunsari",
        municipality: "Itahari Sub-Metropolitan City",
        ward: "6",
        street: "Itahari Chowk",
      },

      temporary: {
        country: "Nepal",
        province: "Bagmati",
        provinceName: "Bagmati Province",
        district: "Kathmandu",
        districtName: "Kathmandu",
        municipality: "Kathmandu Metropolitan City",
        ward: "8",
        street: "Gaushala",
      },
    },

    appointment: {
      province: "Bagmati",
      provinceName: "Bagmati Province",
      district: "Kathmandu",
      districtName: "Kathmandu",
      location: "DOP_KATHMANDU",
      locationName: "Department of Passports",
      appointmentDate: "2026-10-13",
      appointmentTime: "09:00:00",
      email: "nisha.rai@example.com",
      phoneNumber: "9801234567",
    },

    previousPassport: {
      passportNumber: "",
      issueDate: "",
      expiryDate: "",
      issuePlace: "",
    },

    proxy: {
      isProxy: false,
      givenName: "",
      surname: "",
      relationship: "",
      citizenshipNumber: "",
    },

    documents: [
      {
        id: "citizenship",
        name: "Citizenship Certificate",
        fileName: "citizenship-nisha.pdf",
        status: "Rejected",
        uploadedAt: "2026-09-18T12:40:00",
      },
    ],

    additionalDocuments: [],
  },
];

export const APPLICATION_STATUS = {
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};

export const PASSPORT_TYPES = {
  NEW: "NEW",
  RENEWAL: "RENEWAL",
  LOST_STOLEN: "LOST/STOLEN",
  DAMAGED: "DAMAGED",
  DATA_CORRECTION: "DATA CORRECTION",
};
export const APPOINTMENTS = [
  {
    id: 1,
    date: "2083-06-15",
    time: "10:00 AM",
    name: "Sita Kumari Shrestha",
    office: "Kathmandu",
  },
  {
    id: 2,
    date: "2083-06-15",
    time: "11:30 AM",
    name: "Anita Gurung",
    office: "Kathmandu",
  },
  {
    id: 3,
    date: "2083-06-16",
    time: "09:30 AM",
    name: "Ram Bahadur Thapa",
    office: "Pokhara",
  },
  {
    id: 4,
    date: "2083-06-16",
    time: "02:00 PM",
    name: "Mina Tamang",
    office: "Lalitpur",
  },
  {
    id: 5,
    date: "2083-06-17",
    time: "10:30 AM",
    name: "Suresh Adhikari",
    office: "Butwal",
  },
];
export const INITIAL_PASSPORTS = [
  {
    id: 1,
    applicationId: "APP-2083-00124",
    passportNumber: "PA1234567",
    name: "Sita Kumari Shrestha",
    office: "Kathmandu",
    passportType: "NEW",
    readyDate: "2083-06-14",
    collectionDate: "2083-06-15",
    status: "Collected",
  },
  {
    id: 2,
    applicationId: "APP-2083-00118",
    passportNumber: "PA1234521",
    name: "Ram Bahadur Thapa",
    office: "Pokhara",
    passportType: "RENEWAL",
    readyDate: "2083-06-15",
    collectionDate: null,
    status: "Not Collected",
  },
  {
    id: 3,
    applicationId: "APP-2083-00109",
    passportNumber: "PA1234498",
    name: "Mina Tamang",
    office: "Lalitpur",
    passportType: "RENEWAL",
    readyDate: "2083-06-15",
    collectionDate: "2083-06-16",
    status: "Collected",
  },
  {
    id: 4,
    applicationId: "APP-2083-00097",
    passportNumber: "PA1234412",
    name: "Suresh Adhikari",
    office: "Butwal",
    passportType: "NEW",
    readyDate: "2083-06-16",
    collectionDate: null,
    status: "Not Collected",
  },
  {
    id: 5,
    applicationId: "APP-2083-00091",
    passportNumber: "PA1234387",
    name: "Anita Gurung",
    office: "Kathmandu",
    passportType: "NEW",
    readyDate: "2083-06-17",
    collectionDate: "2083-06-18",
    status: "Collected",
  },
];
