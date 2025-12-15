export const studentsData = [
  { id: 1, name: "Yassine Nasr", group: "2LTIC 1" },
  { id: 2, name: "Jane Doe", group: "2LTIC 1" },
  { id: 3, name: "John Smith", group: "2LTIC 2" },
];

export const initialAbsences = [
  {
    id: 1,
    studentId: 1,
    date: "2023-10-25",
    time: "08:30 - 10:00",
    subject: "Traitement Signal",
    status: "Non Justifié",
    justification: null,
    justificationFile: null,
  },
  {
    id: 2,
    studentId: 1,
    date: "2023-11-02",
    time: "10:15 - 11:45",
    subject: "Développement Web",
    status: "Justifié",
    justification: "Maladie",
    justificationFile: "certificat.pdf",
  },
  {
    id: 3,
    studentId: 2,
    date: "2023-10-28",
    time: "14:00 - 15:30",
    subject: "Anglais",
    status: "En Attente",
    justification: "Transport",
    justificationFile: "ticket.jpg",
  },
];
