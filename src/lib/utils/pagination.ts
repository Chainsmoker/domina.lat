/**
 * Genera un arreglo con los números de página y puntos suspensivos (...) para la paginación.
 * Ejemplo con siblingCount = 1:
 * totalPages = 5,  current = 1  => [1, 2, 3, 4, 5]
 * totalPages = 10, current = 1  => [1, 2, 3, 4, 5, '...', 10]
 * totalPages = 10, current = 5  => [1, '...', 4, 5, 6, '...', 10]
 * totalPages = 10, current = 9  => [1, '...', 6, 7, 8, 9, 10]
 */
export function getPaginationRange(
  currentPage: number,
  totalPages: number,
  siblingCount: number = 1
): (number | string)[] {
  if (totalPages <= 1) return [1];

  // Umbral mínimo antes de compactar con puntos suspensivos
  const totalNumbers = siblingCount * 2 + 4;
  if (totalPages <= totalNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

  const boundaryCount = 2 * siblingCount + 1;

  // Caso 1: Solo elipsis a la derecha (cerca del inicio)
  if (!shouldShowLeftDots && shouldShowRightDots) {
    const end = Math.max(boundaryCount, rightSiblingIndex);
    const leftRange = Array.from({ length: end }, (_, i) => i + 1);
    return [...leftRange, '...', totalPages];
  }

  // Caso 2: Solo elipsis a la izquierda (cerca del final)
  if (shouldShowLeftDots && !shouldShowRightDots) {
    const start = Math.min(leftSiblingIndex, totalPages - boundaryCount + 1);
    const rightRange = Array.from(
      { length: totalPages - start + 1 },
      (_, i) => start + i
    );
    return [1, '...', ...rightRange];
  }

  // Caso 3: Elipsis a ambos lados (en el medio)
  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    );
    return [1, '...', ...middleRange, '...', totalPages];
  }

  return Array.from({ length: totalPages }, (_, i) => i + 1);
}

