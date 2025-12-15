// Base de connaissances statique pour les procédures administratives
export const proceduresData = [
    {
        category: "Attestations",
        icon: "📄",
        procedures: [
            {
                id: "attestation-inscription",
                title: "Attestation d'Inscription",
                description: "Document officiel prouvant que vous êtes inscrit à l'ISSAT",
                steps: [
                    "Se rendre au Bureau de Scolarité (Bâtiment Administratif)",
                    "Présenter votre carte d'étudiant",
                    "Remplir le formulaire de demande",
                    "Payer les frais administratifs (5 DT)",
                    "Récupérer l'attestation signée et cachetée"
                ],
                documents: [
                    "Carte d'identité nationale ou passeport",
                    "Carte d'étudiant",
                    "Reçu de paiement des frais d'inscription"
                ],
                delai: "Délivrance immédiate (même jour)",
                bureau: "Bureau de Scolarité - Bâtiment Administratif",
                horaire: "Du lundi au vendredi : 8h30 - 16h00",
                conseil: "Venez tôt le matin pour éviter la file d'attente"
            },
            {
                id: "attestation-reussite",
                title: "Attestation de Réussite",
                description: "Document certifiant votre réussite à un semestre ou une année",
                steps: [
                    "Vérifier que vos résultats sont définitifs (délibérations terminées)",
                    "Se rendre au Bureau de Scolarité",
                    "Présenter votre carte d'étudiant",
                    "Remplir le formulaire de demande d'attestation",
                    "Payer les frais administratifs (5 DT)",
                    "Récupérer l'attestation dans les 48h"
                ],
                documents: [
                    "Carte d'identité nationale",
                    "Carte d'étudiant",
                    "Reçu de paiement"
                ],
                delai: "2 à 3 jours ouvrables",
                bureau: "Bureau de Scolarité - Bâtiment Administratif",
                horaire: "Du lundi au vendredi : 8h30 - 16h00",
                conseil: "Attendez la publication officielle des résultats avant de faire la demande"
            },
            {
                id: "attestation-presence",
                title: "Attestation de Présence",
                description: "Document prouvant votre assiduité aux cours",
                steps: [
                    "Demander à chaque enseignant de signer votre feuille de présence",
                    "Se rendre au Bureau de Scolarité avec les feuilles signées",
                    "Remplir le formulaire de demande",
                    "Payer les frais administratifs (5 DT)",
                    "Récupérer l'attestation"
                ],
                documents: [
                    "Carte d'étudiant",
                    "Feuilles de présence signées par les enseignants",
                    "Carte d'identité"
                ],
                delai: "1 à 2 jours ouvrables",
                bureau: "Bureau de Scolarité",
                horaire: "Du lundi au vendredi : 8h30 - 16h00",
                conseil: "Gardez une trace de votre présence tout au long du semestre"
            }
        ]
    },
    {
        category: "Réclamations",
        icon: "📝",
        procedures: [
            {
                id: "reclamation-note",
                title: "Réclamation de Note",
                description: "Contester une note d'examen ou de contrôle",
                steps: [
                    "Attendre la publication officielle des notes",
                    "Remplir le formulaire de réclamation au Bureau de Scolarité",
                    "Indiquer précisément la matière et le type d'évaluation concernée",
                    "Payer les frais de réclamation (10 DT par matière)",
                    "Soumettre la réclamation dans les délais (72h après publication)",
                    "Attendre la réponse de la commission de révision (7-10 jours)"
                ],
                documents: [
                    "Carte d'étudiant",
                    "Formulaire de réclamation rempli",
                    "Reçu de paiement des frais",
                    "Copie du relevé de notes contesté (si disponible)"
                ],
                delai: "Réponse dans 7 à 10 jours ouvrables",
                bureau: "Bureau de Scolarité",
                horaire: "Du lundi au vendredi : 8h30 - 16h00",
                conseil: "Respectez le délai de 72h, aucune réclamation ne sera acceptée après ce délai"
            },
            {
                id: "reclamation-examen",
                title: "Réclamation sur Déroulement d'Examen",
                description: "Signaler un problème lors d'un examen",
                steps: [
                    "Signaler le problème immédiatement au surveillant",
                    "Rédiger un rapport écrit détaillé le jour même",
                    "Se rendre au Bureau de Scolarité dans les 24h",
                    "Déposer votre réclamation écrite avec témoignages si possible",
                    "Obtenir un accusé de réception",
                    "Attendre la réponse de l'administration"
                ],
                documents: [
                    "Réclamation écrite et détaillée",
                    "Carte d'étudiant",
                    "Témoignages d'autres étudiants (si applicable)",
                    "Rapport du surveillant (si disponible)"
                ],
                delai: "Traitement sous 5 jours",
                bureau: "Bureau de Scolarité / Direction des Études",
                horaire: "Immédiatement après l'incident",
                conseil: "Plus vous agissez vite, mieux c'est. Gardez toutes les preuves."
            }
        ]
    },
    {
        category: "Demandes Officielles",
        icon: "📋",
        procedures: [
            {

                documents: [
                    "Formulaire de convention rempli (3 exemplaires)",
                    "Carte d'étudiant",
                    "Attestation d'inscription",
                    "CV et lettre de motivation (pour l'organisme)",
                    "Assurance responsabilité civile"
                ],
                delai: "5 à 7 jours ouvrables",
                bureau: "Bureau des Stages et Relations Entreprises",
                horaire: "Du lundi au jeudi : 9h00 - 15h00",
                conseil: "Prévoyez 2 semaines avant le début de votre stage pour toutes les signatures"
            },
            {
                id: "releve-notes",
                title: "Relevé de Notes",
                description: "Obtenir un relevé officiel de vos notes",
                steps: [
                    "Se rendre au Bureau de Scolarité",
                    "Remplir le formulaire de demande de relevé",
                    "Préciser le semestre/année concerné(e)",
                    "Payer les frais administratifs (5 DT)",
                    "Récupérer le relevé dans les délais indiqués"
                ],
                documents: [
                    "Carte d'étudiant",
                    "Carte d'identité",
                    "Reçu de paiement"
                ],
                delai: "2 à 3 jours ouvrables",
                bureau: "Bureau de Scolarité",
                horaire: "Du lundi au vendredi : 8h30 - 16h00",
                conseil: "Demandez un relevé certifié conforme si vous en avez besoin pour une candidature"
            },
            {
                id: "carte-etudiant",
                title: "Carte d'Étudiant (Nouvelle/Renouvellement)",
                description: "Obtenir ou renouveler votre carte d'étudiant",
                steps: [
                    "Apporter 2 photos d'identité récentes",
                    "Se rendre au Bureau de Scolarité",
                    "Remplir le formulaire de demande",
                    "Payer les frais (15 DT pour nouvelle carte, 20 DT pour renouvellement après perte)",
                    "Récupérer votre carte dans 7 à 10 jours"
                ],
                documents: [
                    "2 photos d'identité récentes (fond blanc)",
                    "Carte d'identité nationale",
                    "Attestation d'inscription de l'année en cours",
                    "Ancienne carte (pour renouvellement)",
                    "Déclaration de perte (si carte perdue)"
                ],
                delai: "7 à 10 jours ouvrables",
                bureau: "Bureau de Scolarité",
                horaire: "Du lundi au vendredi : 8h30 - 16h00",
                conseil: "Prévoyez un délai supplémentaire en début d'année universitaire"
            },
            {
                id: "transfert-dossier",
                title: "Demande de Transfert",
                description: "Transférer votre dossier vers un autre établissement",
                steps: [
                    "Obtenir une lettre d'acceptation de l'établissement d'accueil",
                    "Rédiger une demande de transfert manuscrite",
                    "Se rendre au Bureau de Scolarité avec tous les documents",
                    "Remplir le formulaire de transfert",
                    "Attendre l'étude de votre dossier par la commission",
                    "Récupérer la décision (acceptation ou refus)",
                    "Si accepté, retirer votre dossier académique complet"
                ],
                documents: [
                    "Lettre d'acceptation de l'établissement d'accueil",
                    "Demande manuscrite motivée",
                    "Carte d'étudiant",
                    "Relevés de notes de toutes les années",
                    "Attestation de non-dette envers l'ISSAT",
                    "Carte d'identité"
                ],
                delai: "2 à 4 semaines",
                bureau: "Bureau de Scolarité / Direction des Études",
                horaire: "Du lundi au vendredi : 9h00 - 15h00",
                conseil: "Les transferts sont généralement possibles uniquement entre semestres. Prévoyez au moins 1 mois."
            }
        ]
    }
];

// Messages de bienvenue et d'aide
export const welcomeMessages = [
    {
        type: "bot",
        text: "👋 Bonjour ! Je suis votre assistant virtuel ISSAT.",
        timestamp: new Date()
    },
    {
        type: "bot",
        text: "Je peux vous aider avec les procédures administratives : attestations, réclamations, demandes de stage, bourses, etc.",
        timestamp: new Date()
    },
    {
        type: "bot",
        text: "Sélectionnez une catégorie ci-dessous pour commencer :",
        timestamp: new Date()
    }
];

// Mots-clés pour la recherche rapide
export const keywords = {
    attestation: ["attestation", "certificat", "document", "inscription", "reussite", "presence"],
    reclamation: ["reclamation", "contester", "note", "examen", "probleme"],


    carte: ["carte", "etudiant", "renouvellement"],
    releve: ["releve", "notes", "bulletin"],
    transfert: ["transfert", "dossier", "mutation"]
};
