export interface CvGeneratePayload {
  templateId: string
  projectsIds: number[]
  skillsIds: number[]
  languagesIds: number[]
  educationIds: number[]
  experienceIds: number[]
}


export interface CvTemplate {
  id: string
  name: string
  preview: string
}