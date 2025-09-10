
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
}

export const mockClassrooms: Classroom[] = [
    {
        id: 'class-1',
        name: 'Algebra Avengers',
        subject: 'Mathematics',
        grade: 'Grade 10',
        studentCount: 25,
        moduleCount: 4,
        students: [
            { id: 's1', name: 'Alice', avatar: 'https://picsum.photos/id/1027/100/100' },
            { id: 's2', name: 'Bob', avatar: 'https://picsum.photos/id/1005/100/100' },
            { id: 's3', name: 'Charlie', avatar: 'https://picsum.photos/id/1012/100/100' },
            { id: 's4', name: 'Diana', avatar: 'https://picsum.photos/id/1011/100/100' },
            { id: 's5', name: 'Eve', avatar: 'https://picsum.photos/id/1025/100/100' },
            { id: 's6', name: 'Frank', avatar: 'https://picsum.photos/id/1026/100/100' },
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
            { id: 's7', name: 'Grace', avatar: 'https://picsum.photos/id/1028/100/100' },
            { id: 's8', name: 'Heidi', avatar: 'https://picsum.photos/id/1029/100/100' },
            { id: 's9', name: 'Ivan', avatar: 'https://picsum.photos/id/1031/100/100' },
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
            { id: 's10', name: 'Judy', avatar: 'https://picsum.photos/id/1032/100/100' },
            { id: 's11', name: 'Mallory', avatar: 'https://picsum.photos/id/1033/100/100' },
            { id: 's12', name: 'Oscar', avatar: 'https://picsum.photos/id/1035/100/100' },
            { id: 's13', name: 'Peggy', avatar: 'https://picsum.photos/id/1036/100/100' },
            { id: 's14', name: 'Trent', avatar: 'https://picsum.photos/id/1037/100/100' },
        ]
    },
];
