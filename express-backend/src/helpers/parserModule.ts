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
    const pattern = /"alias":\s*"([^"]*)"/;  

    const match = chatgptAnswer.match(pattern);

    let name = null;
    if (match && match.length > 1) {
        name = match[1].trim();
        return name;
    }

    return 'null';
}

export function cleanAutomationJSON(automation: string): string {
    const match = automation.match(/\{[^]*\}/);

    console.log(match);

    if (!match) {
        return automation;
    }

    automation = match[0];
    return automation;
}
