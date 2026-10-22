export const examsKey={
    all: ['exams'] as const,
    infinite: (diplomaId: string) => [...examsKey.all, "infinite", diplomaId] as const
}