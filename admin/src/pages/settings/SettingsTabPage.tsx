import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip,
  LineChart, Line, CartesianGrid,
} from "recharts";

// ── ICONS ─────────────────────────────────────────────────────────────────────
const CalendarIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const ChevronDown = () => (
  <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
    <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const UploadIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6"/>
  </svg>
);
const PencilIcon = () => (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

// ── SHARED ────────────────────────────────────────────────────────────────────
const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition bg-white";

const SelectField = ({ placeholder, options = [] }: { placeholder: string; options?: string[] }) => (
  <div className="relative w-full">
    <select className={`${inputCls} appearance-none pr-9 cursor-pointer`} defaultValue="">
      <option value="" disabled>{placeholder}</option>
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><ChevronDown/></span>
  </div>
);

const AvatarUpload = ({ preview, onUpload }: { preview: string|null; onUpload:(u:string)=>void }) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="relative w-16 h-16 cursor-pointer" onClick={() => ref.current?.click()}>
      <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-yellow-700 via-green-900 to-black flex items-center justify-center border-2 border-gray-200">
        {preview ? <img src={preview} alt="av" className="w-full h-full object-cover"/> : <span className="text-2xl font-bold text-yellow-400">G</span>}
      </div>
      <button type="button" className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm pointer-events-none"><PencilIcon/></button>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={e=>{const f=e.target.files?.[0];if(f)onUpload(URL.createObjectURL(f));}}/>
    </div>
  );
};

// ── GENERAL ───────────────────────────────────────────────────────────────────
const GeneralSettings = () => {
  const logoRef = useRef<HTMLInputElement>(null);
  const [lp, setLp] = useState<string|null>(null);
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <input type="text" placeholder="Gym Name" className={inputCls}/>
        <input type="text" placeholder="Branch Name" className={inputCls}/>
        <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><CalendarIcon/></span><input type="date" className={`${inputCls} pl-9`}/></div>
        <input type="tel" placeholder="Contact Number" className={inputCls}/>
      </div>
      <input type="text" placeholder="Address" className={inputCls}/>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SelectField placeholder="State" options={["Tamil Nadu","Karnataka","Kerala","Maharashtra"]}/>
        <SelectField placeholder="City" options={["Chennai","Coimbatore","Madurai","Salem"]}/>
        <input type="text" placeholder="Enter Pin code" className={inputCls}/>
        <SelectField placeholder="Working Staff Count" options={["1-5","6-10","11-20","20+"]}/>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SelectField placeholder="Select Language" options={["English","Tamil","Hindi","Telugu"]}/>
        <SelectField placeholder="Working Hours" options={["5:00 AM - 10:00 PM","6:00 AM - 9:00 PM","24 Hours"]}/>
        <SelectField placeholder="Eligibility" options={["Male","Female","Male - Female"]}/>
        <input type="email" placeholder="Email id" className={inputCls}/>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <textarea rows={5} placeholder="Short Description" className={`${inputCls} resize-none`}/>
        <div className="border border-gray-200 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-purple-300 hover:bg-purple-50/30 transition-colors min-h-[130px]" onClick={()=>logoRef.current?.click()}>
          <input ref={logoRef} type="file" accept="image/*" className="hidden" onChange={e=>{const f=e.target.files?.[0];if(f)setLp(URL.createObjectURL(f));}}/>
          {lp?<img src={lp} alt="logo" className="h-20 object-contain rounded-lg"/>:<><span className="text-gray-400"><UploadIcon/></span><span className="text-sm text-gray-500">Upload Logo</span></>}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <input type="password" placeholder="Enter Password" className={inputCls}/>
        <input type="password" placeholder="Confirm Password" className={inputCls}/>
      </div>
      <div className="flex justify-center pt-2">
        <button type="button" className="w-full max-w-sm py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-2xl transition-colors shadow-md">Save</button>
      </div>
    </div>
  );
};

// ── SHARED STAFF CARD ─────────────────────────────────────────────────────────
interface StaffMember { id:number;name:string;contact:string;dob:string;branch:string;aadhar:string;email:string;address:string;gender:string;role:string;experience:string;salaryType:string;amount:string;workingDays:string;workingTime:string; }

