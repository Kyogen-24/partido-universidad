export type RepresentativeLinkType =
  | "linkedin"
  | "orcid"
  | "scopus"
  | "ctivitae"
  | "renacyt"
  | "website";

export interface RepresentativeLink {
  type: RepresentativeLinkType;
  label: string;
  url: string;
}

export interface Representative {
  id: number;
  name: string;
  shortName: string;
  position: string;
  photo: string;
  badge: string;
  career: string;
  bio: string;
  fullBio: string;
  proposals: string[];
  links: RepresentativeLink[];
}

export const representatives: Representative[] = [
  {
    id: 1,
    name: "Dr. Carlos Enrique Aparicio Arteaga",
    shortName: "Dr. Carlos Aparicio",
    position: "Rector",
    photo: "/images/representantes/Carlos_Enrique_Aparicio_Arteaga.png",
    badge: "Candidato a Rector",
    career: "Ingeniería de Sistemas",
    bio: "Decano de la Facultad de Ingeniería y Google Certified Trainer con más de 30 años de trayectoria en tecnología, gestión académica y transformación digital.",
    fullBio: "Con más de tres décadas de trayectoria en la Universidad Nacional de Cajamarca, ha ocupado cargos como Decano de la Facultad de Ingeniería, Director de Escuela y de Sistemas Informáticos, e integrante de la Asamblea Universitaria en todas las categorías docentes. Cuenta con certificaciones internacionales PMP®, CSM®, CSD®, A-CSD® e ITIL®, además de especialización en Data Science (URP) y Gerencia de TI (ESAN). Es Evaluador de ICACIT y Externo de SINEACE, y fue reconocido por UNESCO IESALC por su liderazgo en innovación pedagógica. Ha sido designado en dos periodos como integrante del Tribunal Departamental de Ética del CIP-CDC.",
    proposals: [
      "Fortalecer la gobernanza institucional con sistemas integrados de planeamiento y calidad",
      "Modernizar la infraestructura tecnológica y acelerar la transformación digital",
      "Impulsar la acreditación de los programas de estudio",
    ],
    links: [
      {
        type: "linkedin",
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/caparicioa/",
      },
      {
        type: "orcid",
        label: "ORCID",
        url: "https://orcid.org/0000-0001-7007-808X",
      },
      {
        type: "ctivitae",
        label: "CTI Vitae",
        url: "https://ctivitae.concytec.gob.pe/appDirectorioCTI/VerDatosInvestigador.do?id_investigador=22124",
      },
    ],
  },
  {
    id: 2,
    name: "Dra. María Esther León Morales",
    shortName: "Dra. María León",
    position: "Vicerrectora Académica",
    photo: "/images/representantes/Maria_Esther_Leon_Morales.png",
    badge: "Candidata a Vicerrectora Académica",
    career: "Contabilidad y Gestión",
    bio: "Investigadora RENACYT Nivel VI con más de 30 años de trayectoria académica y profesional en gestión universitaria.",
    fullBio: "Investigadora RENACYT Nivel VI (Código P0067249), con más de 30 años de experiencia. Con especialización en Comercio Exterior, en la UNC ha desempeñado cargos como Directora de la Escuela Profesional de Contabilidad (sede Cajamarca y Filial Chota), Coordinadora del Centro de Investigación y Extensión y Secretaria Académica Sustituta de la Facultad de Ciencias Económicas. Fue Vice Decana del Colegio de Contadores Públicos de Cajamarca (2020–2021) y representó a la universidad ante el CERX Cajamarca.",
    proposals: [
      "Fortalecer la tutoría y consejería académica para el desempeño estudiantil",
      "Impulsar la evaluación por competencias y la innovación pedagógica",
      "Actualizar permanentemente los planes de estudio y sílabos",
    ],
    links: [
      {
        type: "scopus",
        label: "Scopus",
        url: "https://www.scopus.com/authid/detail.uri?authorId=58287101200",
      },
      {
        type: "orcid",
        label: "ORCID",
        url: "https://orcid.org/0000-0002-0670-1284",
      },
      {
        type: "ctivitae",
        label: "CTI Vitae",
        url: "https://ctivitae.concytec.gob.pe/appDirectorioCTI/VerDatosInvestigador.do?id_investigador=67249",
      },
      {
        type: "renacyt",
        label: "RENACYT",
        url: "https://servicio-renacyt.concytec.gob.pe/ficha-renacyt/?idInvestigador=67249",
      },
    ],
  },
  {
    id: 3,
    name: "Dr. Pedro Luis Ortiz Oblitas",
    shortName: "Dr. Pedro Ortiz",
    position: "Vicerrector de Investigación y RSU",
    photo: "/images/representantes/Pedro_Luis_Ortiz_Oblitas.png",
    badge: "Candidato a Vicerrector de Investigación y RSU",
    career: "Medicina Veterinaria",
    bio: "PhD por la Universidad de Liverpool e Investigador RENACYT Nivel Distinguido con más de 50 artículos publicados y reconocimiento del Congreso de la República.",
    fullBio: "Profesor Principal de Inmunología Veterinaria y director del Centro de Investigación en Medicina Tropical: Fascioliasis. Investigador RENACYT Nivel Distinguido (P0000489), con más de 50 artículos científicos publicados en revistas indexadas, 889 citaciones y un índice h de 17 en Scopus. Recibió el Premio ELSEVIER Región Nor Oriente del Perú (2019) y fue condecorado por el Congreso de la República (2023) y el Colegio Médico Veterinario del Perú (2024). Es revisor par de revistas internacionales como Parasitology Research, Veterinary Parasitology y Parasites & Vectors.",
    proposals: [
      "Incrementar la producción científica y aprovechar fondos concursables",
      "Reorganizar el Vicerrectorado con direcciones especializadas en investigación, innovación y emprendimiento",
      "Vincular la investigación y la RSU con los desafíos prioritarios de Cajamarca",
    ],
    links: [
      {
        type: "scopus",
        label: "Scopus",
        url: "https://www.scopus.com/authid/detail.uri?authorId=7102416527",
      },
      {
        type: "ctivitae",
        label: "CTI Vitae",
        url: "https://ctivitae.concytec.gob.pe/appDirectorioCTI/VerDatosInvestigador.do?id_investigador=489",
      },
      {
        type: "renacyt",
        label: "RENACYT",
        url: "https://servicio-renacyt.concytec.gob.pe/ficha-renacyt/?idInvestigador=489",
      },
    ],
  },
];
