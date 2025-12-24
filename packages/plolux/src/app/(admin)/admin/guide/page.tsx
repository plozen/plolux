import styles from './page.module.scss';

export default function StyleGuidePage() {
  const colors = [
    { name: 'Primary Blue', hex: '#0055a4', className: styles.bgPrimary },
    { name: 'Secondary Cyan', hex: '#00d1ff', className: styles.bgSecondary },
    { name: 'Primary Pale', hex: 'rgba(0, 85, 164, 0.1)', className: styles.bgPrimaryPale },
    { name: 'Text Dark', hex: '#1a1a1b', className: styles.bgTextDark },
    { name: 'Text Gray', hex: '#4e5968', className: styles.bgTextGray },
    { name: 'Background Light', hex: '#f4f7fa', className: styles.bgBgLight },
  ];

  return (
    <div className={styles.guideContainer}>
      <h1 className={styles.title}>PLOLUX Design System Guide</h1>
      
      <section className={styles.section}>
        <h2 className="text-xl font-bold mb-4">Color Palette</h2>
        <div className={styles.grid}>
          {colors.map((color) => (
            <div key={color.name} className={styles.colorCard}>
              <div className={`${styles.preview} ${color.className}`}></div>
              <div className={styles.info}>
                <div className={styles.name}>{color.name}</div>
                <div className={styles.hex}>{color.hex}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className="text-xl font-bold mb-4">Typography (Preview)</h2>
        <div className="space-y-4">
          <div>
            <h1 className="text-4xl font-bold">Heading 1 - 당신의 비즈니스가 팔리는 웹사이트</h1>
            <p className="text-sm text-gray-500">4xl / Bold</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold">Heading 2 - 서브 타이틀 예시</h2>
            <p className="text-sm text-gray-500">3xl / Bold</p>
          </div>
           <div>
            <p className={`text-base text-[#4e5968]`}>
              Body Text - 고객 만족도 98%를 달성한 PLOLUX의 디자인 철학입니다.
            </p>
             <p className="text-sm text-gray-500">Base / Regular / #4e5968</p>
          </div>
        </div>
      </section>
    </div>
  );
}
