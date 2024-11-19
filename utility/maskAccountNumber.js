export const maskAccountNumber = (number) =>
{
    const length = number.length;
    const maskedDigits = 'X'.repeat(length - 6);
    return maskedDigits + number.slice(-6)
}