import { useState, useRef, memo } from 'react';
import { Plus, Pencil } from 'lucide-react';
import styles from './TrainerSettingsForm.module.css';

// ── Types ────────────────────────────────────────────────────────────────────
interface Trainer {
  id: number;
  name: string;
  contact: string;
  dob: string;
  branch: string;
  aadhar: string;
  email: string;
  address: string;
  gender: string;
  specialization: string;
  experience: string;
  salaryType: string;
  amount: string;
  workingDays: string;
  workingTime: string;
  avatarUrl: string | null;
}

// ── Seed data ────────────────────────────────────────────────────────────────
const SEED_TRAINERS: Trainer[] = [
  {
    id: 1,
    name: 'Selva kumar. GS',
    contact: '9345665444',
    dob: '03/2/2002',
    branch: 'M.K.B Nagar',
    aadhar: '1234 5678 1234',
    email: 'Rajgym.03@gmail.com',
    address: 'West Mambalam, Chennai -600 033',
    gender: 'Male',
    specialization: 'GYM Trainee',
    experience: '5 years',
    salaryType: 'Monthly',
    amount: '$35',
    workingDays: 'Monday - Saturday',
    workingTime: '5:00 AM to 10:00 PM',
    avatarUrl: null,
  },
];

// ── Avatar ───────────────────────────────────────────────────────────────────
const GymAvatar = memo(
  ({ avatarUrl, onUpload }: { avatarUrl: string | null; onUpload: (url: string) => void }) => {
    const ref = useRef<HTMLInputElement>(null);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) onUpload(URL.createObjectURL(file));
    };

    return (
      <div className={styles.avatarWrap} onClick={() => ref.current?.click()}>
        <div className={styles.avatar}>
          {avatarUrl ? (
            <img src={avatarUrl} alt="gym logo" className={styles.avatarImg} />
          ) : (
            <span className={styles.avatarFallback}>G</span>
          )}
        </div>
        <button type="button" className={styles.avatarBadge} aria-label="Edit photo">
          <Pencil size={9} />
        </button>
        <input ref={ref} type="file" accept="image/*" className={styles.hiddenInput} onChange={handleFile} />
      </div>
    );
  },
);
GymAvatar.displayName = 'GymAvatar';

// ── Trainer Card ─────────────────────────────────────────────────────────────
const TrainerCard = memo(({ trainer }: { trainer: Trainer }) => (
  <div className={styles.card}>
    <section className={styles.cardSection}>
      <h4 className={styles.sectionTitle}>Basic Details</h4>
      <div className={styles.detailsGrid}>
        {([
          ['Name', trainer.name],
          ['Contact Number', trainer.contact],
          ['Date Of Birth', trainer.dob],
          ['Branch', trainer.branch],
          ['Aadhar number', trainer.aadhar],
          ['Email id', trainer.email],
          ['Address', trainer.address],
          ['Gender', trainer.gender],
        ] as [string, string][]).map(([label, value]) => (
          <span key={label} className={styles.detailItem}>
            <span className={styles.detailLabel}>{label} : </span>
            {value}
          </span>
        ))}
      </div>
    </section>

    <section className={styles.cardSection}>
      <h4 className={styles.sectionTitle}>Professional Details</h4>
      <div className={styles.detailsGrid}>
        {([
          ['Speculation', trainer.specialization],
          ['Experiences', trainer.experience],
          ['Salary', trainer.salaryType],
          ['Amount', trainer.amount],
          ['Working Days', trainer.workingDays],
          ['Working Time', trainer.workingTime],
        ] as [string, string][]).map(([label, value]) => (
          <span key={label} className={styles.detailItem}>
            <span className={styles.detailLabel}>{label} : </span>
            {value}
          </span>
        ))}
      </div>
    </section>
  </div>
));
TrainerCard.displayName = 'TrainerCard';

// ── Main Component ───────────────────────────────────────────────────────────
const TrainerSettingsForm = memo(() => {
  const [trainers, setTrainers] = useState<Trainer[]>(SEED_TRAINERS);
  const [gymAvatarUrl, setGymAvatarUrl] = useState<string | null>(null);

  const handleAddTrainer = () => {
    // Placeholder: open a modal / navigate to add-trainer form
    alert('Open Add Trainer modal here');
  };

  return (
    <div className={styles.root}>
      {/* Top bar: gym avatar + add button */}
      <div className={styles.topBar}>
        <GymAvatar avatarUrl={gymAvatarUrl} onUpload={setGymAvatarUrl} />
        <button type="button" className={styles.addBtn} onClick={handleAddTrainer}>
          <Plus size={14} />
          Trainer
        </button>
      </div>

      {/* Trainer cards */}
      <div className={styles.list}>
        {trainers.map((t) => (
          <TrainerCard key={t.id} trainer={t} />
        ))}
      </div>
    </div>
  );
});

TrainerSettingsForm.displayName = 'TrainerSettingsForm';
export default TrainerSettingsForm;