const StaffCard = ({ member, roleLabel="Speculation" }:{ member:StaffMember; roleLabel?:string }) => (
  <div className="border border-gray-100 rounded-2xl p-5 bg-white shadow-sm">
    <h3 className="text-sm font-bold text-gray-800 mb-3">Basic Details</h3>
    <div className="flex flex-wrap gap-x-8 gap-y-1.5 mb-4">
      {([["Name",member.name],["Contact Number",member.contact],["Date Of Birth",member.dob],["Branch",member.branch],["Aadhar number",member.aadhar],["Email id",member.email],["Address",member.address],["Gender",member.gender]] as [string,string][]).map(([l,v])=>(
        <span key={l} className="text-sm text-gray-600"><span className="font-medium text-gray-700">{l} : </span>{v}</span>
      ))}
    </div>
    <h3 className="text-sm font-bold text-gray-800 mb-2">Professional Details</h3>
    <div className="flex flex-wrap gap-x-8 gap-y-1.5">
      {([[roleLabel,member.role],["Experiences",member.experience],["Salary",member.salaryType],["Amount",member.amount],["Working Days",member.workingDays],["Working Time",member.workingTime]] as [string,string][]).map(([l,v])=>(
        <span key={l} className="text-sm text-gray-600"><span className="font-medium text-gray-700">{l} : </span>{v}</span>
      ))}
    </div>
  </div>
);

// ── TRAINER ───────────────────────────────────────────────────────────────────
const TRAINERS: StaffMember[] = [{id:1,name:"Selva kumar. GS",contact:"9345665444",dob:"03/2/2002",branch:"M.K.B Nagar",aadhar:"1234 5678 1234",email:"Rajgym.03@gmail.com",address:"West Mambalam, Chennai -600 033",gender:"Male",role:"GYM Trainee",experience:"5 years",salaryType:"Monthly",amount:"$35",workingDays:"Monday - Saturday",workingTime:"5:00 AM to 10:00 PM"}];

const TrainerSettings = () => {
  const navigate = useNavigate();
  const [av, setAv] = useState<string|null>(null);
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <AvatarUpload preview={av} onUpload={setAv}/>
        <button type="button" onClick={() => navigate('/admin/add-trainer')} className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-md"><PlusIcon/> Trainer</button>
      </div>
      <div className="flex flex-col gap-4">{TRAINERS.map(t=><StaffCard key={t.id} member={t} roleLabel="Speculation"/>)}</div>
    </div>
  );
};

// ── SUB-STAFF ─────────────────────────────────────────────────────────────────
const SUB_STAFF: StaffMember[] = [{id:1,name:"Arjun. R",contact:"9876543210",dob:"15/6/1998",branch:"M.K.B Nagar",aadhar:"9876 5432 1098",email:"arjun.r@rajgym.com",address:"Anna Nagar, Chennai - 600 040",gender:"Male",role:"Receptionist",experience:"2 years",salaryType:"Monthly",amount:"$25",workingDays:"Monday - Saturday",workingTime:"8:00 AM to 5:00 PM"}];

const SubStaffModal = ({ onClose }:{ onClose:()=>void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-bold text-gray-900">Add Sub - Staff</h3>
        <button type="button" onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"><CloseIcon/></button>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Basic Details</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><input type="text" placeholder="Full Name" className={inputCls}/><input type="tel" placeholder="Contact Number" className={inputCls}/></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><CalendarIcon/></span><input type="date" className={`${inputCls} pl-9`}/></div><SelectField placeholder="Branch" options={["M.K.B Nagar","Anna Nagar","T.Nagar","Velachery"]}/></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><input type="text" placeholder="Aadhar Number" className={inputCls}/><input type="email" placeholder="Email id" className={inputCls}/></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><input type="text" placeholder="Address" className={inputCls}/><SelectField placeholder="Gender" options={["Male","Female","Other"]}/></div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-1">Professional Details</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><SelectField placeholder="Role / Designation" options={["Receptionist","Cleaning Staff","Security","Manager","Accountant"]}/><SelectField placeholder="Experience" options={["< 1 year","1-2 years","2-5 years","5+ years"]}/></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><SelectField placeholder="Salary Type" options={["Monthly","Weekly","Daily"]}/><input type="text" placeholder="Amount" className={inputCls}/></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><SelectField placeholder="Working Days" options={["Monday - Friday","Monday - Saturday","All Days"]}/><SelectField placeholder="Working Time" options={["8:00 AM - 5:00 PM","5:00 AM - 10:00 PM","6:00 AM - 9:00 PM"]}/></div>
        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onClose} className="flex-1 py-3 border border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50">Cancel</button>
          <button type="button" onClick={onClose} className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl shadow-md">Save</button>
        </div>
      </div>
    </div>
  </div>
);

