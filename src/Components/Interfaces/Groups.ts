interface IGroupItem {
    _id: string;
    name: string;
    totalParticipants: number;
    updatedAt: string;
    createdAt: string;
}

interface IGroupList {
    groups: IGroupItem[];
}