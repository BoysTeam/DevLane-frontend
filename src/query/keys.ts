export const queryKeys = {
    board: {
        mine: ['board', 'me'] as const,
    },
    cards: {
        mine: ['cards', 'me'] as const,
        detail: (cardId: string) => ['cards', cardId] as const,
    },
}