// useFormHooks.ts
import { DistrictType } from "@/app/api/auth/state/[stateId]/route";
import { State } from "@/components/VisitorForm";
import { useState, useEffect } from "react";
interface IS {
  data: State[];
}

interface ID {
  data: {
    _id: string;
    name: string;
  }[];
}
interface IP {
  data: {
    name: string;
    pincodes: number[];
  };
}
export function useVisitorFormHooks() {
  const [states, setStates] = useState<State[]>([]);
  const [districts, setDistricts] = useState<DistrictType[]>([]);
  const [pincodes, setPincodes] = useState<number[]>([]);

  useEffect(() => {
    loadStatesData();
  }, []);

  async function loadStatesData() {
    try {
      const statesData = await getStates();

      if (!statesData?.data) {
        console.error("Error fetching states data:", statesData);
        setStates([]);
        return; // Return early if there's no states data
      }

      setStates(statesData.data);

      //   const districtsData = await getDistricts({ state: statesData.data[0] });
      if (statesData.data.length > 0) {
        const firstState = statesData.data[0]._id;
        const districtsData = await getDistricts(firstState);

        if (!districtsData?.data) {
          console.error("Error fetching districts data:", districtsData);
          setDistricts([]);
        } else {
          setDistricts(districtsData.data);

          if (districtsData.data.length > 0) {
            const pincodesData = await getPincodes( districtsData.data[0]._id);

            if (!pincodesData?.data || !pincodesData.data.pincodes) {
              console.error("Error in getPincodes:", pincodesData);
              return;
            }

            setPincodes(pincodesData.data.pincodes);
          }
        }
      } else {
        console.error("No states data to fetch districts.");
        setDistricts([]);
      }
    } catch (error) {
      console.error("Error in loadStatesData:", error);
    }
  }

  async function handleStateChange(e: React.ChangeEvent<HTMLSelectElement>) {
    try {
      const districtsData = await getDistricts(e.target.value);
      if (districtsData) {
        setDistricts(districtsData.data);
        const pincodesData = await getPincodes( districtsData.data[0]._id);
        if (pincodesData) {
          setPincodes(pincodesData.data.pincodes);
        }
      } else {
        console.error("Error in getDistricts:", districtsData);
      }
    } catch (error) {
      // Handle other errors that might occur during the API call
      console.error("Error in handleStateChange:", error);
    }

    // Load pincodes for the default district here
  }

  async function handleDistrictChange(e: React.ChangeEvent<HTMLSelectElement>) {

    try {
      const pincodesData = await getPincodes(e.target.value);
      if (pincodesData) {
        setPincodes(pincodesData.data.pincodes);
      } else {
        console.error();
      }
    } catch (error) {
      console.error("Error in handleDistrictChange:", error);
    }
  }

  return {
    states,
    districts,
    pincodes,
    handleStateChange,
    handleDistrictChange,
  };
}

const getStates = async (): Promise<IS | null> => {
  try {
    const res = await fetch("api/auth/state");

    if (res.ok) {
      const state = await res.json();
      return state;
    } else {
      return null;
    }
  } catch (E) {
    return null;
  }
};

const getDistricts = async (state: string): Promise<ID | null> => {
  const url = `/api/auth/state/${state}`;
  try {
    const res = await fetch(url, {
      method: "GET",
    });
    if (res.ok) {
      const state = await res.json();
      return state;
    } else {
      return null;
    }
  } catch (E) {
    return null;
  }
};

const getPincodes = async (districtId: string): Promise<IP | null> => {
  const url = `/api/auth/district/${districtId}`;
  try {
    const res = await fetch(url, {
      method: "GET",
    });

    if (res.ok) {

      const pincodes =  await res.json();
      return pincodes
    }
    return null;
  } catch (E) {
    return null;
  }
};