const CreateSubStaff = () => {
  const [av, setAv] = useState<string|null>(null);
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <AvatarUpload preview={av} onUpload={setAv}/>
        <button type="button" onClick={()=>setShow(true)} className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-md"><PlusIcon/> Sub Staff</button>
      </div>
      <div className="flex flex-col gap-4">{SUB_STAFF.map(s=><StaffCard key={s.id} member={s} roleLabel="Role"/>)}</div>
      {show && <SubStaffModal onClose={()=>setShow(false)}/>}
    </div>
  );
};

// ── WORKOUT SETTINGS ──────────────────────────────────────────────────────────
type WType = "yoga"|"cycling"|"running"|"swimming"|"boxing"|"pilates"|"zumba"|"crossfit";
const W_ITEMS:{type:WType;label:string;emoji:string}[] = [
  {type:"yoga",label:"YOGA",emoji:"🧘"},{type:"cycling",label:"Cycling",emoji:"🚴"},
  {type:"running",label:"Running",emoji:"🏃"},{type:"swimming",label:"Swimming",emoji:"🏊"},
  {type:"boxing",label:"Boxing",emoji:"🥊"},{type:"pilates",label:"Pilates",emoji:"🤸"},
  {type:"zumba",label:"Zumba",emoji:"💃"},{type:"crossfit",label:"CrossFit",emoji:"🏋️"},
];

// Upload box used inside the workout modal
const WorkoutImageUpload = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string|null>(null);
  return (
    <div
      className="border border-gray-200 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-purple-300 hover:bg-purple-50/20 transition-colors min-h-[140px] bg-white"
      onClick={()=>ref.current?.click()}
    >
      <input ref={ref} type="file" accept="image/*" className="hidden"
        onChange={e=>{const f=e.target.files?.[0];if(f)setPreview(URL.createObjectURL(f));}}/>
      {preview
        ? <img src={preview} alt="workout" className="h-24 object-contain rounded-lg"/>
        : <>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            <span className="text-sm text-gray-400">Upload Image</span>
          </>
      }
    </div>
  );
};

const genWorkouts = () => {
  const pool=[...W_ITEMS,...W_ITEMS,...W_ITEMS,...W_ITEMS];
  return pool.sort(()=>Math.random()-0.5).slice(0,28).map((w,i)=>({...w,id:i+1}));
};

