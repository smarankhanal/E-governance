import axios from "axios";

const BASE_URL =
  "https://raw.githubusercontent.com/open-admin-data/nepal-administrative-divisions/main/data";

const API = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const getProvinces = async () => {
  const response = await API.get("/all-province.json");

  return response.data;
};

export const getDistricts = async (provinceId) => {
  const response = await API.get("/all-district.json");

  const districts = response.data.filter(
    (district) => district.parent?.id === provinceId,
  );

  return districts;
};

export const getMunicipalities = async (districtId) => {
  const response = await API.get("/all-local_unit.json");

  const municipalities = response.data.filter(
    (localUnit) => localUnit.parent?.id === districtId,
  );

  return municipalities;
};
export const getAllDistricts = async () => {
  const response = await API.get("/all-district.json");

  return response.data;
};
