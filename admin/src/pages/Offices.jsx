import React, { useMemo, useState } from "react";
import { FiPlus } from "react-icons/fi";
import {
  OfficeFilters,
  OfficeCard,
  OfficeStats,
  OfficeModal,
} from "../components";
const INITIAL_OFFICES = [
  {
    id: 1,
    name: "Department of Passports",
    code: "DOP-HQ",
    province: "Bagmati",
    district: "Kathmandu",
    address: "Narayanhiti Path, Kathmandu",
    phone: "01-4200000",
    head: "Hari Prasad Sharma",
    capacity: 1200,
    hours: "10:00 – 17:00",
    active: true,
  },
  {
    id: 2,
    name: "Kathmandu District Office",
    code: "DAO-KTM",
    province: "Bagmati",
    district: "Kathmandu",
    address: "Babarmahal, Kathmandu",
    phone: "01-4211111",
    head: "Sunita Poudel",
    capacity: 600,
    hours: "10:00 – 17:00",
    active: true,
  },
  {
    id: 3,
    name: "Lalitpur District Office",
    code: "DAO-LTP",
    province: "Bagmati",
    district: "Lalitpur",
    address: "Pulchowk, Lalitpur",
    phone: "01-5522222",
    head: "Dipak Basnet",
    capacity: 350,
    hours: "10:00 – 17:00",
    active: true,
  },
  {
    id: 4,
    name: "Pokhara District Office",
    code: "DAO-PKR",
    province: "Gandaki",
    district: "Kaski",
    address: "Prithvi Chowk, Pokhara",
    phone: "061-520333",
    head: "Rajesh Khadka",
    capacity: 300,
    hours: "10:00 – 16:30",
    active: true,
  },
  {
    id: 5,
    name: "Biratnagar District Office",
    code: "DAO-BRT",
    province: "Koshi",
    district: "Morang",
    address: "Main Road, Biratnagar",
    phone: "021-470444",
    head: "Kabita Rai",
    capacity: 280,
    hours: "10:00 – 16:30",
    active: true,
  },
  {
    id: 6,
    name: "Butwal District Office",
    code: "DAO-BTL",
    province: "Lumbini",
    district: "Rupandehi",
    address: "Traffic Chowk, Butwal",
    phone: "071-540555",
    head: "Nirmala Joshi",
    capacity: 250,
    hours: "10:00 – 16:30",
    active: false,
  },
];

const PROVINCES = [
  "Koshi",
  "Madhesh",
  "Bagmati",
  "Gandaki",
  "Lumbini",
  "Karnali",
  "Sudurpashchim",
];

export default function Offices() {
  const [offices, setOffices] = useState(INITIAL_OFFICES);
  const [query, setQuery] = useState("");
  const [province, setProvince] = useState("All");
  const [modal, setModal] = useState(null);

  const usedProvinces = useMemo(
    () => [
      "All",
      ...PROVINCES.filter((p) =>
        offices.some((office) => office.province === p),
      ),
    ],
    [offices],
  );

  const filteredOffices = useMemo(() => {
    const search = query.toLowerCase();

    return offices.filter((office) => {
      const matchesProvince =
        province === "All" || office.province === province;

      const matchesSearch =
        `${office.name} ${office.code} ${office.district} ${office.head}`
          .toLowerCase()
          .includes(search);

      return matchesProvince && matchesSearch;
    });
  }, [offices, query, province]);

  const activeCount = offices.filter((office) => office.active).length;

  const totalCapacity = offices
    .filter((office) => office.active)
    .reduce((total, office) => total + office.capacity, 0);

  const toggleOffice = (id) => {
    setOffices((current) =>
      current.map((office) =>
        office.id === id
          ? {
              ...office,
              active: !office.active,
            }
          : office,
      ),
    );
  };

  const deleteOffice = (office) => {
    const confirmed = window.confirm(
      `Delete ${office.name}? Its appointments will need to be reassigned.`,
    );

    if (!confirmed) return;

    setOffices((current) => current.filter((item) => item.id !== office.id));
  };

  const saveOffice = (data) => {
    if (data.id) {
      setOffices((current) =>
        current.map((office) =>
          office.id === data.id ? { ...office, ...data } : office,
        ),
      );
    } else {
      setOffices((current) => [
        ...current,
        {
          ...data,
          id: Date.now(),
        },
      ]);
    }

    setModal(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Offices</h1>

          <p className="mt-1 text-sm text-slate-500">
            Passport offices, their contacts and daily capacity.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setModal("new")}
          className="inline-flex items-center gap-2 rounded-lg bg-[#17385f] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#1d4777] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0e9fb0] focus-visible:ring-offset-2"
        >
          <FiPlus size={16} />
          Add office
        </button>
      </div>

      {/* Statistics */}
      <OfficeStats
        totalOffices={offices.length}
        activeCount={activeCount}
        totalCapacity={totalCapacity}
      />

      {/* Filters */}
      <OfficeFilters
        provinces={usedProvinces}
        selectedProvince={province}
        onProvinceChange={setProvince}
        query={query}
        onQueryChange={setQuery}
      />

      {/* Offices */}
      {filteredOffices.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center text-sm text-slate-500">
          No offices match your search. Try a different name or province.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
          {filteredOffices.map((office) => (
            <OfficeCard
              key={office.id}
              office={office}
              onEdit={() => setModal(office)}
              onDelete={() => deleteOffice(office)}
              onToggle={() => toggleOffice(office.id)}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <OfficeModal
          office={modal === "new" ? null : modal}
          onClose={() => setModal(null)}
          onSave={saveOffice}
        />
      )}
    </div>
  );
}
