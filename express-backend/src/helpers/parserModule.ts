export function checkIfRoutine(chatgptAnswer: string): boolean {
    if(chatgptAnswer.includes('```')) {
        const routine = extractJSONString(chatgptAnswer);
        const jsonData = JSON.parse(routine);
        if (jsonData && jsonData.alias && jsonData.trigger && jsonData.action) return true;
        else return false;
    }
    else return false;
}

// given the chat gpt answer retrieve the json code 
export function extractJSONString(chatgptAnswer: string): string {
    const match = chatgptAnswer.match(/```([\s\S]*?)```/);

    if (match && match[1]) {
        return match[1].trim();
    }

    return 'null';
}

export function extractJSONName(chatgptAnswer: string): string {
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
