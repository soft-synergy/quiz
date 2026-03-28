import styles from './page.module.css'
import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy — TAICHI COACH',
}

export default function PrivacyPolicyPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link href="/" className={styles.back}>← Back</Link>

        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.updated}>Last updated: March 2026</p>

        <section className={styles.section}>
          <h2>1. Who we are</h2>
          <p>TAICHI COACH operates this quiz and the personalized indoor walking plan service. We are committed to protecting your personal information and your right to privacy.</p>
        </section>

        <section className={styles.section}>
          <h2>2. Information we collect</h2>
          <p>When you take our quiz, we collect information you provide directly:</p>
          <ul>
            <li>Age group</li>
            <li>Health and fitness goals</li>
            <li>Body measurements (height, weight, goal weight)</li>
            <li>Lifestyle information (activity level, sleep, diet habits)</li>
            <li>Your name and email address</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>3. How we use your information</h2>
          <p>We use the information you provide to:</p>
          <ul>
            <li>Create your personalized Tai Chi Indoor Walking plan</li>
            <li>Send your plan to your email address</li>
            <li>Improve our quiz and recommendations</li>
            <li>Communicate with you about your plan and progress</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>4. Health data</h2>
          <p>We collect health-related information (height, weight, BMI) solely to personalize your fitness plan. By continuing the quiz and checking the consent box, you give us permission to use this data for that purpose. We do not sell your health data to third parties.</p>
        </section>

        <section className={styles.section}>
          <h2>5. Data sharing</h2>
          <p>We do not sell, trade, or rent your personal information to third parties. We may share data with trusted service providers who help us operate our platform (e.g., email delivery), under strict confidentiality agreements.</p>
        </section>

        <section className={styles.section}>
          <h2>6. Data retention</h2>
          <p>We retain your personal data for as long as necessary to provide our service and comply with legal obligations. You may request deletion of your data at any time by contacting us.</p>
        </section>

        <section className={styles.section}>
          <h2>7. Your rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Withdraw consent at any time</li>
            <li>Lodge a complaint with a supervisory authority</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>8. Cookies</h2>
          <p>We use cookies and similar technologies to remember your language preference and quiz progress. These are strictly functional and do not track you across other websites.</p>
        </section>

        <section className={styles.section}>
          <h2>9. Security</h2>
          <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
        </section>

        <section className={styles.section}>
          <h2>10. Contact us</h2>
          <p>If you have questions about this Privacy Policy or how we handle your data, please contact us at: <a href="mailto:privacy@taichicoach.com">privacy@taichicoach.com</a></p>
        </section>
      </div>
    </div>
  )
}
