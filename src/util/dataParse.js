export function parseTimeStampToLocalDate(timeStamp) {
  return new Date(timeStamp * 1000).toLocaleDateString("pt-BR");
}
