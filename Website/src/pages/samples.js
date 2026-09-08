import React from 'react';
import Layout from '@theme/Layout';
import ThemedImage from '@theme/ThemedImage';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import types from '@site/../Aspid.FastTools/Packages/tech.aspid.fasttools/Samples~/Types/Documentation/Images/scene.png';
import weapons from '@site/../Aspid.FastTools/Packages/tech.aspid.fasttools/Samples~/SerializeReferences/Documentation/Images/scene.png';
import surfaces from '@site/../Aspid.FastTools/Packages/tech.aspid.fasttools/Samples~/EnumValues/Documentation/Images/scene.png';
import flock from '@site/../Aspid.FastTools/Packages/tech.aspid.fasttools/Samples~/ProfilerMarkers/Documentation/Images/scene.png';
import abilities from '@site/../Aspid.FastTools/Packages/tech.aspid.fasttools/Samples~/EditorTools/Documentation/Images/ability-catalog.png';
import typesLight from '@site/../Aspid.FastTools/Packages/tech.aspid.fasttools/Samples~/Types/Documentation/Images/scene-light.png';
import weaponsLight from '@site/../Aspid.FastTools/Packages/tech.aspid.fasttools/Samples~/SerializeReferences/Documentation/Images/scene-light.png';
import surfacesLight from '@site/../Aspid.FastTools/Packages/tech.aspid.fasttools/Samples~/EnumValues/Documentation/Images/scene-light.png';
import flockLight from '@site/../Aspid.FastTools/Packages/tech.aspid.fasttools/Samples~/ProfilerMarkers/Documentation/Images/scene-light.png';
import abilitiesLight from '@site/../Aspid.FastTools/Packages/tech.aspid.fasttools/Samples~/EditorTools/Documentation/Images/ability-catalog-light.png';
import styles from './samples.module.css';

const samples = [
  { id: 'serialize-references', feature: 'SerializeReferences', image: weapons, lightImage: weaponsLight,
    en: ['Weapon lab', 'Switch weapons, combine effects and see every hit.'],
    ru: ['Оружейная лаборатория', 'Меняйте оружие, сочетайте эффекты и наблюдайте результат каждого попадания.'] },
  { id: 'types', feature: 'Types', image: types, lightImage: typesLight,
    en: ['Spawn arena', 'Choose enemy behaviours and arrange the next wave.'],
    ru: ['Арена появления врагов', 'Выбирайте поведение врагов и схему появления следующей волны.'] },
  { id: 'enum-values', feature: 'EnumValues', image: surfaces, lightImage: surfacesLight,
    en: ['Surface laboratory', 'Explore how surfaces change colors, trails and movement.'],
    ru: ['Лаборатория поверхностей', 'Исследуйте, как поверхности меняют цвет, следы и скорость движения.'] },
  { id: 'profiler-markers', feature: 'ProfilerMarkers', image: flock, lightImage: flockLight,
    en: ['Flock observatory', 'Watch the simulation, then inspect its work in the Profiler.'],
    ru: ['Обсерватория стаи', 'Наблюдайте за симуляцией и изучайте её работу в Profiler.'] },
  { id: 'editor-tools', feature: 'EditorTools', image: abilities, lightImage: abilitiesLight,
    en: ['Ability catalog', 'Tune abilities in a custom editor with asset binding and Undo.'],
    ru: ['Каталог способностей', 'Настраивайте способности в редакторе с привязкой к ассетам и поддержкой Undo.'] },
];

export default function Samples() {
  const { i18n } = useDocusaurusContext();
  const ru = i18n.currentLocale === 'ru';
  const title = ru ? 'Примеры в действии' : 'Samples in action';
  const description = ru
    ? 'Пять небольших лабораторий. Откройте сцену или окно, измените настройку и посмотрите, что произойдёт.'
    : 'Five small labs. Open a scene or editor, change a setting and see what happens.';
  return (
    <Layout title={title} description={description}>
      <main className={styles.page}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>ASPID FASTTOOLS / SAMPLE LAB</p>
          <h1>{title}</h1>
          <p className={styles.intro}>{description}</p>
          <p className={styles.importNote}>{ru
            ? 'Начните в Unity: Package Manager → Aspid.FastTools → Samples → Import.'
            : 'Start in Unity: Package Manager → Aspid.FastTools → Samples → Import.'}</p>
        </header>
        <div className={styles.grid}>
          {samples.map((sample, index) => {
            const [name, description] = sample[ru ? 'ru' : 'en'];
            return (
              <Link key={sample.id} to={`/tutorials/${sample.id}`} className={styles.card}>
                <div className={styles.preview}>
                  <ThemedImage sources={{dark: sample.image, light: sample.lightImage}} alt={name} width="1440" height="810" loading={index > 1 ? 'lazy' : 'eager'} />
                </div>
                <div className={styles.content}>
                  <p className={styles.feature}>{String(index + 1).padStart(2, '0')} / {sample.feature}</p>
                  <h2>{name}</h2>
                  <p>{description}</p>
                  <span className={styles.action}>{ru ? 'Открыть пример' : 'Explore sample'} <span aria-hidden="true">↗</span></span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </Layout>
  );
}
