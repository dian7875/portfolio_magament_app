export type SocialNetworkRefType = {
  id: number;
  name: string;
  redirectLink: string;
  hidden: boolean;
};


export type CreateSocialNetworkDto = Omit<
  SocialNetworkRefType,
  "id" | "hidden"
>;
