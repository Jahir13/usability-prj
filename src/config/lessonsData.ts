import type { ActiveSkill, Exercise, LessonTopic } from "../types";

type LevelContent = {
  lessonTopics: LessonTopic[];
  exercises: Exercise[];
};

export type ContentDatabase = Record<ActiveSkill, Record<string, LevelContent>>;

export const CONTENT_DATABASE: ContentDatabase = {
  grammar: {
    "basic-greetings": {
      lessonTopics: [
        {
          id: "basic-greetings",
          label: "Main Rule",
          state: "active",
          marker: "1",
          levelText: "LEVEL 1",
          title: "Greetings and Introductions",
          description: "Use common greetings, introduce yourself, and respond with short personal phrases.",
          objectives: [
            "Recognize basic greetings",
            "Introduce yourself",
            "Ask and answer names",
          ],
          formulaLabel: "Greeting + Name",
          formula: "Hello / Hi + I'm + name",
          examples: [
            { source: "Hello, I'm Ana.", translation: "Hola, soy Ana." },
            { source: "Hi, my name is Luis.", translation: "Hola, mi nombre es Luis." },
          ],
        },
      ],
      exercises: [
        {
          id: "basic-greetings-ex1",
          type: "choice",
          instruction: "Choose the correct greeting:",
          prompt: "_____ , my name is Sara.",
          options: ["Hello", "Run", "Blue"],
          correctAnswer: "Hello",
          translation: "Hola, mi nombre es Sara.",
        },
        {
          id: "basic-greetings-ex2",
          type: "input",
          instruction: "Complete the introduction:",
          prompt: "Hi, I am _____.",
          correctAnswer: "ana",
          translation: "Hola, soy Ana.",
        },
      ],
    },
    "simple-present": {
      lessonTopics: [
        {
          id: "simple-present",
          label: "Main Rule",
          state: "active",
          marker: "2",
          levelText: "LEVEL 2",
          title: "Simple Present",
          description: "Talk about routines, habits, and general facts.",
          objectives: [
            "Use simple present in daily routines",
            "Recognize third person singular",
            "Build short affirmative sentences",
          ],
          formulaLabel: "Subject + verb",
          formula: "I play / She plays",
          examples: [
            { source: "She studies every day.", translation: "Ella estudia todos los días." },
            { source: "They work on Mondays.", translation: "Ellos trabajan los lunes." },
          ],
        },
      ],
      exercises: [
        {
          id: "simple-present-ex1",
          type: "input",
          instruction: "Complete the sentence:",
          prompt: "She _____ English every morning.",
          correctAnswer: "studies",
          translation: "Ella estudia inglés cada mañana.",
        },
        {
          id: "simple-present-ex2",
          type: "choice",
          instruction: "Choose the correct verb:",
          prompt: "They _____ at school every day.",
          options: ["works", "work", "working"],
          correctAnswer: "work",
          translation: "Ellos trabajan en la escuela todos los días.",
        },
      ],
    },
    "pronouns": {
      lessonTopics: [
        {
          id: "pronouns",
          label: "Main Rule",
          state: "active",
          marker: "3",
          levelText: "LEVEL 3",
          title: "Personal Pronouns",
          description: "Replace repeated nouns with the correct pronoun.",
          objectives: [
            "Identify subject pronouns",
            "Match people with pronouns",
            "Use pronouns in short sentences",
          ],
          formulaLabel: "Noun -> Pronoun",
          formula: "Ana -> she / Carlos -> he",
          examples: [
            { source: "Ana is a doctor. She is kind.", translation: "Ana es doctora. Ella es amable." },
            { source: "Carlos is late. He is running.", translation: "Carlos llega tarde. Él está corriendo." },
          ],
        },
      ],
      exercises: [
        {
          id: "pronouns-ex1",
          type: "choice",
          instruction: "Choose the correct pronoun:",
          prompt: "Carlos is tired. _____ needs a break.",
          options: ["He", "She", "It"],
          correctAnswer: "He",
          translation: "Carlos está cansado. Él necesita un descanso.",
        },
        {
          id: "pronouns-ex2",
          type: "reorder",
          instruction: "Arrange the sentence:",
          prompt: "she / is / my teacher",
          options: ["she", "is", "my teacher"],
          correctAnswer: "she is my teacher",
          translation: "Ella es mi profesora.",
        },
      ],
    },
    "verb-to-be": {
      lessonTopics: [
        {
          id: "verb-to-be",
          label: "Main Rule",
          state: "active",
          marker: "4",
          levelText: "LEVEL 4",
          title: "Verb To Be",
          description: "Describe identity, state, and condition using am, is, and are.",
          objectives: [
            "Use am / is / are",
            "Form affirmative sentences",
            "Recognize short descriptions",
          ],
          formulaLabel: "Subject + am/is/are + complement",
          formula: "I am / She is / They are",
          examples: [
            { source: "I am a student.", translation: "Yo soy estudiante." },
            { source: "She is happy.", translation: "Ella está feliz." },
            { source: "They are at school.", translation: "Ellos están en la escuela." },
          ],
        },
      ],
      exercises: [
        {
          id: "verb-to-be-ex1",
          type: "choice",
          instruction: "Choose the correct form:",
          prompt: "She _____ a teacher.",
          options: ["am", "is", "are"],
          correctAnswer: "is",
          translation: "Ella es profesora.",
        },
        {
          id: "verb-to-be-ex2",
          type: "input",
          instruction: "Complete the sentence:",
          prompt: "We _____ ready.",
          correctAnswer: "are",
          translation: "Estamos listos.",
        },
        {
          id: "verb-to-be-ex3",
          type: "reorder",
          instruction: "Arrange the words:",
          prompt: "student / I / am",
          options: ["student", "I", "am"],
          correctAnswer: "i am student",
          translation: "Soy estudiante.",
        },
      ],
    },
    "basic-questions": {
      lessonTopics: [
        {
          id: "basic-questions",
          label: "Main Rule",
          state: "active",
          marker: "5",
          levelText: "LEVEL 5",
          title: "Yes/No Questions",
          description: "Ask and answer basic yes/no questions with be verbs.",
          objectives: [
            "Invert verb and subject",
            "Ask short questions",
            "Answer with yes or no",
          ],
          formulaLabel: "Am/Is/Are + subject + ... ?",
          formula: "Are you ready?",
          examples: [
            { source: "Are you ready?", translation: "¿Estás listo?" },
            { source: "Is she at home?", translation: "¿Ella está en casa?" },
          ],
        },
      ],
      exercises: [
        {
          id: "basic-questions-ex1",
          type: "reorder",
          instruction: "Arrange the question:",
          prompt: "you / are / ready",
          options: ["you", "are", "ready"],
          correctAnswer: "are you ready",
          translation: "¿Estás listo?",
        },
        {
          id: "basic-questions-ex2",
          type: "choice",
          instruction: "Choose the correct question start:",
          prompt: "_____ she your friend?",
          options: ["Is", "Are", "Do"],
          correctAnswer: "Is",
          translation: "¿Ella es tu amiga?",
        },
      ],
    },
    "present-continuous": {
      lessonTopics: [
        {
          id: "present-continuous",
          label: "Main Rule",
          state: "active",
          marker: "6",
          levelText: "LEVEL 6",
          title: "Present Continuous",
          description: "Describe actions happening now.",
          objectives: [
            "Use am/is/are + verb-ing",
            "Describe current actions",
            "Form affirmative statements",
          ],
          formulaLabel: "Subject + am/is/are + verb-ing",
          formula: "She is reading",
          examples: [
            { source: "They are studying now.", translation: "Ellos están estudiando ahora." },
            { source: "I am cooking dinner.", translation: "Estoy cocinando la cena." },
          ],
        },
      ],
      exercises: [
        {
          id: "present-continuous-ex1",
          type: "input",
          instruction: "Complete the sentence:",
          prompt: "We _____ reading a book.",
          correctAnswer: "are",
          translation: "Estamos leyendo un libro.",
        },
        {
          id: "present-continuous-ex2",
          type: "choice",
          instruction: "Choose the correct verb form:",
          prompt: "She _____ to music now.",
          options: ["listens", "is listening", "listen"],
          correctAnswer: "is listening",
          translation: "Ella está escuchando música ahora.",
        },
      ],
    },
    "simple-past": {
      lessonTopics: [
        {
          id: "simple-past",
          label: "Main Rule",
          state: "active",
          marker: "7",
          levelText: "LEVEL 7",
          title: "Simple Past",
          description: "Talk about completed actions in the past.",
          objectives: [
            "Use past tense verbs",
            "Recognize finished actions",
            "Build short past statements",
          ],
          formulaLabel: "Subject + past verb",
          formula: "She walked / They played",
          examples: [
            { source: "I visited my grandma.", translation: "Visité a mi abuela." },
            { source: "They played football yesterday.", translation: "Ellos jugaron fútbol ayer." },
          ],
        },
      ],
      exercises: [
        {
          id: "simple-past-ex1",
          type: "choice",
          instruction: "Choose the correct past form:",
          prompt: "Yesterday, I _____ to school.",
          options: ["go", "went", "going"],
          correctAnswer: "went",
          translation: "Ayer fui a la escuela.",
        },
        {
          id: "simple-past-ex2",
          type: "input",
          instruction: "Complete the sentence:",
          prompt: "She _____ a movie last night.",
          correctAnswer: "watched",
          translation: "Ella vio una película anoche.",
        },
      ],
    },
  },

  speaking: {
    "speaking-l1": {
      lessonTopics: [
        {
          id: "speaking-l1",
          label: "Main Rule",
          state: "active",
          marker: "1",
          levelText: "LEVEL 1",
          title: "Introduce Yourself",
          description: "Practice short self-introductions.",
          objectives: ["Say your name", "Say where you are from", "Use polite opening phrases"],
          formulaLabel: "Hello + I'm + name",
          formula: "Hello, I'm ...",
          examples: [{ source: "Hello, I'm Maria.", translation: "Hola, soy Maria." }],
        },
      ],
      exercises: [
        {
          id: "speaking-l1-ex1",
          type: "speaking",
          instruction: "Say the sentence aloud:",
          prompt: "Hello, I'm Maria.",
          correctAnswer: "hello i'm maria",
          translation: "Hola, soy Maria.",
        },
      ],
    },
    "speaking-l2": {
      lessonTopics: [
        {
          id: "speaking-l2",
          label: "Main Rule",
          state: "active",
          marker: "2",
          levelText: "LEVEL 2",
          title: "Talking About Hobbies",
          description: "Describe activities you like.",
          objectives: ["Use like / love", "Mention hobbies", "Build short spoken answers"],
          formulaLabel: "I like + activity",
          formula: "I like reading",
          examples: [{ source: "I like playing football.", translation: "Me gusta jugar fútbol." }],
        },
      ],
      exercises: [
        {
          id: "speaking-l2-ex1",
          type: "speaking",
          instruction: "Read the sentence aloud:",
          prompt: "I like listening to music.",
          correctAnswer: "i like listening to music",
          translation: "Me gusta escuchar música.",
        },
      ],
    },
    "speaking-l3": {
      lessonTopics: [
        {
          id: "speaking-l3",
          label: "Main Rule",
          state: "active",
          marker: "3",
          levelText: "LEVEL 3",
          title: "Small Talk",
          description: "Practice everyday conversation.",
          objectives: ["Ask simple questions", "Respond politely", "Keep a short conversation"],
          formulaLabel: "Question + short answer",
          formula: "How are you? / I'm fine.",
          examples: [{ source: "How are you?", translation: "¿Cómo estás?" }],
        },
      ],
      exercises: [
        {
          id: "speaking-l3-ex1",
          type: "speaking",
          instruction: "Say this answer:",
          prompt: "I'm fine, thanks.",
          correctAnswer: "i'm fine thanks",
          translation: "Estoy bien, gracias.",
        },
      ],
    },
    "speaking-l4": {
      lessonTopics: [
        {
          id: "speaking-l4",
          label: "Main Rule",
          state: "active",
          marker: "4",
          levelText: "LEVEL 4",
          title: "Ordering Food",
          description: "Practice simple restaurant phrases.",
          objectives: ["Order food", "Ask for items", "Use polite requests"],
          formulaLabel: "I'd like + item",
          formula: "I'd like a sandwich",
          examples: [{ source: "I'd like a coffee, please.", translation: "Quisiera un café, por favor." }],
        },
      ],
      exercises: [
        {
          id: "speaking-l4-ex1",
          type: "speaking",
          instruction: "Say the request:",
          prompt: "I'd like a sandwich, please.",
          correctAnswer: "i'd like a sandwich please",
          translation: "Quisiera un sándwich, por favor.",
        },
      ],
    },
  },

  listening: {
    "listening-l1": {
      lessonTopics: [
        {
          id: "listening-l1",
          label: "Main Rule",
          state: "active",
          marker: "1",
          levelText: "LEVEL 1",
          title: "Numbers and Dates",
          description: "Listen for numbers, dates, and simple factual details.",
          objectives: ["Recognize numbers", "Identify dates", "Catch short audio details"],
          formulaLabel: "Audio -> number/date",
          formula: "one, two, three...",
          examples: [{ source: "It is April 5th.", translation: "Es 5 de abril." }],
        },
      ],
      exercises: [
        {
          id: "listening-l1-ex1",
          type: "listening",
          instruction: "Listen and write what you hear:",
          prompt: "Today is July 25th.",
          audioText: "Today is July 25th.",
          correctAnswer: "today is july 25th",
          translation: "Hoy es 25 de julio.",
        },
      ],
    },
    "listening-l2": {
      lessonTopics: [
        {
          id: "listening-l2",
          label: "Main Rule",
          state: "active",
          marker: "2",
          levelText: "LEVEL 2",
          title: "Asking for Directions",
          description: "Understand short direction instructions.",
          objectives: ["Recognize movement verbs", "Identify places", "Follow short instructions"],
          formulaLabel: "Turn + go + location",
          formula: "Turn left / go straight",
          examples: [{ source: "Turn left at the corner.", translation: "Gira a la izquierda en la esquina." }],
        },
      ],
      exercises: [
        {
          id: "listening-l2-ex1",
          type: "listening",
          instruction: "Listen and type the sentence:",
          prompt: "Go straight and turn right.",
          audioText: "Go straight and turn right.",
          correctAnswer: "go straight and turn right",
          translation: "Ve recto y gira a la derecha.",
        },
      ],
    },
    "listening-l3": {
      lessonTopics: [
        {
          id: "listening-l3",
          label: "Main Rule",
          state: "active",
          marker: "3",
          levelText: "LEVEL 3",
          title: "Movie Dialogues",
          description: "Understand simple short dialogues.",
          objectives: ["Identify speakers", "Catch key words", "Understand context"],
          formulaLabel: "Short dialogue",
          formula: "A: ... B: ...",
          examples: [{ source: "Are you coming? Yes, in a minute.", translation: "¿Vas a venir? Sí, en un minuto." }],
        },
      ],
      exercises: [
        {
          id: "listening-l3-ex1",
          type: "listening",
          instruction: "Listen and write the dialogue:",
          prompt: "Are you ready? Yes, I am.",
          audioText: "Are you ready? Yes, I am.",
          correctAnswer: "are you ready yes i am",
          translation: "¿Estás listo? Sí, lo estoy.",
        },
      ],
    },
    "listening-l4": {
      lessonTopics: [
        {
          id: "listening-l4",
          label: "Main Rule",
          state: "active",
          marker: "4",
          levelText: "LEVEL 4",
          title: "News Broadcasts",
          description: "Listen for key facts in short news items.",
          objectives: ["Identify main idea", "Recognize names and places", "Catch key facts"],
          formulaLabel: "Fact-based listening",
          formula: "Who / what / when / where",
          examples: [{ source: "The train arrives at 8.", translation: "El tren llega a las 8." }],
        },
      ],
      exercises: [
        {
          id: "listening-l4-ex1",
          type: "listening",
          instruction: "Listen and type the main fact:",
          prompt: "The train arrives at 8.",
          audioText: "The train arrives at 8.",
          correctAnswer: "the train arrives at 8",
          translation: "El tren llega a las 8.",
        },
      ],
    },
  },

  writing: {
    "writing-l1": {
      lessonTopics: [
        {
          id: "writing-l1",
          label: "Main Rule",
          state: "active",
          marker: "1",
          levelText: "LEVEL 1",
          title: "Punctuation Basics",
          description: "Write simple sentences with correct punctuation.",
          objectives: ["Use periods", "Use capital letters", "Write short sentences"],
          formulaLabel: "Capital + sentence + period",
          formula: "I am a student.",
          examples: [{ source: "My name is Ana.", translation: "Mi nombre es Ana." }],
        },
      ],
      exercises: [
        {
          id: "writing-l1-ex1",
          type: "input",
          instruction: "Write the sentence correctly:",
          prompt: "my name is ana",
          correctAnswer: "my name is ana.",
          translation: "Mi nombre es Ana.",
        },
      ],
    },
    "writing-l2": {
      lessonTopics: [
        {
          id: "writing-l2",
          label: "Main Rule",
          state: "active",
          marker: "2",
          levelText: "LEVEL 2",
          title: "Email Drafts",
          description: "Write short, polite email sentences.",
          objectives: ["Use greetings", "Write short requests", "Close politely"],
          formulaLabel: "Greeting + request + close",
          formula: "Hi + I'd like + thanks",
          examples: [{ source: "Hi, I'd like more information.", translation: "Hola, me gustaría más información." }],
        },
      ],
      exercises: [
        {
          id: "writing-l2-ex1",
          type: "input",
          instruction: "Write a polite request:",
          prompt: "I want information.",
          correctAnswer: "i'd like information.",
          translation: "Me gustaría información.",
        },
      ],
    },
    "writing-l3": {
      lessonTopics: [
        {
          id: "writing-l3",
          label: "Main Rule",
          state: "active",
          marker: "3",
          levelText: "LEVEL 3",
          title: "Argumentative Paragraphs",
          description: "Express a simple opinion with a reason.",
          objectives: ["State an opinion", "Add a reason", "Use connectors"],
          formulaLabel: "Opinion + because + reason",
          formula: "I think ... because ...",
          examples: [{ source: "I think reading is useful because it improves vocabulary.", translation: "Creo que leer es útil porque mejora el vocabulario." }],
        },
      ],
      exercises: [
        {
          id: "writing-l3-ex1",
          type: "input",
          instruction: "Complete the opinion sentence:",
          prompt: "I think English is useful because _____",
          correctAnswer: "it helps me communicate",
          translation: "Creo que el inglés es útil porque me ayuda a comunicarme.",
        },
      ],
    },
    "writing-l4": {
      lessonTopics: [
        {
          id: "writing-l4",
          label: "Main Rule",
          state: "active",
          marker: "4",
          levelText: "LEVEL 4",
          title: "Storytelling",
          description: "Write short sequences of events in order.",
          objectives: ["Use sequence words", "Write past actions", "Build a short story"],
          formulaLabel: "First + then + finally",
          formula: "First ... then ... finally ...",
          examples: [{ source: "First I woke up, then I ate breakfast, finally I went to school.", translation: "Primero me desperté, luego desayuné, finalmente fui a la escuela." }],
        },
      ],
      exercises: [
        {
          id: "writing-l4-ex1",
          type: "reorder",
          instruction: "Reorder the story sentence:",
          prompt: "woke up / I / early",
          options: ["woke up", "I", "early"],
          correctAnswer: "i woke up early",
          translation: "Me desperté temprano.",
        },
      ],
    },
  },
};

function buildLessonDatabase(database: Record<ActiveSkill, Record<string, LevelContent>>) {
  const lessons: Record<string, LessonTopic[]> = {};

  for (const skillLevels of Object.values(database)) {
    for (const [levelId, content] of Object.entries(skillLevels)) {
      lessons[levelId] = content.lessonTopics;
    }
  }

  return lessons;
}

function buildExerciseDatabase(database: Record<ActiveSkill, Record<string, LevelContent>>) {
  const exercises: Record<string, Exercise[]> = {};

  for (const skillLevels of Object.values(database)) {
    for (const [levelId, content] of Object.entries(skillLevels)) {
      exercises[levelId] = content.exercises;
    }
  }

  return exercises;
}

export const LESSONS_DATABASE = buildLessonDatabase(CONTENT_DATABASE);
export const EXERCISES_DATABASE = buildExerciseDatabase(CONTENT_DATABASE);

export function getLevelContent(skill: ActiveSkill, levelId: string) {
  return CONTENT_DATABASE[skill]?.[levelId];
}
