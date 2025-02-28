// export function truncateString(input: string): string {
//   if (input.length <= 30) {
//     return input;
//   } else {
//     const truncatedPart = input.substring(0, 27); // Take the first 17 characters
//     const lastThreeCharacters = input.substring(input.length - 3); // Take the last 3 characters
//     return truncatedPart + "..." + lastThreeCharacters;
//   }
// }
export function truncateString(input?: string): string {
  if (!input) return ""; // Return an empty string if input is undefined/null

  if (input.length <= 30) {
    return input;
  } else {
    return input.substring(0, 27) + "..."; // Truncate and add ellipsis
  }
}
