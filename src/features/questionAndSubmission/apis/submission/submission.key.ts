export const submissionKeys = {
  all: ["submissions"] as const,
  submissins: (submissionId: string) => [...submissionKeys.all, submissionId] as const,
};