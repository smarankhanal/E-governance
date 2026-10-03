import { useMemo, useState } from "react";
import {
  PageHeader,
  CollectionFilters,
  CollectionStats,
  PassportCollectionTable,
} from "../components";
import { INITIAL_PASSPORTS } from "../features/applications/applicationData";
export default function Collected() {
  const [passports, setPassports] = useState(INITIAL_PASSPORTS);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const markAsCollected = (id) => {
    const today = new Date();

    const collectionDate = `${today.getFullYear()}-${String(
      today.getMonth() + 1,
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    setPassports((currentPassports) =>
      currentPassports.map((passport) =>
        passport.id === id
          ? {
              ...passport,
              status: "Collected",
              collectionDate,
            }
          : passport,
      ),
    );
  };

  const filteredPassports = useMemo(() => {
    const searchValue = search.toLowerCase();

    return passports.filter((passport) => {
      const matchesFilter = filter === "All" || passport.status === filter;

      const matchesSearch =
        passport.name.toLowerCase().includes(searchValue) ||
        passport.applicationId.toLowerCase().includes(searchValue) ||
        passport.passportNumber.toLowerCase().includes(searchValue);

      return matchesFilter && matchesSearch;
    });
  }, [passports, filter, search]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Passport Collection"
        subtitle="Track passports that have been collected or are awaiting collection."
      />

      <CollectionStats passports={passports} />

      <CollectionFilters
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
      />

      <PassportCollectionTable
        passports={filteredPassports}
        onMarkCollected={markAsCollected}
      />
    </div>
  );
}
