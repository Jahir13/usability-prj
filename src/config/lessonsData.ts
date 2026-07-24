import type { LessonTopic, Exercise } from "../types";

export const LESSONS_DATABASE: Record<string, LessonTopic[]> = {
  "verb-to-be": [
    {
      id: "introduction",
      label: "Introduction",
      state: "done",
      marker: "✓",
      levelText: "LEVEL 1",
      title: "Introduction to English Verbs",
      description: "Learn the foundational concepts of English verbs. Verbs are action or state words that describe what subjects are doing or experiencing.",
      objectives: [
        "Understand what a verb is in a sentence",
        "Identify simple actions vs. states of being",
        "Connect subjects and verbs in simple sentences",
      ],
      formulaLabel: "Subject + Verb (+ complement)",
      formula: "am/is/are/walk/talk/run...",
      examples: [
        { source: "I study English.", translation: "Yo estudio inglés." },
        { source: "They talk on the phone.", translation: "Ellos hablan por teléfono." },
        { source: "She runs in the park.", translation: "Ella corre en el parque." },
      ],
    },
    {
      id: "verb-forms",
      label: "Verb Forms",
      state: "done",
      marker: "✓",
      levelText: "LEVEL 2",
      title: "English Verb Forms",
      description: "Verbs have different forms depending on tense, person, and number. We'll look at base forms and singular/plural agreements.",
      objectives: [
        "Identify base forms of regular verbs",
        "Understand singular vs. plural agreement rules",
        "Learn regular vs. irregular verb categories",
      ],
      formulaLabel: "Verb + -s/-es (for 3rd person singular in present)",
      formula: "walk → walks · watch → watches",
      examples: [
        { source: "He walks to school.", translation: "Él camina a la escuela." },
        { source: "They walk to school.", translation: "Ellos caminan a la escuela." },
        { source: "The clock works fine.", translation: "El reloj funciona bien." },
      ],
    },
    {
      id: "verb-to-be",
      label: "Verb To Be",
      state: "active",
      marker: "3",
      levelText: "LEVEL 4",
      title: "Verb To Be",
      description: "The verb “to be” is one of the most important verbs in English. You'll use it all the time to describe states, identities, and conditions.",
      objectives: [
        "Use of the verb “to be” in the present tense",
        "Affirmative, negative, and interrogative sentences",
        "Contractions and colloquial forms",
      ],
      formulaLabel: "Subject + am/is/are + complement",
      formula: "am → I · is → he, she, it · are → you, we, they",
      examples: [
        { source: "I am a student.", translation: "Yo soy estudiante." },
        { source: "She is not tired.", translation: "Ella no está cansada." },
        { source: "Are you ready?", translation: "¿Estás listo?" },
      ],
    },
    {
      id: "negative-sentences",
      label: "Negative sentences",
      state: "blocked",
      marker: "4",
      levelText: "LEVEL 4 (NEG)",
      title: "Negative Sentences",
      description: "Learn how to negate statements using 'not'. We'll focus on forming negative statements with the Verb To Be.",
      objectives: [
        "Form negative sentences correctly",
        "Understand the position of the negative particle 'not'",
        "Identify negative contractions in daily speech",
      ],
      formulaLabel: "Subject + am/is/are + NOT + complement",
      formula: "am not · is not (isn't) · are not (aren't)",
      examples: [
        { source: "We are not tired.", translation: "Nosotros no estamos cansados." },
        { source: "He is not my teacher.", translation: "Él no es mi profesor." },
        { source: "They are not at school today.", translation: "Ellos no están en la escuela hoy." },
      ],
    },
    {
      id: "questions",
      label: "Questions",
      state: "blocked",
      marker: "5",
      levelText: "LEVEL 5",
      title: "Interrogative Sentences",
      description: "Learn how to ask questions with the Verb To Be. In English, we invert the subject and the verb to form questions.",
      objectives: [
        "Form yes/no questions correctly",
        "Understand subject-verb inversion patterns",
        "Provide short affirmative and negative answers",
      ],
      formulaLabel: "Am/Is/Are + Subject + complement + ?",
      formula: "Are you...? · Is she...? · Am I...?",
      examples: [
        { source: "Are they friendly?", translation: "¿Son ellos amigables?" },
        { source: "Is it cold outside?", translation: "¿Hace frío afuera?" },
        { source: "Am I late?", translation: "¿Llego tarde?" },
      ],
    },
    {
      id: "contractions",
      label: "Contractions",
      state: "blocked",
      marker: "6",
      levelText: "LEVEL 6",
      title: "Verb Contractions",
      description: "Native speakers use contractions to speak faster. Learn how to combine subjects and Verb To Be forms into single words.",
      objectives: [
        "Form affirmative contractions (I'm, she's, they're)",
        "Form negative contractions (isn't, aren't)",
        "Recognize fast conversational present tense speech patterns",
      ],
      formulaLabel: "Pronoun + 'm / 's / 're",
      formula: "I'm · he's · she's · it's · you're · we're · they're",
      examples: [
        { source: "We're going home.", translation: "Nosotros vamos a casa." },
        { source: "She isn't here yet.", translation: "Ella no está aquí todavía." },
        { source: "They're very smart.", translation: "Ellos son muy inteligentes." },
      ],
    },
  ],
};

