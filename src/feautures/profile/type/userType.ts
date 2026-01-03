export type UserType = {
  id: string;
  name: string;
  email: string;
  phone: string;
  bio: string | null;
  title: string | null;
  subTitle: string | null;
  location: string | null;
  hostUrl: string | null;
  photoUrl: string | null;
  photoPath: string | null;
  cvUrl: string | null;
  cvPath: string | null;
};

export interface Summary {
  experiences: number;
  education: number;
  skills: number;
  projects: number;
  languages: number;
  socialMedias: number;
}