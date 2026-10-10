export function getAgeGroup(age) {
  if (age <= 18) return "0-18";
  if (age <= 35) return "19-35";
  if (age <= 60) return "36-60";

  return "60+";
}

export function filterApplications(applications, filters) {
  return applications.filter((application) => {
    const date = new Date(application.date);

    const fromMatch =
      !filters.dateFrom || date >= new Date(`${filters.dateFrom}T00:00:00`);

    const toMatch =
      !filters.dateTo || date <= new Date(`${filters.dateTo}T23:59:59`);

    const provinceMatch =
      filters.province === "All Provinces" ||
      application.province === filters.province;

    const districtMatch =
      filters.district === "All Districts" ||
      application.district === filters.district;

    const officeMatch =
      filters.office === "All Offices" || application.office === filters.office;

    const passportTypeMatch =
      filters.passportType === "All Types" ||
      application.passportType === filters.passportType;

    const statusMatch =
      filters.status === "All Status" || application.status === filters.status;

    const ageGroupMatch =
      filters.ageGroup === "All Ages" ||
      getAgeGroup(application.age) === filters.ageGroup;

    return (
      fromMatch &&
      toMatch &&
      provinceMatch &&
      districtMatch &&
      officeMatch &&
      passportTypeMatch &&
      statusMatch &&
      ageGroupMatch
    );
  });
}

export function getApplicationStats(applications) {
  return {
    total: applications.length,

    pending: applications.filter((item) => item.status === "Pending").length,

    inReview: applications.filter((item) => item.status === "In Review").length,

    approved: applications.filter((item) => item.status === "Approved").length,

    rejected: applications.filter((item) => item.status === "Rejected").length,
  };
}

export function getStatusBreakdown(applications) {
  const stats = getApplicationStats(applications);

  return [
    {
      label: "Approved",
      value: stats.approved,
      color: "#10b981",
    },
    {
      label: "Pending",
      value: stats.pending,
      color: "#f59e0b",
    },
    {
      label: "In review",
      value: stats.inReview,
      color: "#0e9fb0",
    },
    {
      label: "Rejected",
      value: stats.rejected,
      color: "#f43f5e",
    },
  ];
}

export function getApplicationTypes(applications) {
  const types = [
    "New Passport",
    "Renewal",
    "Lost / Stolen",
    "Damaged",
    "Data Correction",
  ];

  return types.map((type) => ({
    label: type,

    value: applications.filter(
      (application) => application.passportType === type,
    ).length,
  }));
}

export function getOfficeBreakdown(applications) {
  const offices = {};

  applications.forEach((application) => {
    if (!offices[application.office]) {
      offices[application.office] = 0;
    }

    offices[application.office] += 1;
  });

  return Object.entries(offices)
    .map(([name, value]) => ({
      name,
      value,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);
}

export function getWeeklyData(applications) {
  const days = [];

  for (let i = 6; i >= 0; i -= 1) {
    const date = new Date();

    date.setDate(date.getDate() - i);

    const dateString = date.toISOString().split("T")[0];

    const dailyApplications = applications.filter(
      (application) => application.date === dateString,
    );

    days.push({
      day: date.toLocaleDateString("en-US", {
        weekday: "short",
      }),

      received: dailyApplications.length,

      approved: dailyApplications.filter(
        (application) => application.status === "Approved",
      ).length,
    });
  }

  return days;
}

export function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value);
}
