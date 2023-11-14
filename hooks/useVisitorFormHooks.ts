import { IDistrict, IState } from "@/interface/common";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export function useVisitorFormHooks() {
  const { data: session } = useSession();
  const [states, setStates] = useState<IState[]>([]);
  const [districts, setDistricts] = useState<IDistrict[]>([]);
  const [pincodes, setPincodes] = useState<number[]>([]);
  useEffect(() => {
    if (session) loadStatesData();
  }, [session]);

  async function loadStatesData() {
    try {
      const statesData = await getStates(session?.user.accessToken);

      if (!statesData) {
        console.error("Error fetching states data:", statesData);
        setStates([]);
        return;
      }

      setStates(statesData);

      if (statesData.length > 0) {
        const firstState = statesData[0].id;
        const districtsData = await getDistricts(
          firstState,
          session?.user.accessToken
        );

        if (!districtsData) {
          setDistricts([]);
        } else {
          setDistricts(districtsData);

          if (districtsData.length > 0) {
            setPincodes(districtsData[0].pinCodes);
          } else setPincodes([]);
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
      const districtsData = await getDistricts(
        e.target.value,
        session?.user.accessToken
      );
      if (districtsData) {
        setDistricts(districtsData);
        if (districtsData[0]?.pinCodes) {
          setPincodes(districtsData[0].pinCodes);
        } else setPincodes([]);
      } else {
        setDistricts([]);
        setPincodes([]);
        console.error("Error in getDistricts:", districtsData);
      }
    } catch (error) {
      console.error("Error in handleStateChange:", error);
    }
  }

  async function handleDistrictChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedDistrict = districts.filter(
      (district) => district.name === e.target.value
    );
    if (selectedDistrict[0]?.pinCodes?.length > 0)
      setPincodes(selectedDistrict[0].pinCodes);
  }

  return {
    states,
    districts,
    pincodes,
    handleStateChange,
    handleDistrictChange,
  };
}

export const getStates = async (
  accessToken: string | undefined
): Promise<IState[] | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/state`,
      {
        method: "GET",
        headers: new Headers({
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        }),
      }
    );

    if (res.ok) {
      const state = await res.json();
      return state.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error in getStates:", error);
    return null;
  }
};

export const getDistricts = async (
  state: string,
  accessToken: string | undefined
):Promise<IDistrict[]|null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/state/${state}`,
      {
        method: "GET",
        headers: new Headers({
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        }),
      }
    );

    if (res.ok) {
      const stateData = await res.json();
      return stateData.data.districts as IDistrict[];
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error in getDistricts:", error);
    return null;
  }
};
