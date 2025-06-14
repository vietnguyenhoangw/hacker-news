import { sha256 } from 'js-sha256';

export const HashUtil = {
    hashIdList(ids: number[]) {
        return sha256(JSON.stringify(ids));
    },

    compareHashId(newIds: number[], oldHash: string) {
        const newHash = HashUtil.hashIdList(newIds);
        return newHash === oldHash;
    },
};
