// Base de connaissances pour le Chatbot Pédagogique (Filières, Modules, Règles)

export const academicData = [
    {
        category: "Filières & Spécialités",
        icon: "🎓",
        items: [
            {
                id: "licences",
                title: "Licences Unifiées",
                description: "Formations de 3 ans (LMD)",
                details: {
                    specialites: [
                        "Automatique et Informatique Industrielle",
                        "Conception et production intégrée",
                        "Energies nouvelles et renouvelables",
                        "Génie Informatique: Systèmes Embarqués & IoT",
                        "Systèmes Electriques"
                    ],
                    duree: "3 ans (6 semestres)",
                    diplome: "Licence Appliquée/Nationale"
                }
            },
            {
                id: "masteres-pro",
                title: "Mastères Professionnels",
                description: "Formations spécialisées à vocation professionnelle",
                details: {
                    specialites: [
                        "Mastère en Génie Électrique",
                        "Mastère en Automatique",
                        "Mastère en Énergies Renouvelables"
                    ],
                    duree: "2 ans (4 semestres)",
                    acces: "Sur dossier après une Licence"
                }
            },
            {
                id: "master-recherche",
                title: "Masters de Recherche",
                description: "Formations orientées vers la recherche et le doctorat",
                details: {
                    specialites: [
                        "Master Recherche en Génie Électrique",
                        "Master Recherche en Automatique"
                    ],
                    duree: "2 ans (4 semestres)",
                    acces: "Sur dossier (excellence académique requise)"
                }
            }
        ]
    },
    {
        category: "Règles & Validation",
        icon: "⚖️",
        items: [
            {
                id: "regle-passage",
                title: "Règles de Passage (Licence)",
                description: "Conditions pour passer à l'année supérieure",
                content: [
                    "Moyenne Générale Annuelle (MGA) ≥ 10/20 : Passage admis",
                    "MGA entre 9 et 9.99 : Passage par rachat (si validé par le conseil)",
                    "Validation des crédits : 75% des crédits de l'année requis (45 crédits)",
                    "Note éliminatoire : < 6/10 dans une unité fondamentale peut bloquer le rachat"
                ]
            },
            {
                id: "calcul-moyenne",
                title: "Calcul des Moyennes",
                description: "Formule de calcul des moyennes semestrielles et annuelles",
                content: [
                    "Moyenne Matière = (Note DS * 0.4) + (Note Examen * 0.6)",
                    "Si TP inclus : (Note DS * 0.2) + (Note TP * 0.2) + (Note Examen * 0.6)",
                    "Moyenne UE (Unité) = Somme (Moyenne Matière * Coeff) / Somme Coeffs",
                    "Moyenne Semestre = Somme (Moyenne UE * Coeff UE) / Somme Coeffs UE"
                ]
            },
            {
                id: "absences",
                title: "Règles d'Assiduité",
                description: "Sanctions liées aux absences",
                content: [
                    "TD/TP : Présence obligatoire",
                    "3 absences non justifiées en TD/TP = Note 0/20 ou Exclusion",
                    "Absence justifiée (certificat médical) : Doit être déposé sous 48h",
                    "Absence examen : Note 0/20 sauf si justification majeure acceptée par l'administration"
                ]
            }
        ]
    },
    {
        category: "Modules & Coefficients",
        icon: "📊",
        items: [
            {
                id: "coeff-aii",
                title: "Automatique et Informatique Industrielle (AII)",
                description: "Modules principaux et coefficients (Exemple)",
                table: [
                    { module: "Automatique Linéaire", coeff: 4, credit: 6 },
                    { module: "Informatique Industrielle", coeff: 4, credit: 6 },
                    { module: "Électronique de Puissance", coeff: 3, credit: 5 },
                    { module: "Capteurs et Instrumentation", coeff: 2, credit: 3 },
                    { module: "Réseaux Locaux Industriels", coeff: 2, credit: 3 },
                    { module: "Anglais Technique", coeff: 1, credit: 2 }
                ]
            },
            {
                id: "coeff-cpi",
                title: "Conception et Production Intégrée (CPI)",
                description: "Modules principaux et coefficients (Exemple)",
                table: [
                    { module: "CAO / DAO", coeff: 4, credit: 6 },
                    { module: "Procédés de Fabrication", coeff: 4, credit: 6 },
                    { module: "Mécanique des Solides", coeff: 3, credit: 5 },
                    { module: "Gestion de Production", coeff: 2, credit: 3 },
                    { module: "Matériaux", coeff: 2, credit: 3 },
                    { module: "Qualité et Maintenance", coeff: 2, credit: 3 }
                ]
            },
            {
                id: "coeff-enr",
                title: "Energies Nouvelles et Renouvelables",
                description: "Modules principaux et coefficients (Exemple)",
                table: [
                    { module: "Thermodynamique", coeff: 3, credit: 5 },
                    { module: "Énergie Solaire Photovoltaïque", coeff: 4, credit: 6 },
                    { module: "Énergie Éolienne", coeff: 3, credit: 5 },
                    { module: "Transfert Thermique", coeff: 3, credit: 5 },
                    { module: "Mécanique des Fluides", coeff: 2, credit: 3 },
                    { module: "Audit Énergétique", coeff: 2, credit: 3 }
                ]
            },
            {
                id: "coeff-info",
                title: "Génie Informatique: Systèmes Embarqués & IoT",
                description: "Modules principaux et coefficients (Exemple)",
                table: [
                    { module: "Développement Web & Mobile", coeff: 4, credit: 6 },
                    { module: "Systèmes Embarqués", coeff: 4, credit: 6 },
                    { module: "Internet of Things (IoT)", coeff: 3, credit: 5 },
                    { module: "Base de Données Avancées", coeff: 3, credit: 5 },
                    { module: "Intelligence Artificielle", coeff: 2, credit: 3 },
                    { module: "Sécurité Informatique", coeff: 2, credit: 3 }
                ]
            },
            {
                id: "coeff-se",
                title: "Systèmes Electriques",
                description: "Modules principaux et coefficients (Exemple)",
                table: [
                    { module: "Machines Électriques", coeff: 4, credit: 6 },
                    { module: "Réseaux Électriques", coeff: 4, credit: 6 },
                    { module: "Électronique de Puissance", coeff: 3, credit: 5 },
                    { module: "Automatisme", coeff: 3, credit: 5 },
                    { module: "Installations Électriques", coeff: 2, credit: 3 },
                    { module: "Maintenance Électrique", coeff: 2, credit: 3 }
                ]
            }
        ]
    }
];

export const academicWelcomeMessages = [
    {
        type: "bot",
        text: "🎓 Bonjour ! Je suis votre **Assistant Pédagogique**.",
        timestamp: new Date()
    },
    {
        type: "bot",
        text: "Je peux répondre à vos questions sur : \n- Les filières et modules\n- Les coefficients\n- Les règles de passage et calcul de moyenne\n- L'orientation",
        timestamp: new Date()
    }
];

export const academicKeywords = {
    filiere: ["filiere", "specialite", "licence", "prepa", "ingenieur", "branche"],
    regle: ["regle", "passage", "rachat", "credit", "loi", "circulaire"],
    moyenne: ["moyenne", "calcul", "note", "score"],
    coeff: ["coeff", "coefficient", "matiere", "module", "cours"],
    absence: ["absence", "presence", "assiduite", "exclu"]
};
