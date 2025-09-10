
export type Chapter = {
  id: string;
  title: string;
};

export type Subject = 
  | 'Mathematics' 
  | 'Physical Science'
  | 'Life Sciences'
  | 'Accounting'
  | 'Geography'
  | 'Economics';

export type GradeCurriculum = {
  [key in Subject]?: Chapter[];
};

export type Curriculum = {
  [grade: number]: GradeCurriculum;
};

export const curriculumData: Curriculum = {
  8: {
    Mathematics: [
      { id: 'm8-c1', title: 'Chapter 1: Whole Numbers' },
      { id: 'm8-c2', title: 'Chapter 2: Integers' },
      { id: 'm8-c3', title: 'Chapter 3: Exponents' },
    ],
    'Physical Science': [
      { id: 'ps8-c1', title: 'Chapter 1: Introduction to Science' },
      { id: 'ps8-c2', title: 'Chapter 2: Matter and Materials' },
    ],
  },
  9: {
    Mathematics: [
      { id: 'm9-c1', title: 'Chapter 1: Number System' },
      { id: 'm9-c2', title: 'Chapter 2: Algebra' },
      { id: 'm9-c3', title: 'Chapter 3: Geometry' },
    ],
    'Physical Science': [
        { id: 'ps9-c1', title: 'Chapter 1: Motion' },
        { id: 'ps9-c2', title: 'Chapter 2: Forces' },
    ],
  },
  10: {
    Mathematics: [
      { id: 'm10-c1', title: 'Chapter 1: Algebraic expressions' },
      { id: 'm10-c2', title: 'Chapter 2: Exponents' },
      { id: 'm10-c3', title: 'Chapter 3: Number patterns' },
      { id: 'm10-c4', title: 'Chapter 4: Equations and inequalities' },
      { id: 'm10-c5', title: 'Chapter 5: Trigonometry' },
    ],
    'Physical Science': [
      { id: 'ps10-c1', title: 'Chapter 1: Waves, Sound and Light' },
      { id: 'ps10-c2', title: 'Chapter 2: Chemical Change' },
      { id: 'ps10-c3', title: 'Chapter 3: The Atom' },
    ],
  },
  11: {
    Mathematics: [
      { id: 'm11-c1', title: 'Chapter 1: Exponents and surds' },
      { id: 'm11-c2', title: 'Chapter 2: Equations and inequalities' },
      { id: 'm11-c3', title: 'Chapter 3: Number patterns' },
      { id: 'm11-c4', title: 'Chapter 4: Analytical geometry' },
      { id: 'm11-c5', title: 'Chapter 5: Functions' },
    ],
    'Physical Science': [
        { id: 'ps11-c1', title: 'Chapter 1: Newton\'s Laws' },
        { id: 'ps11-c2', title: 'Chapter 2: Ideal Gases' },
        { id: 'ps11-c3', title: 'Chapter 3: Chemical Bonding' },
    ],
  },
  12: {
    Mathematics: [
        { id: 'm12-c1', title: 'Chapter 1: Sequences and series' },
        { id: 'm12-c2', title: 'Chapter 2: Functions' },
        { id: 'm12-c3', title: 'Chapter 3: Calculus' },
        { id: 'm12-c4', title: 'Chapter 4: Financial mathematics' },
        { id: 'm12-c5', title: 'Chapter 5: Probability' },
    ],
    'Physical Science': [
        { id: 'ps12-c1', title: 'Chapter 1: Momentum and Impulse' },
        { id: 'ps12-c2', title: 'Chapter 2: Vertical Projectile Motion' },
        { id: 'ps12-c3', title: 'Chapter 3: Organic Molecules' },
        { id: 'ps12-c4', title: 'Chapter 4: Electrochemistry' },
    ],
  },
};
