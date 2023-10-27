import { IOpt } from "@/interface/common";

const StringIsNumber = (value: string) => !isNaN(Number(value));

export function generateIOptsFromEnum<T extends object>(
    enumObject: T,
    stringsToRemove: string[] = [],
    stringsToReplace: { oldStr: string; newStr: string }[] = [],
    capitalizeLastWord: boolean = true
): IOpt[] {
    return Object.keys(enumObject)
        .filter((key) => StringIsNumber(key)) // Filter out non-numeric keys
        .filter((key) => key !== '0') // Exclude enum value 'PSDFILTER_NOT_USED' with value 0
        .map((key) => {
            let desc = enumObject[key as keyof T] as string;

            // Remove specified strings
            for (const strToRemove of stringsToRemove) {
                desc = desc.replace(new RegExp(strToRemove, 'g'), '');
            }

            // Replace specified strings
            for (const { oldStr, newStr } of stringsToReplace) {
                desc = desc.replace(new RegExp(oldStr, 'g'), newStr);
            }

            if (capitalizeLastWord) {
                const words = desc.split(' ');
                const modifiedWords = words.map(word => {
                    if (word.length > 0) {
                        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                    } else {
                        return word;
                    }
                });

                desc = modifiedWords.join(' ');
            }

            return {
                desc,
                value: Number(key), // Enum value as the number
            };
        });
}