export const EXERCISES_DATABASE: Record<string, Exercise[]> = {
  "verb-to-be": [
    {
      id: "vtb-ex1",
      type: "choice",
      instruction: "Choose the correct verb form:",
      prompt: "He _____ a very talented doctor at the local clinic.",
      options: ["am", "is", "are"],
      correctAnswer: "is",
      translation: "Él es un médico muy talentoso en la clínica local.",
    },
    {
      id: "vtb-ex2",
      type: "input",
      instruction: "Complete the sentence with the correct form of Verb To Be:",
      prompt: "We _____ excited about starting our new English lessons today.",
      correctAnswer: "are",
      translation: "Nosotros estamos emocionados por empezar nuestras nuevas lecciones de inglés hoy.",
    },
    {
      id: "vtb-ex3",
      type: "reorder",
      instruction: "Arrange the words to form a correct negative sentence:",
      prompt: "at home / she / not / is",
      options: ["she", "is", "not", "at home"],
      correctAnswer: "she is not at home",
      translation: "Ella no está en casa.",
    },
    {
      id: "vtb-ex4",
      type: "speaking",
      instruction: "Click the mic, read the sentence aloud, and practice your pronunciation:",
      prompt: "I am learning English every single day.",
      correctAnswer: "i am learning english every single day",
      translation: "Yo estoy aprendiendo inglés todos los días.",
    },
    {
      id: "vtb-ex5",
      type: "listening",
      instruction: "Click the speaker to listen and write exactly what you hear:",
      prompt: "They are ready for the final exam.",
      correctAnswer: "they are ready for the final exam",
      audioText: "They are ready for the final exam.",
      translation: "Ellos están listos para el examen final.",
    },
  ],
};

// Fallback mappings to populate all other level IDs and prevent "Level data not found" crashes
const allLevelIds = [
  "basic-greetings", "simple-present", "pronouns", "verb-to-be", "basic-questions", "present-continuous", "simple-past",
  "speaking-l1", "speaking-l2", "speaking-l3", "speaking-l4",
  "listening-l1", "listening-l2", "listening-l3", "listening-l4",
  "writing-l1", "writing-l2", "writing-l3", "writing-l4"
];

for (const id of allLevelIds) {
  if (!LESSONS_DATABASE[id]) {
    LESSONS_DATABASE[id] = LESSONS_DATABASE["verb-to-be"];
  }
  if (!EXERCISES_DATABASE[id]) {
    EXERCISES_DATABASE[id] = EXERCISES_DATABASE["verb-to-be"];
  }
}

