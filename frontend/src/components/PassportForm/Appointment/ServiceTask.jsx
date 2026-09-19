import React, { useEffect, useState } from "react";
import { MdInfoOutline } from "react-icons/md";
import { useFormContext } from "react-hook-form";

import { getProvinces, getDistricts } from "../../../services/addressApi";

import CancelButton from "../../Common/Button/CancelButton";
import NextButton from "../../Common/Button/NextButton";
import LocationSelect from "../../PassportForm/Appointment/LocationSelect";
import InfoAlert from "../../Common/InfoAlert";
import Heading from "../../Common/Heading";

export default function ServiceTask({ onNext, onCancel }) {
  const { watch, setValue } = useFormContext();

  const province = watch("province");
  const district = watch("district");
  const location = watch("location");

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [locations, setLocations] = useState([]);

  const [loadingProvince, setLoadingProvince] = useState(false);

  const [loadingDistrict, setLoadingDistrict] = useState(false);

  const [loadingLocation, setLoadingLocation] = useState(false);

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

        setDistricts([]);
      } finally {
        setLoadingDistrict(false);
      }
    };

    fetchDistricts();
  }, [province]);

  useEffect(() => {
    if (!district) {
      setLocations([]);
      return;
    }

    const selectedDistrict = districts.find((item) => item.id === district);

    if (!selectedDistrict) {
      setLocations([]);
      return;
    }

    const districtName = selectedDistrict?.name?.en;

    if (districtName?.toLowerCase() === "kathmandu") {
      setLocations([
        {
          id: "DOP_KATHMANDU",
          name: {
            en: "DOP, Kathmandu",
          },
        },
        {
          id: "KATHMANDU",
          name: {
            en: "Kathmandu",
          },
        },
      ]);
    } else {
      setLocations([
        {
          id: selectedDistrict.id,
          name: {
            en: districtName,
          },
        },
      ]);
    }
  }, [district, districts]);

  const handleProvinceChange = (event) => {
    const value = event.target.value;

    const selectedProvince = provinces.find((item) => item.id === value);
    setValue("province", value, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setValue("provinceName", selectedProvince?.name?.en || "");

    setValue("district", "");
    setValue("districtName", "");

    setValue("location", "");
    setValue("locationName", "");

    setDistricts([]);
    setLocations([]);
  };

  const handleDistrictChange = (event) => {
    const value = event.target.value;

    const selectedDistrict = districts.find((item) => item.id === value);

    setValue("district", value, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setValue("districtName", selectedDistrict?.name?.en || "");
    setValue("location", "");
    setValue("locationName", "");
    setLocations([]);
  };

  const handleLocationChange = (event) => {
    const value = event.target.value;

    const selectedLocation = locations.find((item) => item.id === value);

    setValue("location", value, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setValue("locationName", selectedLocation?.name?.en || "");
  };

  return (
    <div className="w-full px-2 py-4 sm:px-4">
      <InfoAlert text="Please select one of the available locations." />

      <section className="mt-10 sm:mt-12">
        <Heading text="LOCATION" />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <LocationSelect label="Appointment country" value="NEPAL" disabled />

          <LocationSelect
            label="Appointment province"
            value={province}
            onChange={handleProvinceChange}
            options={provinces}
            placeholder={
              loadingProvince ? "Loading provinces..." : "Select province"
            }
          />

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

          <LocationSelect
            label="Appointment location"
            value={location}
            onChange={handleLocationChange}
            options={locations}
            disabled={!district || loadingLocation}
            placeholder={
              loadingLocation ? "Loading locations..." : "Select location"
            }
          />
        </div>
      </section>

      <div className="mt-16 flex items-center justify-between sm:mt-32">
        <CancelButton onClick={onCancel} />

        <NextButton
          disabled={!province || !district || !location}
          onClick={onNext}
        />
      </div>
    </div>
  );
}
