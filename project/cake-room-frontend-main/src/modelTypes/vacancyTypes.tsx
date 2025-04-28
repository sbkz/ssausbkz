export type vacancyCardType = {
    title:string,
    salary: string,
    _id: string,
    description: string,
    isActive: boolean
}
export type vacancyInfoType = {
    title:string,
    salary: string,
    _id: string,
    description: string,
    isActive: boolean,
    conditions: string[],
    duties: string[],
    requirements: string[],
} 