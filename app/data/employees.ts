type WorkDay =
    | "Pazartesi"
    | "Salı"
    | "Çarşamba"
    | "Perşembe"
    | "Cuma"
    | "Cumartesi"
    | "Pazar";

type Employee = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    employmentStartDate: string;
    title:
    | "Uzman Doktor"
    | "Doktor"
    | "Profesör"
    | "Uzman Estetisyen"
    | "Estetisyen"
    | "Asistan Estetisyen";
    workDays: WorkDay[];
    workStart: string;
    workEnd: string;
};

const titles: Employee["title"][] = [
    "Uzman Doktor",
    "Doktor",
    "Profesör",
    "Uzman Estetisyen",
    "Estetisyen",
    "Asistan Estetisyen",
];

const days: WorkDay[][] = [
    ["Pazartesi", "Salı", "Çarşamba"],
    ["Perşembe", "Cuma", "Cumartesi"],
    ["Pazartesi", "Salı", "Perşembe"],
    ["Çarşamba", "Cuma"],
    ["Salı", "Çarşamba", "Cuma"],
];

export const Employees: Employee[] = [
    { id: 1, firstName: "Ali", lastName: "Balun", email: "ali.balun@example.com", phoneNumber: "05510000001", employmentStartDate: "2021-01-05T08:00:00Z", title: "Uzman Doktor", workDays: ["Pazartesi", "Salı", "Çarşamba"], workStart: "08:00", workEnd: "16:00" },
    { id: 2, firstName: "Ahmet", lastName: "Taka", email: "ahmet.taka@example.com", phoneNumber: "05510000002", employmentStartDate: "2020-03-12T08:00:00Z", title: "Doktor", workDays: ["Perşembe", "Cuma", "Cumartesi"], workStart: "09:00", workEnd: "17:00" },
    { id: 3, firstName: "Selin", lastName: "Güneş", email: "selin.gunes@example.com", phoneNumber: "05510000003", employmentStartDate: "2019-06-21T08:00:00Z", title: "Profesör", workDays: ["Pazartesi", "Salı", "Perşembe"], workStart: "08:30", workEnd: "16:30" },
    { id: 4, firstName: "Mehmet", lastName: "Kaya", email: "mehmet.kaya@example.com", phoneNumber: "05510000004", employmentStartDate: "2022-02-10T08:00:00Z", title: "Uzman Estetisyen", workDays: ["Çarşamba", "Cuma"], workStart: "10:00", workEnd: "18:00" },
    { id: 5, firstName: "Gizem", lastName: "Kara", email: "gizem.kara@example.com", phoneNumber: "05510000005", employmentStartDate: "2021-11-15T08:00:00Z", title: "Estetisyen", workDays: ["Salı", "Çarşamba", "Cuma"], workStart: "08:00", workEnd: "16:00" },
    { id: 6, firstName: "Burak", lastName: "Yılmaz", email: "burak.yilmaz@example.com", phoneNumber: "05510000006", employmentStartDate: "2020-07-18T08:00:00Z", title: "Asistan Estetisyen", workDays: ["Pazartesi", "Perşembe"], workStart: "09:00", workEnd: "17:00" },
    { id: 7, firstName: "Ayşe", lastName: "Demir", email: "ayse.demir@example.com", phoneNumber: "05510000007", employmentStartDate: "2019-09-20T08:00:00Z", title: "Uzman Doktor", workDays: ["Salı", "Çarşamba", "Cuma"], workStart: "08:30", workEnd: "16:30" },
    { id: 8, firstName: "Emre", lastName: "Ak", email: "emre.ak@example.com", phoneNumber: "05510000008", employmentStartDate: "2021-05-25T08:00:00Z", title: "Doktor", workDays: ["Pazartesi", "Salı", "Perşembe"], workStart: "08:00", workEnd: "16:00" },
    { id: 9, firstName: "Elif", lastName: "Koç", email: "elif.koc@example.com", phoneNumber: "05510000009", employmentStartDate: "2022-01-10T08:00:00Z", title: "Profesör", workDays: ["Çarşamba", "Cuma"], workStart: "09:00", workEnd: "17:00" },
    { id: 10, firstName: "Okan", lastName: "Arslan", email: "okan.arslan@example.com", phoneNumber: "05510000010", employmentStartDate: "2020-11-30T08:00:00Z", title: "Uzman Estetisyen", workDays: ["Salı", "Çarşamba", "Cuma"], workStart: "08:00", workEnd: "16:00" },
    { id: 11, firstName: "Seda", lastName: "Kurt", email: "seda.kurt@example.com", phoneNumber: "05510000011", employmentStartDate: "2021-02-14T08:00:00Z", title: "Estetisyen", workDays: ["Pazartesi", "Perşembe"], workStart: "08:00", workEnd: "16:00" },
    { id: 12, firstName: "Deniz", lastName: "Aydın", email: "deniz.aydin@example.com", phoneNumber: "05510000012", employmentStartDate: "2020-06-12T08:00:00Z", title: "Asistan Estetisyen", workDays: ["Çarşamba", "Cuma"], workStart: "09:00", workEnd: "17:00" },
    { id: 13, firstName: "Murat", lastName: "Öztürk", email: "murat.ozturk@example.com", phoneNumber: "05510000013", employmentStartDate: "2019-08-03T08:00:00Z", title: "Uzman Doktor", workDays: ["Salı", "Çarşamba", "Cuma"], workStart: "08:30", workEnd: "16:30" },
    { id: 14, firstName: "Hülya", lastName: "Erdoğan", email: "hulya.erdogan@example.com", phoneNumber: "05510000014", employmentStartDate: "2022-03-11T08:00:00Z", title: "Doktor", workDays: ["Pazartesi", "Salı", "Perşembe"], workStart: "08:00", workEnd: "16:00" },
    { id: 15, firstName: "Cem", lastName: "Taş", email: "cem.tas@example.com", phoneNumber: "05510000015", employmentStartDate: "2021-09-19T08:00:00Z", title: "Profesör", workDays: ["Çarşamba", "Cuma"], workStart: "09:00", workEnd: "17:00" },
    { id: 16, firstName: "Derya", lastName: "Yıldız", email: "derya.yildiz@example.com", phoneNumber: "05510000016", employmentStartDate: "2020-12-22T08:00:00Z", title: "Uzman Estetisyen", workDays: ["Salı", "Çarşamba", "Cuma"], workStart: "08:00", workEnd: "16:00" },
    { id: 17, firstName: "Fatih", lastName: "Polat", email: "fatih.polat@example.com", phoneNumber: "05510000017", employmentStartDate: "2021-07-08T08:00:00Z", title: "Estetisyen", workDays: ["Pazartesi", "Perşembe"], workStart: "08:00", workEnd: "16:00" },
    { id: 18, firstName: "Selma", lastName: "Gür", email: "selma.gur@example.com", phoneNumber: "05510000018", employmentStartDate: "2020-05-15T08:00:00Z", title: "Asistan Estetisyen", workDays: ["Çarşamba", "Cuma"], workStart: "09:00", workEnd: "17:00" },
    { id: 19, firstName: "Serkan", lastName: "Öz", email: "serkan.oz@example.com", phoneNumber: "05510000019", employmentStartDate: "2019-04-01T08:00:00Z", title: "Uzman Doktor", workDays: ["Salı", "Çarşamba", "Cuma"], workStart: "08:30", workEnd: "16:30" },
    { id: 20, firstName: "Buse", lastName: "Koç", email: "buse.koc@example.com", phoneNumber: "05510000020", employmentStartDate: "2022-01-12T08:00:00Z", title: "Doktor", workDays: ["Pazartesi", "Salı", "Perşembe"], workStart: "08:00", workEnd: "16:00" },
];