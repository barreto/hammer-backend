/**
 * Binary to ASCII
 */
export function btoa(data: string) {
    return Buffer.from(data, 'binary').toString('base64');
}
