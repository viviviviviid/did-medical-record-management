import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from './views/main/main';
import Login from './views/login/login';
import Auth from './views/auth/auth.js';
import Records from './views/medical-records/records';
import SignUp from './views/signup/signup';
import PatientMedicalRecords from './views/patient-medical-records/patient-medical-records';
import PatientList from './views/patient-list/patient-list';
import NewMedicalRecord from './views/new-medical-record/new-medical-record';
import PatientMedicalRecordView from './views/patient-medical-record-view/patient-medical-record-view';
import PatientMedicalRecordUpdate from './views/patient-medical-record-update/patient-medical-record-update';
import DoctorAuth from './views/doctor-auth/doctor-auth';
import QrCode from './views/qr-code/qr-code';
import QrCodeScan from './views/qr-code-scan/qr-code-scan';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/auth" element={<Auth />} />
        <Route path="/medical-records" element={<Records />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/patient-medical-records" element={<PatientMedicalRecords />} />
        <Route path="/patient-list" element={<PatientList />} />
        <Route path="/new-medical-record" element={<NewMedicalRecord />} />
        <Route path="/patient-medical-record-view" element={<PatientMedicalRecordView />} />
        <Route path="/patient-medical-record-update" element={<PatientMedicalRecordUpdate />} />
        <Route path="/doctor-auth" element={<DoctorAuth />} />
        <Route path="/qr-code" element={<QrCode />} />
        <Route path="/qr-code-scan" element={<QrCodeScan />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;