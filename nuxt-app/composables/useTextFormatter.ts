/**
 * This function replaces the \n substring in a string with a <br/>
 * html tag
 */

const useTextFormatter = (text: string) => {
    return text.replaceAll('\n', '<br/>');
};

export default useTextFormatter;
