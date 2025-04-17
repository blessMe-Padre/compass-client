import Image from "next/image";
import styles from "./page.module.css";
import { CategoryList, MainSlider } from "./section";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className="visually-hidden">магазин компас</h1>
      {/* <Image
        className={styles.slide}
        src="/remove/slide.webp"
        alt="logo"
        width={1920}
        height={910}
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MiIgaGVpZ2h0PSIxMTg5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiIC8+PC9zdmc+" priority
      /> */}
      <MainSlider />
      <CategoryList />
    </main>
  );
}
