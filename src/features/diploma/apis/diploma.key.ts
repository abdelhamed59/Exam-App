export const diplomaKey={
    all: ['diplomas'] as const,
    infinite: () => [...diplomaKey.all, "infinite"] as const
}

