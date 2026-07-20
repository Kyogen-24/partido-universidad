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
    photo: "/images/representantes/Carlos_Enrique_Aparicio_Arteaga.webp",
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
    photo: "/images/representantes/Maria_Esther_Leon_Morales.webp",
    badge: "Candidata a Vicerrectora Académica",
    career: "Educación Superior",
    bio: "Académica con trayectoria en gestión de programas de educación superior, comprometida con la calidad de la enseñanza y la mejora del servicio al estudiante.",
    fullBio: "Doctora en Administración, Magíster en Ciencias con mención en Contabilidad y Gerencia, Contadora Pública e Investigadora RENACYT Nivel VI, con más de 30 años de servicio en la Universidad Nacional de Cajamarca formando profesionales, impulsando la investigación y fortaleciendo la gestión académica. Ha ejercido importantes cargos de liderazgo, entre ellos Directora de la Escuela Profesional de Contabilidad, Coordinadora Administrativa y Académica de la Dirección de Admisión, Coordinadora del Centro de Investigación y Extensión, Secretaria Académica Sustituta e integrante de la Asamblea Universitaria y del Consejo de Facultad. Su trayectoria incluye la participación en la actualización curricular con enfoque por competencias, la asesoría y jurado de tesis de pregrado y posgrado, producción científica con publicaciones en revistas nacionales e internacionales, y experiencia en procesos de aseguramiento de la calidad y fortalecimiento institucional. Es además Vice Decana del Colegio de Contadores Públicos de Cajamarca, con experiencia en gestión financiera y administración pública.",
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
    photo: "/images/representantes/Pedro_Luis_Ortiz_Oblitas.webp",
    badge: "Candidato a Vicerrector de Investigación y RSU",
    career: "Inmunología",
    bio: "Inmunólogo, Profesor Principal y Docente Investigador RENACYT, con trayectoria en investigación científica y responsabilidad social universitaria.",
    fullBio: "Profesor Principal de Inmunología Veterinaria en la UNC, PhD por la Universidad de Liverpool. Investigador RENACYT nivel Distinguido. Director del “Centro de Investigación en Medicina Tropical: Fascioliasis” de la UNC. Su trayectoria abarca la investigación en fascioliasis humana y animal, inmunología, parasitología, diagnóstico, epidemiología y resistencia antihelmíntica, con proyectos nacionales e internacionales y trabajo en equipos multidisciplinarios. Es revisor par de revistas científicas internacionales, su producción científica incluye 50 publicaciones, con un índice h de 17 y 909 citas, indicadores que reflejan la continuidad, visibilidad e impacto de sus aportes científicos. Esta trayectoria sustenta una propuesta orientada a fortalecer la investigación, la innovación tecnológica, el emprendimiento y la responsabilidad social universitaria como funciones estratégicas para el desarrollo de la UNC y de la región Cajamarca.",
    proposals: [
      "Reorganizar el Vicerrectorado mediante direcciones especializadas en investigación, innovación tecnológica, emprendimiento y centros productivos",
      "Implementar un Sistema Integrado de Gestión de la Investigación que facilite la planificación, el seguimiento y la evaluación de la actividad científica",
      "Incrementar la producción científica de la UNC y fortalecer la participación de docentes e investigadores en fondos concursables",
      "Vincular la investigación y la responsabilidad social universitaria con los problemas y desafíos prioritarios de Cajamarca",
    ],
  },
];
