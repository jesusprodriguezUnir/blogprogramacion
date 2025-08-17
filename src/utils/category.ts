export const categoryColors: Record<string, string> = {
  ia: 'bg-green-500',
  web: 'bg-blue-500',
  noticias: 'bg-purple-500',
  herramientas: 'bg-orange-500',
};

export function getCategoryColor(category: string) {
  return categoryColors[category.toLowerCase()] || 'bg-gray-500';
}
