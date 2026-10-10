import React, { useMemo, useState } from "react";
import { FiPlus } from "react-icons/fi";
import {
  OfficeFilters,
  OfficeCard,
  OfficeStats,
  OfficeModal,
} from "../features/offices";
import { INITIAL_OFFICES, PROVINCES } from "../features/offices/officesData";

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
