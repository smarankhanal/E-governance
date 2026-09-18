import React, { useEffect, useState } from "react";
import { MdInfoOutline } from "react-icons/md";

// import CancelButton from "../../Common/Button/CancelButton";
// import NextButton from "../../Common/Button/NextButton";
//import LocationSelect from "./LocationSelect";
import {
  getProvinces,
  getDistricts,
  getMunicipalities,
} from "../../services/addressApi";
import CancelButton from "../Common/Button/CancelButton";
import NextButton from "../Common/Button/NextButton";
import LocationSelect from "../PassportForm/Appointment/LocationSelect";

export default function NepalAddress() {
  // -----------------------------
  // Location state
  // -----------------------------

  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [location, setLocation] = useState("");

  // -----------------------------
  // API data
  // -----------------------------

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [locations, setLocations] = useState([]);

  // -----------------------------
  // Loading states
  // -----------------------------

  const [loadingProvince, setLoadingProvince] = useState(false);
  const [loadingDistrict, setLoadingDistrict] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);

  // -----------------------------
  // Fetch provinces
  // -----------------------------

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        setLoadingProvince(true);

        const data = await getProvinces();

        setProvinces(data);
      } catch (error) {
        console.error("Failed to fetch provinces:", error);
      } finally {
        setLoadingProvince(false);
      }
    };

    fetchProvinces();
  }, []);

  // -----------------------------
  // Fetch districts
  // when province changes
  // -----------------------------

  useEffect(() => {
    if (!province) {
      setDistricts([]);
      return;
    }

    const fetchDistricts = async () => {
      try {
        setLoadingDistrict(true);

        const data = await getDistricts(province);

        setDistricts(data);
      } catch (error) {
        console.error("Failed to fetch districts:", error);
      } finally {
        setLoadingDistrict(false);
      }
    };

    fetchDistricts();
  }, [province]);

  // -----------------------------
  // Fetch locations
  // when district changes
  // -----------------------------

  useEffect(() => {
    if (!district) {
      setLocations([]);
      return;
    }

    const fetchLocations = async () => {
      try {
        setLoadingLocation(true);

        const data = await getMunicipalities(district);

        setLocations(data);
      } catch (error) {
        console.error("Failed to fetch locations:", error);
      } finally {
        setLoadingLocation(false);
      }
    };

    fetchLocations();
  }, [district]);

  // -----------------------------
  // Province change
  // -----------------------------

  const handleProvinceChange = (event) => {
    const value = event.target.value;

    setProvince(value);

    // Reset everything below province
    setDistrict("");
    setLocation("");

    setDistricts([]);
    setLocations([]);
  };

  // -----------------------------
  // District change
  // -----------------------------

  const handleDistrictChange = (event) => {
    const value = event.target.value;

    setDistrict(value);

    // Reset location
    setLocation("");
    setLocations([]);
  };

  // -----------------------------
  // Next button
  // -----------------------------

  const handleNext = () => {
    console.log({
      country: "NEPAL",
      province,
      district,
      location,
    });
  };

  return (
    <div className="w-full px-2 py-4 sm:px-4">
      {/* Information message */}
      <div className="mt-8 flex items-center justify-center gap-2 rounded-lg bg-[#e5f0ff] px-4 py-5 text-center text-[#2874e8] sm:mt-12">
        <MdInfoOutline className="h-6 w-6 shrink-0" />

        <p className="font-serif text-base sm:text-xl">
          Please select one of the available locations.
        </p>
      </div>

      <section className="mt-10 sm:mt-12">
        {/* Heading */}
        <div className="text-center">
          <h2 className="font-serif text-2xl text-[#1c1c1c] sm:text-3xl">
            LOCATION
          </h2>

          <div className="mt-4 h-1 w-full bg-[#37659a]" />
        </div>

        {/* Location Fields */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Country */}
          <LocationSelect label="Appointment country" value="NEPAL" disabled />

          {/* Province */}
          <LocationSelect
            label="Appointment province"
            value={province}
            onChange={handleProvinceChange}
            options={provinces}
            placeholder={
              loadingProvince ? "Loading provinces..." : "Select province"
            }
          />

          {/* District */}
          <LocationSelect
            label="Appointment district"
            value={district}
            onChange={handleDistrictChange}
            options={districts}
            disabled={!province || loadingDistrict}
            placeholder={
              loadingDistrict ? "Loading districts..." : "Select district"
            }
          />

          {/* Location */}
          <LocationSelect
            label="Appointment location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            options={locations}
            disabled={!district || loadingLocation}
            placeholder={
              loadingLocation ? "Loading locations..." : "Select location"
            }
          />
        </div>
      </section>

      {/* Buttons */}
      <div className="mt-16 flex items-center justify-between sm:mt-32">
        <CancelButton />

        <NextButton
          disabled={!province || !district || !location}
          onClick={handleNext}
        />
      </div>
    </div>
  );
}
