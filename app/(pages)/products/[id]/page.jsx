import ClientProductComponent from "./ClientProductComponent";
import getProductById from '@/app/utils/getProductById';
import getAllProductsByTitle from '@/app/utils/getAllProductsByTitle';

export const revalidate = 60;

export async function generateMetadata({ params }) {
    const { id } = await params;
    const product = await getProductById(id);
    return {
        title: `Компас СП | ${product?.title}`,
        description: product?.description,
    }
}


// Вспомогательная функция для получения "чистого" названия товара
function getCleanTitle(fullTitle) {
  if (typeof fullTitle !== 'string') {
    return fullTitle || ''; // Возвращаем пустую строку, если название не строка или null/undefined
  }

  // Обновленное регулярное выражение:
  // (?:\s[рp]\.\s*|\s) : префикс - либо (пробел + "р." + пробелы), либо просто пробел
  // ([a-z]{1,4}|\d{2,3}) : основная группа для размера (1-4 буквы как XXL, или 2-3 цифры как 56)
  // \s* : ноль или более пробелов
  // (?:\/\s*(\d+(?:-\d+)?))? : необязательная группа для роста (например, /170-180)
  // (?:\s*\([a-z\d-]+\))? : необязательная группа для дополнительного размера в скобках, например " (XS)" или " (42-44)"
  const sizeHeightPattern = /(?:\s[рp]\.\s*|\s)([a-z]{1,4}|\d{2,3})\s*(?:\/\s*(\d+(?:-\d+)?))?(?:\s*\([a-z\d-]+\))?/i;

  // Удаляем найденный паттерн
  let cleanTitle = fullTitle.replace(sizeHeightPattern, '');

  // Очистка от возможных оставшихся артефактов:
  // 1. Удаляем висячие запятые и пробелы перед ними
  cleanTitle = cleanTitle.replace(/\s*,\s*$/, '').trim();
  // 2. Удаляем пустые скобки (например, если было "(р.XL)") и пробелы вокруг них
  cleanTitle = cleanTitle.replace(/\s*\(\s*\)\s*$/, '').trim();
  // 3. Финальная обрезка пробелов по краям
  cleanTitle = cleanTitle.trim();

  return cleanTitle;
}



export default async function Page({ params }) {
    const { id } = await params;
    const product = await getProductById(id);
    const productTitle = await product?.title;
    const titleUniq = getCleanTitle(productTitle);
    const sameProducts = await getAllProductsByTitle(titleUniq);

    console.log(sameProducts);
    

    return (
        <ClientProductComponent
            data={product}
            sameProducts={sameProducts}
        />
    );
}