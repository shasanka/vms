// useFormHooks.ts
import { DistrictType } from '@/app/api/auth/district/route';
import { useState, useEffect } from 'react';
interface IS {
    data: string[]
}

interface ID {
    data: {
        _id: string,
        name: string
    }[]
}
interface IP {
    data: {
        name: string;
        pincodes: number[]
    }
}
export function useVisitorFormHooks() {
    const [states, setStates] = useState<string[]>([]);
    const [districts, setDistricts] = useState<DistrictType[]>([]);
    const [pincodes, setPincodes] = useState<number[]>([]);

    useEffect(() => {
        loadStatesData();
    }, []);


    async function loadStatesData() {
        try {
            const statesData = await getStates();

            if (!statesData) {
                console.error('Error in getStates:', statesData);
                return;
            }

            const districtsData = await getDistricts({ state: statesData.data[0] });

            if (!districtsData) {
                console.error('Error in getDistricts:', districtsData);
                return;
            }

            const pincodesData = await getPincodes({ districtID: districtsData.data[0]._id });

            if (!pincodesData) {
                console.error('Error in getPincodes:', pincodesData);
                return;
            }

            setStates(statesData.data);
            setDistricts(districtsData.data);
            setPincodes(pincodesData.data.pincodes);
        } catch (error) {
            console.error('Error in loadStatesData:', error);
        }
    }

    async function handleStateChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const params = {
            state: e.target.value
        }
        try {
            const districtsData = await getDistricts(params);
            if (districtsData) {
                setDistricts(districtsData.data);
                const pincodesData = await getPincodes({
                    districtID: districtsData.data[0]._id
                })
                if (pincodesData) {
                    setPincodes(pincodesData.data.pincodes)
                }
            } else {
                console.error('Error in getDistricts:', districtsData);
            }
        } catch (error) {
            // Handle other errors that might occur during the API call
            console.error('Error in handleStateChange:', error);
        }

        // Load pincodes for the default district here
    }

    async function handleDistrictChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const param = {
            districtID: e.target.value
        }
        try {
            const pincodesData = await getPincodes(param);
            if (pincodesData) {
                setPincodes(pincodesData.data.pincodes);
            } else {
                console.error()
            }
        } catch (error) {
            console.error('Error in handleDistrictChange:', error);
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
            return await res.json();

        }
        else {
            return null
        }
    } catch (E) {
        return null
    }
};

const getDistricts = async (param: { state: string }): Promise<ID | null> => {
    const searchParams = new URLSearchParams(param).toString();
    const url = `/api/auth/district?${searchParams}`;
    try {
        const res = await fetch(url, {
            method: "GET",
        });
        if (res.ok) {
            return await res.json();
        } else {
            return null
        }
    } catch (E) {
        return null
    }
};


const getPincodes = async (param: { districtID: string }): Promise<IP | null> => {
    const searchParams = new URLSearchParams(param).toString();
    const url = `/api/auth/pincode?${searchParams}`;
    try {
        const res = await fetch(url, {
            method: "GET",
        });

        if (res.ok) return await res.json()
        return null
    } catch (E) {
        return null
    }
};

