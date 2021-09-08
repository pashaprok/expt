interface Id {
    id: number
}
export function checkBelongs<T extends Id>(arr: T[], id: number): boolean {
    let check: boolean;
    arr.forEach(i => {
        check = i.id === id;
    })

    return check;
}