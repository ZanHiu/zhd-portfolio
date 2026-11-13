import { useModal } from '../components/modals/ModalProvider'
import { SectionHeader } from '../components/sections/SectionHeader'
import styles from '../components/sections/sections.module.css'
import { credentials } from '../data/credentials'

export function CredentialsPage() {
  const { openDocument } = useModal()

  return (
    <section className={styles.page} aria-labelledby="credentials-title">
      <SectionHeader
        eyebrow="CREDENTIALS / MY ARCHIVE"
        id="credentials"
        index="05"
        title="Credentials, education, and field records."
      />
      <div className={styles.credentialsGrid}>
        <section className={styles.credentialSummary} aria-labelledby="document-set-title">
          <p className={styles.miniLabel}>DOCUMENT SET</p>
          <h2 id="document-set-title">Experience and education records.</h2>
          <p>A concise overview of my academic background, professional experience, and career progress.</p>
          <div className={styles.stats}>
            <div><strong>01</strong><span>WORK RECORD</span></div>
            <div><strong>02</strong><span>EDUCATION RECORDS</span></div>
            <div><strong>{String(credentials.length).padStart(2, '0')}</strong><span>DOCUMENTED RECORDS</span></div>
            <div><strong>2026</strong><span>PORTFOLIO EDITION</span></div>
          </div>
        </section>
        <section className={styles.credentialArchive} aria-labelledby="record-archive-title">
          <header className={styles.credentialArchiveHeader}>
            <p className={styles.miniLabel} id="record-archive-title">QUALIFICATIONS / RECORDS</p>
            <span>LOCAL REVIEW</span>
          </header>
          <div className={styles.credentialCards}>
            {credentials.map((credential) => (
              <button
                className={styles.credential}
                key={credential.id}
                onClick={() => openDocument(credential)}
                type="button"
              >
                <span className={styles.credentialCode}>{credential.number} / {credential.category}</span>
                <span className={styles.credentialAction}>VIEW RECORD ↗</span>
                <div className={styles.credentialSheet} aria-hidden="true">
                  <span>TEXT RECORD</span>
                  <i /><i /><i /><i />
                </div>
                <div className={styles.credentialContent}>
                  <small>{credential.category}</small>
                  <strong>{credential.title}</strong>
                  <span>{credential.summary}</span>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </section>
  )
}
