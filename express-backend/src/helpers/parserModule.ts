export function checkIfRoutine(chatgptAnswer: string): boolean {
    return chatgptAnswer.includes('ROUTINE'); //TODO: find unique pattern for json routines
}
export function extractYAMLString(chatgptAnswer: string): string {
    /* const match = chatgptAnswer.match(/```yaml([\s\S]*?)```/); */
    const match = chatgptAnswer.match(/```([\s\S]*?)```/);

    if (match && match[1]) {
        return match[1].trim();
    }

    return 'null';
}

export function extractYAMLName(chatgptAnswer: string): string {
    const pattern1 = /alias:\s*(.*)/;
    const pattern2 = /"alias":\s*(.*)/;

    const match1 = chatgptAnswer.match(pattern1);
    const match2 = chatgptAnswer.match(pattern2);

    let name = null;
    if (match1 && match1.length > 1) {
        name = match1[1].trim();
        return name;
    } else if (match2 && match2.length > 1) {
        name = match2[1].trim();
        return name;
    }

    return 'null';
}
