
export type Classroom = {
    id: string;
    name: string;
    subject: string;
    grade: string;
    studentCount: number;
    moduleCount: number;
    students: Student[];
};

export type Student = {
    id: string;
    name: string;
    avatar: string;
    progress: number;
    strengths: string[];
    weaknesses: string[];
    recentActivity: Activity[];
}

export type Activity = {
    date: string;
    description: string;
    type: 'completion' | 'struggle' | 'improvement';
};

export const mockClassrooms: Classroom[] = [
    {
        id: 'class-1',
        name: 'Algebra Avengers',
        subject: 'Mathematics',
        grade: 'Grade 10',
        studentCount: 25,
        moduleCount: 4,
        students: [
            { 
                id: 's1', 
                name: 'Alice Johnson', 
                avatar: 'https://picsum.photos/id/1027/100/100',
                progress: 85,
                strengths: ['Linear Equations', 'Graphing'],
                weaknesses: ['Quadratic Formula', 'Word Problems'],
                recentActivity: [
                    { date: '2024-07-20', description: 'Completed "Linear Equations" module.', type: 'completion' },
                    { date: '2024-07-19', description: 'Struggled with "Quadratic Equations" quiz.', type: 'struggle' },
                    { date: '2024-07-18', description: 'Improved score on "Graphing" practice.', type: 'improvement' },
                ]
            },
            { 
                id: 's2', 
                name: 'Bob Williams', 
                avatar: 'https://picsum.photos/id/1005/100/100',
                progress: 62,
                strengths: ['Factoring', 'Exponents'],
                weaknesses: ['Geometry', 'Trigonometry'],
                 recentActivity: [
                    { date: '2024-07-20', description: 'Completed "Exponents" practice.', type: 'completion' },
                    { date: '2024-07-19', description: 'Struggled with "Geometry Basics" module.', type: 'struggle' },
                ]
            },
            { id: 's3', name: 'Charlie Brown', avatar: 'https://picsum.photos/id/1012/100/100', progress: 91, strengths: ['Calculus', 'Statistics'], weaknesses: ['Algebra'], recentActivity: [] },
            { id: 's4', name: 'Diana Miller', avatar: 'https://picsum.photos/id/1011/100/100', progress: 74, strengths: ['Problem Solving'], weaknesses: ['Timed Tests'], recentActivity: [] },
            { id: 's5', name: 'Eve Davis', avatar: 'https://picsum.photos/id/1025/100/100', progress: 88, strengths: ['All areas'], weaknesses: ['None identified'], recentActivity: [] },
            { id: 's6', name: 'Frank White', avatar: 'https://picsum.photos/id/1026/100/100', progress: 55, strengths: ['Participation'], weaknesses: ['Homework Completion'], recentActivity: [] },
        ]
    },
    {
        id: 'class-2',
        name: 'Physics Phantoms',
        subject: 'Physical Science',
        grade: 'Grade 11',
        studentCount: 18,
        moduleCount: 3,
        students: [
            { id: 's7', name: 'Grace Lee', avatar: 'https://picsum.photos/id/1028/100/100', progress: 95, strengths: ["Newton's Laws"], weaknesses: ['Thermodynamics'], recentActivity: [] },
            { id: 's8', name: 'Heidi Harris', avatar: 'https://picsum.photos/id/1029/100/100', progress: 81, strengths: ['Lab Work'], weaknesses: ['Quantum Mechanics'], recentActivity: [] },
            { id: 's9', name: 'Ivan Scott', avatar: 'https://picsum.photos/id/1031/100/100', progress: 76, strengths: ['Kinematics'], weaknesses: ['Electromagnetism'], recentActivity: [] },
        ]
    },
    {
        id: 'class-3',
        name: 'Biology Buffs',
        subject: 'Life Sciences',
        grade: 'Grade 9',
        studentCount: 32,
        moduleCount: 5,
        students: [
            { id: 's10', name: 'Judy Green', avatar: 'https://picsum.photos/id/1032/100/100', progress: 89, strengths: ['Cell Biology'], weaknesses: ['Genetics'], recentActivity: [] },
            { id: 's11', name: 'Mallory King', avatar: 'https://picsum.photos/id/1033/100/100', progress: 92, strengths: ['Botany'], weaknesses: ['Anatomy'], recentActivity: [] },
            { id: 's12', name: 'Oscar Adams', avatar: 'https://picsum.photos/id/1035/100/100', progress: 78, strengths: ['Ecology'], weaknesses: ['Microbiology'], recentActivity: [] },
            { id: 's13', name: 'Peggy Baker', avatar: 'https://picsum.photos/id/1036/100/100', progress: 68, strengths: ['Zoology'], weaknesses: ['Evolution'], recentActivity: [] },
            { id: 's14', name: 'Trent Nelson', avatar: 'https://picsum.photos/id/1037/100/100', progress: 84, strengths: ['Marine Biology'], weaknesses: ['Entomology'], recentActivity: [] },
        ]
    },
];