const WorkoutSettings = () => {
  const [workouts, setWorkouts] = useState(genWorkouts);
  const [show, setShow] = useState(false);
  const [nw, setNw] = useState({label:"",type:"yoga" as WType});

  const handleAdd = () => {
    if (!nw.label.trim()) return;
    const item = W_ITEMS.find(w=>w.type===nw.type)||W_ITEMS[0];
    setWorkouts(p=>[...p,{...item,label:nw.label,id:Date.now()}]);
    setNw({label:"",type:"yoga"});
    setShow(false);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-700">List of workout</h3>
        <button type="button" onClick={()=>setShow(true)} className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-md whitespace-nowrap">
          <PlusIcon/> Add New Workout
        </button>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {workouts.map(w=>(
          <div key={w.id} className="group flex items-center gap-2 bg-gray-100 hover:bg-purple-50 border border-transparent hover:border-purple-200 rounded-full px-4 py-2 text-sm font-medium text-gray-700 transition-all cursor-default">
            <span className="text-base leading-none">{w.emoji}</span>
            <span>{w.label}</span>
            <button type="button" onClick={()=>setWorkouts(p=>p.filter(x=>x.id!==w.id))} className="opacity-0 group-hover:opacity-100 ml-1 text-gray-400 hover:text-red-400 transition-all leading-none text-lg">×</button>
          </div>
        ))}
      </div>

      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{backgroundColor:"rgba(0,0,0,0.45)"}}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
              <button type="button" onClick={()=>setShow(false)} className="p-1 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <h3 className="text-lg font-bold text-gray-900">Workout Name</h3>
            </div>

            {/* Body */}
            <div className="px-6 py-6 flex flex-col gap-5">
              {/* Enter Name */}
              <input
                type="text"
                placeholder="Enter Name"
                value={nw.label}
                onChange={e=>setNw(p=>({...p,label:e.target.value}))}
                className={inputCls}
              />

              {/* Upload Image */}
              <WorkoutImageUpload/>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6 flex justify-end">
              <button
                type="button"
                onClick={handleAdd}
                className="px-10 py-3 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-semibold rounded-xl transition-colors shadow-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── PAYMENT & BILLING ─────────────────────────────────────────────────────────
const membersData = [
  {month:"Jan",normal:750,paid:400},{month:"Feb",normal:600,paid:500},
  {month:"Mar",normal:800,paid:600},{month:"Apr",normal:700,paid:450},
  {month:"May",normal:900,paid:700},{month:"Jun",normal:850,paid:600},
];
const earningsData = [
  {month:"May",members:600,earnings:500},{month:"Jun",members:700,earnings:650},
  {month:"Jul",members:800,earnings:700},{month:"Aug",members:1800,earnings:900},
  {month:"Sep",members:600,earnings:550},{month:"Oct",members:500,earnings:480},
];
const newMembersData = [
  {day:"22",count:60,color:"#d1d5db"},{day:"23",count:80,color:"#d1d5db"},
  {day:"24",count:130,color:"#7c3aed"},{day:"25",count:100,color:"#f97316"},
  {day:"26",count:110,color:"#06b6d4"},{day:"27",count:70,color:"#10b981"},
  {day:"28",count:90,color:"#a855f7"},
];

const StatCard = ({emoji,value,label,vc}:{emoji:string;value:string;label:string;vc:string}) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-2">
    <span className="text-3xl">{emoji}</span>
    <span className={`text-2xl font-bold ${vc}`}>{value}</span>
    <span className="text-sm text-gray-500">{label}</span>
  </div>
);

type Period = "Week"|"Month"|"Year";

