import StateModel from "@/models/state";
import data from './data.json'
import DistrictModel from "@/models/district";

interface IDistrict {
    name: string;
    pincodes: number[]
}

interface IState {
    name: string;
    district: IDistrict[]
}

export const transformedData: IState[] = Object.entries(data).reduce((result, [districtName, districtInfo]) => {
    const stateName = districtInfo.State;
    const pincodes = districtInfo.PinCodes;

    // Check if the state already exists in the transformed data
    const stateIndex = result.findIndex((stateData) => stateData.name === stateName);

    // If the state doesn't exist in the transformed data, add it
    if (stateIndex === -1) {
        result.push({ name: stateName, district: [] });
    }

    // Find the state in the transformed data and add the district
    const stateData = result.find((stateData) => stateData.name === stateName);
    if (stateData) {
        stateData.district.push({ name: districtName, pincodes });
    }

    return result;
}, [] as IState[]);

export const saveStates = async () => {
    const savedStates = [];
    const savedDistricts = [];
    transformedData.sort((a, b) => a.name.localeCompare(b.name));
    for (const stateData of transformedData) {
        const districtIds = [];

        // Sort districts alphabetically
        stateData.district.sort((a, b) => a.name.localeCompare(b.name));

        for (const district of stateData.district) {
            const newDistrict = new DistrictModel({
                name: district.name,
                pincodes: district.pincodes,
            });
            const savedDistrict = await newDistrict.save();
            districtIds.push(savedDistrict._id);
            savedDistricts.push(savedDistrict);
        }

        // Create and save state document with references to districts
        const newState = new StateModel({
            name: stateData.name,
            districtsID: districtIds,
        });

        const savedState = await newState.save();
        savedStates.push(savedState);
    }

    // Sort states alphabetically


    // Wait for all state documents to be saved
    await Promise.all(savedDistricts);
    const sortedStates = savedStates.sort((a, b) => a.name.localeCompare(b.name));
    await Promise.all(sortedStates);
}
