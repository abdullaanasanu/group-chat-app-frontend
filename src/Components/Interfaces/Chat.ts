interface IChatMessage {
  _id: string;
  group: any;
  user: any;
  message: string;
  createdAt: string;
  updatedAt: string;
}

interface IChatParticipant {
  _id: string;
  group: string;
  user: any;
  createdAt: string;
  updatedAt: string;
}