const PaymentBillingSettings = () => {
  const [period, setPeriod] = useState<Period>("Week");
  return (
    <div className="flex flex-col gap-6">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard emoji="🏋️" value="350"    label="Total Members"        vc="text-orange-500"/>
        <StatCard emoji="💳" value="150"    label="Subscription Members" vc="text-gray-800"/>
        <StatCard emoji="👨‍💼" value="12"     label="Total Staff"          vc="text-cyan-500"/>
        <StatCard emoji="💰" value="12,000" label="Total Earnings"        vc="text-emerald-500"/>
        <StatCard emoji="⏳" value="3,500"  label="Total Pending Amount"  vc="text-blue-500"/>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Members Report */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <h4 className="text-sm font-bold text-gray-800">Members Report</h4>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block"/>Normal Members</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block"/>Paid Member</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={membersData} barCategoryGap="30%">
              <XAxis dataKey="month" tick={{fontSize:11,fill:"#9ca3af"}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:11,fill:"#9ca3af"}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{borderRadius:"8px",border:"none",boxShadow:"0 4px 12px rgba(0,0,0,.1)"}}/>
              <Bar dataKey="normal" fill="#22c55e" radius={[4,4,0,0]}/>
              <Bar dataKey="paid"   fill="#f87171" radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Earnings */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
            <h4 className="text-sm font-bold text-gray-800">Earnings</h4>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-400 inline-block"/>Total Members</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block"/>Total Earnings</span>
            </div>
          </div>
          <div className="text-center mb-2">
            <span className="text-lg font-bold text-gray-800">₹1,800</span>
            <span className="text-xs text-gray-400 ml-2">August</span>
          </div>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6"/>
              <XAxis dataKey="month" tick={{fontSize:11,fill:"#9ca3af"}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:11,fill:"#9ca3af"}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{borderRadius:"8px",border:"none",boxShadow:"0 4px 12px rgba(0,0,0,.1)"}}/>
              <Line type="monotone" dataKey="members"  stroke="#60a5fa" strokeWidth={2} dot={false}/>
              <Line type="monotone" dataKey="earnings" stroke="#34d399" strokeWidth={2} dot={false}/>
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* New Join Members */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h4 className="text-sm font-bold text-gray-800">New Join Members</h4>
            <div className="flex gap-1">
              {(["Week","Month","Year"] as Period[]).map(p=>(
                <button key={p} type="button" onClick={()=>setPeriod(p)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${period===p?"bg-purple-600 text-white":"bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>{p}</button>
              ))}
            </div>
          </div>
          <div className="flex items-end justify-between gap-1 h-36 px-1">
            {newMembersData.map(d=>(
              <div key={d.day} className="flex flex-col items-center gap-1 flex-1">
                <div className="relative w-full flex justify-center">
                  {d.day==="24" && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap text-center z-10">
                      13PM<br/><span className="text-purple-400">127k</span>
                    </div>
                  )}
                  <div className="w-7 rounded-t-lg transition-all" style={{height:`${(d.count/140)*120}px`,backgroundColor:d.color}}/>
                </div>
                <span className="text-xs text-gray-400">{d.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── TAB CONFIG ────────────────────────────────────────────────────────────────
type TabKey = "general"|"trainer"|"sub-staff"|"workout"|"billing";
interface TabItem { key:TabKey; label:string; icon:React.ReactNode; }

const GearIcon    = ()=>(<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>);
const TrainerIcon = ()=>(<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>);
const StaffIcon   = ()=>(<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>);
const WorkoutIcon = ()=>(<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>);
const BillingIcon = ()=>(<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>);

const TABS: TabItem[] = [
  {key:"general",   label:"General Settings",           icon:<GearIcon/>},
  {key:"trainer",   label:"Trainer Settings",           icon:<TrainerIcon/>},
  {key:"sub-staff", label:"Create A Sub - Staff",       icon:<StaffIcon/>},
  {key:"workout",   label:"Workout Settings",           icon:<WorkoutIcon/>},
  {key:"billing",   label:"Payment & Billing Settings", icon:<BillingIcon/>},
];

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function SettingsTabPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("general");
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = TABS.find(t=>t.key===activeTab)!;

  const renderPanel = () => {
    switch(activeTab) {
      case "general":   return <GeneralSettings/>;
      case "trainer":   return <TrainerSettings/>;
      case "sub-staff": return <CreateSubStaff/>;
      case "workout":   return <WorkoutSettings/>;
      case "billing":   return <PaymentBillingSettings/>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">

        {/* Desktop tabs */}
        <div className="hidden md:flex items-center gap-2 mb-6 flex-wrap">
          {TABS.map(tab=>(
            <button key={tab.key} type="button" onClick={()=>setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${activeTab===tab.key?"bg-purple-600 text-white shadow-md":"bg-white text-gray-600 border border-gray-200 hover:border-purple-300 hover:text-purple-600"}`}>
              <span className={activeTab===tab.key?"text-white":"text-gray-400"}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Mobile dropdown */}
        <div className="md:hidden mb-5">
          <button type="button" onClick={()=>setMobileOpen(!mobileOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm text-sm font-medium text-gray-700">
            <span className="flex items-center gap-2"><span className="text-purple-600">{active.icon}</span>{active.label}</span>
            <span className={`transition-transform ${mobileOpen?"rotate-180":""}`}><ChevronDown/></span>
          </button>
          {mobileOpen && (
            <div className="mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-10 relative">
              {TABS.filter(t=>t.key!==activeTab).map(tab=>(
                <button key={tab.key} type="button" onClick={()=>{setActiveTab(tab.key);setMobileOpen(false);}}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-600 hover:bg-purple-50 hover:text-purple-600 transition-colors border-b border-gray-100 last:border-0">
                  <span className="text-gray-400">{tab.icon}</span>{tab.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Panel */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-7">
          <div className="flex items-center gap-3 mb-6">
            <button type="button" className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"><BackIcon/></button>
            <h2 className="text-xl font-bold text-gray-900">{active.label}</h2>
          </div>
          {renderPanel()}
        </div>

      </div>
    </div>
  );
}