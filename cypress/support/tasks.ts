/**
 * Logs to the node's console instead of the browser one
 * @param valuesToLog 
 * @returns null
 */
export function log(valuesToLog: any[]) {

    console.log(
        "\n=====TEST DEBUG INFO======\n",
        ...valuesToLog,
        "\n==========================\n")

    return null
}