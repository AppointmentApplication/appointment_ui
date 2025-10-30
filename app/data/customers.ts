type MembershipLevel = "Bronze" | "Silver" | "Gold" | "Platinum";

export type Customer = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    registrationDate: string;
    membershipLevel: MembershipLevel;
    totalSpent: number;
};

export const Customers: Customer[] = [
    { id: 1, firstName: "Zeynep", lastName: "Aydın", email: "zeynep.aydin@example.com", phoneNumber: "05510000021", registrationDate: "2023-01-10T09:00:00Z", membershipLevel: "Gold", totalSpent: 18500 },
    { id: 2, firstName: "Kerem", lastName: "Polat", email: "kerem.polat@example.com", phoneNumber: "05510000022", registrationDate: "2022-05-03T10:00:00Z", membershipLevel: "Silver", totalSpent: 9200 },
    { id: 3, firstName: "Aslı", lastName: "Ergin", email: "asli.ergin@example.com", phoneNumber: "05510000023", registrationDate: "2021-08-22T14:30:00Z", membershipLevel: "Platinum", totalSpent: 25300 },
    { id: 4, firstName: "Mert", lastName: "Çelik", email: "mert.celik@example.com", phoneNumber: "05510000024", registrationDate: "2020-03-11T11:15:00Z", membershipLevel: "Gold", totalSpent: 14750 },
    { id: 5, firstName: "Elvan", lastName: "Demir", email: "elvan.demir@example.com", phoneNumber: "05510000025", registrationDate: "2023-07-15T09:45:00Z", membershipLevel: "Bronze", totalSpent: 2100 },
    { id: 6, firstName: "Tolga", lastName: "Koç", email: "tolga.koc@example.com", phoneNumber: "05510000026", registrationDate: "2022-10-08T08:50:00Z", membershipLevel: "Silver", totalSpent: 7800 },
    { id: 7, firstName: "Melisa", lastName: "Arslan", email: "melisa.arslan@example.com", phoneNumber: "05510000027", registrationDate: "2023-02-05T13:15:00Z", membershipLevel: "Gold", totalSpent: 16100 },
    { id: 8, firstName: "Sinem", lastName: "Uçar", email: "sinem.ucar@example.com", phoneNumber: "05510000028", registrationDate: "2021-11-30T08:20:00Z", membershipLevel: "Bronze", totalSpent: 2600 },
    { id: 9, firstName: "Can", lastName: "Turan", email: "can.turan@example.com", phoneNumber: "05510000029", registrationDate: "2022-06-18T16:00:00Z", membershipLevel: "Platinum", totalSpent: 32000 },
    { id: 10, firstName: "İpek", lastName: "Kurtuluş", email: "ipek.kurtulus@example.com", phoneNumber: "05510000030", registrationDate: "2023-09-02T10:40:00Z", membershipLevel: "Gold", totalSpent: 13400 },
];
