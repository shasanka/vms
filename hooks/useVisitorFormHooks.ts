import { DistrictType } from "@/app/api/auth/state/[stateName]/route";
import { State } from "@/components/VisitorForm";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
interface IS {
  data: State[];
}

// interface ID {
//   data: {
//     id: string;
//     name: string;
//   }[];
// }
// interface IP {
//   data: {
//     name: string;
//     pincodes: number[];
//   };
// }
export function useVisitorFormHooks() {
  const { data: session } = useSession();
  const [states, setStates] = useState<State[]>([]);
  const [districts, setDistricts] = useState<[]>([]);

  useEffect(() => {
    loadStatesData();
  }, [session]);

  async function loadStatesData() {
    try {
      const statesData = await getStates();
      console.log("🚀 ~ file: useVisitorFormHooks.ts:33 ~ loadStatesData ~ statesData:", statesData)

      if (!statesData?.data) {
        console.error("Error fetching states data:", statesData);
        setStates([]);
        return; // Return early if there's no states data
      }

      setStates(statesData.data);

      //   const districtsData = await getDistricts({ state: statesData.data[0] });
      if (statesData.data.length > 0) {
        const firstState = statesData.data[0].id;
        const districtsData = await getDistricts(firstState);
        console.log("🚀 ~ file: useVisitorFormHooks.ts:47 ~ loadStatesData ~ districtsData:", districtsData)

        if (!districtsData?.data) {
          setDistricts([]);
        } else {
          setDistricts(districtsData.data.districts);

          // if (districtsData.data.length > 0) {
          //   const pincodesData = await getPincodes(districtsData.data[0].name);

          //   if (!pincodesData?.data || !pincodesData.data.pincodes) {
          //     console.error("Error in getPincodes:", pincodesData);
          //     return;
          //   }
          //   setPincodes(pincodesData.data.pincodes);
          // }
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
        setDistricts(districtsData.data.districts);
        // const pincodesData = await getPincodes(districtsData.data[0].name);
        // if (pincodesData) {
        //   setPincodes(pincodesData.data.pincodes);
        // }
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
    // try {
    //   const pincodesData = await getPincodes(e.target.value);
    //   if (pincodesData) {
    //     setPincodes(pincodesData.data.pincodes);
    //   } else {
    //     console.error();
    //   }
    // } catch (error) {
    //   console.error("Error in handleDistrictChange:", error);
    // }
  }

  const getStates = async (): Promise<IS | null> => {
    try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/state`, {
        method:'GET',
        headers: new Headers({
          Authorization: `Bearer ${session?.user.accessToken}`,
          "Content-Type": "application/json",
        }),
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

  const getDistricts = async (state: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/state/${state}`,
        {
          method: "GET",
          headers: new Headers({
            Authorization: `Bearer ${session?.user.accessToken}`,
            "Content-Type": "application/json",
          }),
        }
      );
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

  // const getPincodes = async (districtName: string): Promise<IP | null> => {
  //   const url = `/api/auth/district/${districtName}`;
  //   try {
  //     const res = await fetch(url, {
  //       method: "GET",
  //     });

  //     if (res.ok) {
  //       const pincodes = await res.json();
  //       return pincodes;
  //     }
  //     return null;
  //   } catch (E) {
  //     return null;
  //   }
  // };

  return {
    states,
    districts,
    // pincodes,
    handleStateChange,
    handleDistrictChange,
  };
}
