function formatDate(milliseconds: string) {
  const date = new Date(parseInt(milliseconds));
  const day = String(date.getDate()).padStart(2, "0"); // Garante que o dia tenha dois dígitos
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Garante que o mês tenha dois dígitos
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export default formatDate;
