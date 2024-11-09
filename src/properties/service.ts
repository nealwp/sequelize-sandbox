interface PropertyListing {
    id: number;
    state: string;
    city: string;
}

function listProperties(): PropertyListing[] {
    return [
        { id: 1, state: 'NC', city: 'Raleigh' },
        { id: 2, state: 'NC', city: 'Durham' },
        { id: 3, state: 'NC', city: 'Smithfield' },
        { id: 4, state: 'NC', city: 'Clayton' },
    ]
}

export default { listProperties };
