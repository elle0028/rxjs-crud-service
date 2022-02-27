import { BookApiModel } from '../models/book.api.model';

export const ApiBooks: BookApiModel[] = [
  {
    id: 1,
    authorId: 1,
    name: 'Name of the Rose',
    description:
      'It is a historical murder mystery set in an Italian monastery in the year 1327, and an intellectual mystery combining semiotics in fiction, biblical analysis, medieval studies, and literary theory. It was translated into English by William Weaver in 1983.',
  },
  {
    id: 2,
    authorId: 1,
    name: "Foucault's Pendulum",
    description:
      "The pendulum of the title refers to an actual pendulum designed by French physicist Léon Foucault to demonstrate Earth's rotation, which has symbolic significance within the novel.",
  },
  {
    id: 3,
    authorId: 2,
    name: 'The Aleph',
    description:
      'The title work, "The Aleph", describes a point in space that contains all other spaces at once. The work also presents the idea of infinite time.',
  },
  {
    id: 4,
    authorId: 2,
    name: 'Ficciones',
    description:
      "produced between 1941 and 1956. The English translation of Fictions was published in 1962, the same year as Labyrinths, a separate compilation of Borges's translated works.",
  },
  {
    id: 5,
    authorId: 3,
    name: 'Leviathan Wakes',
    description:
      "It is the first book in the Expanse series, followed by Caliban's War (2012), Abaddon's Gate (2013) and six other novels.",
  },
];
