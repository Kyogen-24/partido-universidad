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
  slug: string;
  name: string;
  shortName: string;
  position: string;
  photo: string;
  badge: string;
  career: string;
  faculty?: string;
  focus?: string;
  tagline?: string;
  bio: string;
  fullBio: string;
  proposals: string[];
  links: RepresentativeLink[];
}

export const representatives: Representative[] = [
  {
    id: 1,
    slug: "dr-carlos-aparicio",
    name: "Dr. Carlos Enrique Aparicio Arteaga",
    shortName: "Dr. Carlos Aparicio",
    position: "Rector",
    photo: "/images/representantes/Carlos_Enrique_Aparicio_Arteaga.webp",
    badge: "Rector",
    career: "Ingeniería de Sistemas",
    faculty: "Facultad de Ingeniería",
    focus: "Gestión universitaria",
    tagline: "Más de 30 años en tecnología y gestión académica.\nExdecano de la Facultad de Ingeniería.",
    bio: "Doctor en Ingeniería de Sistemas, con más de 30 años de experiencia en tecnología, gestión académica y educación superior. Exdecano de la Facultad de Ingeniería de la UNC.",
    fullBio: "Profesional y académico con más de 30 años de experiencia en Ingeniería de Sistemas, Tecnologías de la Información y Educación Superior. Es Doctor en Ingeniería de Sistemas, Maestro en Ciencias de la Educación Superior e Ingeniero de Computación y Sistemas. Cuenta con especializaciones en Gestión Pública, Gerencia Empresarial con Tecnologías de la Información y Data Science. Su compromiso con la calidad educativa se refleja en su labor como Evaluador Internacional de ICACIT y Evaluador Externo de SINEACE con fines de acreditación. Cuenta con la certificación PMP® en gestión de proyectos, certificaciones ágiles (CSM®, CSPO®, CSD® y A-CSD®), ITIL® para gestión de servicios de TI y es Google for Education Certified Trainer, consolidándose como un referente en innovación educativa. En la Universidad Nacional de Cajamarca ha ejercido un liderazgo destacado como Decano de la Facultad de Ingeniería, director de la Escuela Profesional de Ingeniería de Sistemas, director del Departamento Académico de Sistemas, Estadística e Informática y director de la Oficina General de Sistemas Informáticos. Asimismo, ha integrado la Asamblea Universitaria y el Consejo de Facultad, impulsando la transformación digital, la modernización institucional y la mejora de la gestión académica y administrativa. Ha integrado en dos oportunidades el Comité de Ética del Colegio de Ingenieros del Perú y ha recibido reconocimientos de dicha institución por su ética y contribución al desarrollo de la ingeniería peruana, así como del IEEE Education Society Perú Chapter por su destacada contribución académica y compromiso con la educación en ingeniería.",
    proposals: [
"Modernización y simplificación de los procesos académicos y administrativos.",
"Digitalización integral de los trámites universitarios.",
"Descentralización de los servicios académicos y administrativos en las filiales.",
"Implementación de pagos en plataformas digitales para tasas y derechos universitarios.",
"Emisión del certificado de estudios 100 % digital, seguro y verificable.",
"Gestión de mayores recursos para el equipamiento de laboratorios e infraestructura universitaria.",
"Gestión para el financiamiento de proyectos estratégicos y el pago de la deuda social por homologación.",
"Impulso a concursos públicos transparentes para el nombramiento y contratación de docentes.",
"Fortalecimiento de la carrera docente mediante el apoyo a los procesos de ratificación, promoción y ascenso"
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
    slug: "maria-leon",
    name: "Dra. María Esther León Morales",
    shortName: "Dra. María León",
    position: "Vicerrectora Académica",
    photo: "/images/representantes/Maria_Esther_Leon_Morales.webp",
    badge: "Vicerrectora Académica",
    career: "Educación Superior",
    faculty: "Facultad de Ciencias Económicas",
    focus: "Calidad académica",
    tagline: "Doctora en Administración e Investigadora RENACYT.\nEx vice decana del Colegio de Contadores.",
    bio: "Académica con trayectoria en gestión de programas de educación superior, comprometida con la calidad de la enseñanza y la mejora del servicio al estudiante.",
    fullBio: "Doctora en Administración por la Universidad Nacional Federico Villarreal, Magíster en Ciencias con mención en Contabilidad y Gerencia por la Universidad Nacional de Cajamarca y Contadora Pública con más de 30 años de trayectoria académica y profesional en el ámbito de la contabilidad, gestión universitaria e investigación. Investigadora RENACYT Nivel VI (Código P0067249), con especialización en Comercio Exterior y destacada formación académica, habiendo obtenido el segundo puesto en sus estudios de pregrado. En la Universidad Nacional de Cajamarca ha desempeñado importantes cargos de gestión académica, entre ellos Directora de la Escuela Profesional de Contabilidad de la sede Cajamarca y Filial Chota, Coordinadora del Centro de Investigación y Extensión y Secretaria Académica Sustituta de la Facultad de Ciencias Económicas, Contables y Administrativas. Asimismo, fue miembro de la Asamblea Universitaria y del Consejo de Facultad. Cuenta además con experiencia en el sector financiero como Jefe de Captación de Recursos en el Banco Industrial del Perú y ha representado a la universidad ante el Comité Ejecutivo Regional de Exportaciones – CERX Cajamarca. En el ámbito gremial, se desempeñó como Vice Decana del Colegio de Contadores Públicos de Cajamarca durante el período 2020–2021 y como Directora Tesorera en el período 2004–2005.",
    proposals: [
      "Fortalecer la calidad académica, mediante la actualización permanente de los planes de estudio, el aseguramiento de la calidad y la acreditación de los programas.",
      "Modernizar la enseñanza universitaria, incorporando metodologías activas, transformación digital e inteligencia artificial como apoyo al aprendizaje y a la gestión académica.",
      "Impulsar el desarrollo integral del estudiante, fortaleciendo la tutoría académica, los sistemas de alerta temprana, la inclusión y el bienestar universitario para favorecer la permanencia y la titulación oportuna.",
      "Fortalecer el desarrollo docente y la internacionalización, promoviendo la capacitación permanente, la innovación educativa, la movilidad académica y la vinculación con el entorno para una formación profesional de excelencia.",
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
    slug: "pedro-ortiz",
    name: "Dr. Pedro Luis Ortiz Oblitas",
    shortName: "Dr. Pedro Ortiz",
    position: "Vicerrector de Investigación y RSU",
    photo: "/images/representantes/Pedro_Luis_Ortiz_Oblitas.webp",
    badge: "Vicerrector de Investigación y RSU",
    career: "Inmunología",
    faculty: "Facultad de Medicina",
    focus: "Innovación e investigación",
    tagline: "PhD por la Universidad de Liverpool.\nInvestigador RENACYT nivel Distinguido.",
    bio: "Inmunólogo, Profesor Principal y Docente Investigador RENACYT, con trayectoria en investigación científica y responsabilidad social universitaria.",
    fullBio: "Profesor Principal de Inmunología Veterinaria en la UNC, PhD por la Universidad de Liverpool. Investigador RENACYT nivel Distinguido. Director del “Centro de Investigación en Medicina Tropical: Fascioliasis” de la UNC. Su trayectoria abarca la investigación en fascioliasis humana y animal, inmunología, parasitología, diagnóstico, epidemiología y resistencia antihelmíntica, con proyectos nacionales e internacionales y trabajo en equipos multidisciplinarios. Es revisor par de revistas científicas internacionales, su producción científica incluye 50 publicaciones, con un índice h de 17 y 909 citas, indicadores que reflejan la continuidad, visibilidad e impacto de sus aportes científicos. Esta trayectoria sustenta una propuesta orientada a fortalecer la investigación, la innovación tecnológica, el emprendimiento y la responsabilidad social universitaria como funciones estratégicas para el desarrollo de la UNC y de la región Cajamarca.",
    proposals: [
      "Reorganizar el Vicerrectorado mediante direcciones especializadas en investigación, innovación tecnológica, emprendimiento y centros productivos.",
      "Implementar un Sistema Integrado de Gestión de la Investigación que facilite la planificación, el seguimiento y la evaluación de la actividad científica.",
      "Incrementar la producción científica de la UNC y fortalecer la participación de docentes e investigadores en fondos concursables.",
      "Vincular la investigación y la responsabilidad social universitaria con los problemas y desafíos prioritarios de Cajamarca."
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
        type: "orcid",
        label: "ORCID",
        url: " https://orcid.org/0000-0001-8846-777X",
      },
      {
        type: "renacyt",
        label: "RENACYT",
        url: "https://servicio-renacyt.concytec.gob.pe/ficha-renacyt/?idInvestigador=489",
      },
    ],
  },
];