export interface Frequency {
    letter: string;
    frequency: { originalCount: number, expectedCount: number };
}

export const STATISTICS: Frequency[] = [
    { letter: 'A', frequency: { originalCount: 35, expectedCount: 64 } },
    { letter: 'B', frequency: { originalCount: 57, expectedCount: 35 } },
    { letter: 'C', frequency: { originalCount: 57, expectedCount: 5 } },
    { letter: 'D', frequency: { originalCount: 57, expectedCount: 3 } },
    { letter: 'E', frequency: { originalCount: 56, expectedCount: 25 } },
    { letter: 'F', frequency: { originalCount: 46, expectedCount: 156 } },
    { letter: 'G', frequency: { originalCount: 34, expectedCount: 156 } },
    { letter: 'H', frequency: { originalCount: 64, expectedCount: 14 } },
    { letter: 'I', frequency: { originalCount: 46, expectedCount: 57 } },
    { letter: 'J', frequency: { originalCount: 64, expectedCount: 3 } },
    { letter: 'K', frequency: { originalCount: 45, expectedCount: 57 } },
    { letter: 'L', frequency: { originalCount: 87, expectedCount: 14 } },
    { letter: 'M', frequency: { originalCount: 46, expectedCount: 89 } },
    { letter: 'N', frequency: { originalCount: 3, expectedCount: 90 } },
    { letter: 'O', frequency: { originalCount: 57, expectedCount: 143 } },
    { letter: 'P', frequency: { originalCount: 43, expectedCount: 34 } },
    { letter: 'Q', frequency: { originalCount: 4, expectedCount: 4 } },
    { letter: 'R', frequency: { originalCount: 7, expectedCount: 24 } },
    { letter: 'S', frequency: { originalCount: 67, expectedCount: 56 } },
    { letter: 'T', frequency: { originalCount: 23, expectedCount: 75 } },
    { letter: 'U', frequency: { originalCount: 54, expectedCount: 3 } },
    { letter: 'V', frequency: { originalCount: 45, expectedCount: 67 } },
    { letter: 'W', frequency: { originalCount: 54, expectedCount: 36 } },
    { letter: 'X', frequency: { originalCount: 45, expectedCount: 74 } },
    { letter: 'Y', frequency: { originalCount: 54, expectedCount: 23 } },
    { letter: 'Z', frequency: { originalCount: 234, expectedCount: 6 } }
];