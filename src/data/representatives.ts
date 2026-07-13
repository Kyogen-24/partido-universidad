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
    bio: "Ingeniero de Sistemas con más de 30 años de experiencia en tecnología y gestión académica, Decano de la Facultad de Ingeniería de la UNC.",
    fullBio: "Ingeniero de Sistemas y Profesor Principal, con más de tres décadas liderando proyectos de tecnología, calidad académica y transformación digital en la Universidad Nacional de Cajamarca. Cuenta con certificaciones internacionales como PMP, PRINCE2, ITIL y credenciales Scrum, lo que respalda una gestión ordenada, transparente y basada en buenas prácticas.",
    proposals: [
      "Fortalecer la gobernanza institucional con sistemas integrados de planeamiento y calidad",
      "Modernizar la infraestructura tecnológica y acelerar la transformación digital",
      "Impulsar la acreditación de los programas de estudio",
    ],
  },
  {
    id: 2,
    name: "Dra. María Esther León Morales",
    shortName: "Dra. María León",
    position: "Vicerrectora Académica",
    photo: "/images/representantes/Maria_Esther_Leon_Morales.png",
    badge: "Candidata a Vicerrectora Académica",
    career: "Educación Superior",
    bio: "Académica con trayectoria en gestión de programas de educación superior, comprometida con la calidad de la enseñanza y la mejora del servicio al estudiante.",
    fullBio: "Docente universitaria con experiencia en dirección académica, gestión de programas y acompañamiento docente, enfocada en asegurar una formación pertinente y de calidad para todos los estudiantes de la UNC. Impulsa el fortalecimiento de la tutoría y consejería académica, la evaluación por competencias y la actualización constante de los planes de estudio y sílabos.",
    proposals: [
      "Fortalecer la tutoría y consejería académica para el desempeño estudiantil",
      "Impulsar la evaluación por competencias y la innovación pedagógica",
      "Actualizar permanentemente los planes de estudio y sílabos",
    ],
  },
  {
    id: 3,
    name: "Dr. Pedro Luis Ortiz Oblitas",
    shortName: "Dr. Pedro Ortiz",
    position: "Vicerrector de Investigación y RSU",
    photo: "/images/representantes/Pedro_Luis_Ortiz_Oblitas.png",
    badge: "Candidato a Vicerrector de Investigación y RSU",
    career: "Inmunología",
    bio: "Inmunólogo, Profesor Principal y Docente Investigador RENACYT, con trayectoria en investigación científica y responsabilidad social universitaria.",
    fullBio: "Especialista en Inmunología, Profesor Principal de la UNC y docente investigador RENACYT, con experiencia en proyectos científicos y trabajo interdisciplinario en salud y desarrollo. Propone reorganizar el Vicerrectorado de Investigación y RSU mediante direcciones especializadas en investigación, innovación tecnológica, emprendimiento y centros productivos.",
    proposals: [
      "Incrementar la producción científica y aprovechar fondos concursables",
      "Reorganizar el Vicerrectorado con direcciones especializadas en investigación, innovación y emprendimiento",
      "Vincular la investigación y la RSU con los desafíos prioritarios de Cajamarca",
    ],
  },
];
