/**
 * This function replaces the \n substring in a string with a <br/>
 * html tag and code blocks with something more interesting for an average user
 */

const useTextFormatter = (text: string) => {
    // if there is the code block we replace it with a string
    const transformedText = text.replace(/```([\s\S]*?)```/g, '(click the button below to inspect the code)\n\n After saving the routine you can check it out into your routine page or just click Inspect Code below.');

    // Replace newline characters with <br/>
    const formattedText = transformedText.replaceAll('\\n', '<br/>');

    return formattedText;
};

export default useTextFormatter;
