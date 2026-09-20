import React, { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import {
  getProvinces,
  getDistricts,
  getMunicipalities,
} from "../../services/addressApi";
import LocationSelect from "../PassportForm/Appointment/LocationSelect";

export default function AddressSelector({
  prefix = "address",
  showCountry = true,
  showProvince = true,
  showDistrict = true,
  showMunicipality = true,
  showLocation = false,
  countryLabel = "Country",
  provinceLabel = "Province",
  districtLabel = "District",
  municipalityLabel = "Municipality",
  locationLabel = "Location",
}) {
  const { control, setValue } = useFormContext();

  // Watch only the values needed to load dependent fields.
  const [province, district, municipality, location] = useWatch({
    control,
    name: [
      `${prefix}.province`,
      `${prefix}.district`,
      `${prefix}.municipality`,
      `${prefix}.location`,
    ],
  });

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [locations, setLocations] = useState([]);

  const [loading, setLoading] = useState({
    province: false,
    district: false,
    municipality: false,
  });

  // Update one RHF field.
  const updateField = (field, value, shouldValidate = false) => {
    setValue(`${prefix}.${field}`, value, {
      shouldValidate,
      shouldDirty: true,
    });
  };

  // Clear a field and its corresponding display name.
  const clearField = (field) => {
    updateField(field, "");
    updateField(`${field}Name`, "");
  };

  // Fetch provinces once when the province selector is visible.
  useEffect(() => {
    if (!showProvince) return;

    const fetchProvinces = async () => {
      try {
        setLoading((prev) => ({ ...prev, province: true }));

        const data = await getProvinces();
        setProvinces(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch provinces:", error);
        setProvinces([]);
      } finally {
        setLoading((prev) => ({ ...prev, province: false }));
      }
    };

    fetchProvinces();
  }, [showProvince]);

  // Fetch districts whenever the selected province changes.
  useEffect(() => {
    if (!showDistrict || !province) {
      setDistricts([]);
      return;
    }

    const fetchDistricts = async () => {
      try {
        setLoading((prev) => ({ ...prev, district: true }));

        const data = await getDistricts(province);
        setDistricts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch districts:", error);
        setDistricts([]);
      } finally {
        setLoading((prev) => ({ ...prev, district: false }));
      }
    };

    fetchDistricts();
  }, [province, showDistrict]);

  // Fetch municipalities whenever the selected district changes.
  useEffect(() => {
    if (!showMunicipality || !district) {
      setMunicipalities([]);
      return;
    }

    const fetchMunicipalities = async () => {
      try {
        setLoading((prev) => ({ ...prev, municipality: true }));

        const data = await getMunicipalities(district);
        setMunicipalities(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch municipalities:", error);
        setMunicipalities([]);
      } finally {
        setLoading((prev) => ({ ...prev, municipality: false }));
      }
    };

    fetchMunicipalities();
  }, [district, showMunicipality]);

  // Generate appointment locations based on the selected district.
  // Kathmandu has two locations; other districts use the district itself.
  useEffect(() => {
    if (!showLocation || !district) {
      setLocations([]);
      return;
    }

    const selectedDistrict = districts.find((item) => item.id === district);
    const districtName = selectedDistrict?.name?.en || "";

    if (districtName === "Kathmandu") {
      setLocations([
        { id: "DOP_KATHMANDU", name: { en: "DOP, Kathmandu" } },
        { id: "KATHMANDU", name: { en: "Kathmandu" } },
      ]);
    } else {
      setLocations([
        {
          id: district,
          name: { en: districtName },
        },
      ]);
    }
  }, [district, districts, showLocation]);

  // Handle province selection and clear all dependent fields.
  const handleProvinceChange = (event) => {
    const value = event.target.value;
    const selected = provinces.find((item) => item.id === value);

    updateField("province", value, true);
    updateField("provinceName", selected?.name?.en || "");

    clearField("district");
    clearField("municipality");
    clearField("location");

    setDistricts([]);
    setMunicipalities([]);
    setLocations([]);
  };

  // Handle district selection and clear municipality/location.
  const handleDistrictChange = (event) => {
    const value = event.target.value;
    const selected = districts.find((item) => item.id === value);

    updateField("district", value, true);
    updateField("districtName", selected?.name?.en || "");

    clearField("municipality");
    clearField("location");

    setMunicipalities([]);
    setLocations([]);
  };

  // Handle municipality selection.
  const handleMunicipalityChange = (event) => {
    const value = event.target.value;
    const selected = municipalities.find((item) => item.id === value);

    updateField("municipality", value, true);
    updateField("municipalityName", selected?.name?.en || "");
  };

  // Handle appointment location selection.
  const handleLocationChange = (event) => {
    const value = event.target.value;
    const selected = locations.find((item) => item.id === value);

    updateField("location", value, true);
    updateField("locationName", selected?.name?.en || "");
  };

  const visibleFields = [
    showCountry,
    showProvince,
    showDistrict,
    showMunicipality,
    showLocation,
  ].filter(Boolean).length;

  const gridClass =
    visibleFields === 1
      ? "grid-cols-1"
      : visibleFields === 2
        ? "grid-cols-1 sm:grid-cols-2"
        : visibleFields === 3
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

  return (
    <div className={`grid gap-6 ${gridClass}`}>
      {showCountry && (
        <LocationSelect
          label={countryLabel}
          value="NEPAL"
          options={[{ id: "NEPAL", name: { en: "NEPAL" } }]}
          disabled
        />
      )}

      {showProvince && (
        <LocationSelect
          label={provinceLabel}
          value={province}
          options={provinces}
          onChange={handleProvinceChange}
          disabled={loading.province}
          placeholder={
            loading.province ? "Loading provinces..." : "Select province"
          }
        />
      )}

      {showDistrict && (
        <LocationSelect
          label={districtLabel}
          value={district}
          options={districts}
          onChange={handleDistrictChange}
          disabled={!province || loading.district}
          placeholder={
            loading.district ? "Loading districts..." : "Select district"
          }
        />
      )}

      {showMunicipality && (
        <LocationSelect
          label={municipalityLabel}
          value={municipality}
          options={municipalities}
          onChange={handleMunicipalityChange}
          disabled={!district || loading.municipality}
          placeholder={
            loading.municipality
              ? "Loading municipalities..."
              : "Select municipality"
          }
        />
      )}

      {showLocation && (
        <LocationSelect
          label={locationLabel}
          value={location}
          options={locations}
          onChange={handleLocationChange}
          disabled={!district}
          placeholder="Select location"
        />
      )}
    </div>
  );
}
