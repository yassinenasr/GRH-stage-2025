import React, { useState } from 'react';
import { studentsData, initialAbsences } from '../../data/absenceData';
import StudentAbsenceView from './StudentAbsenceView';
import TeacherAbsenceView from './TeacherAbsenceView';
import { FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';
import adminDashboard from '../../data/adminDashboard';
const AdminDashboard = () => {
    // State for mock data
    const [absences, setAbsences] = useState(initialAbsences);
    const [currentUser, setCurrentUser] = useState({ role: 'student', id: 1 }); // Toggle between 'student' (id:1) and 'teacher'

    // Handlers
    const handleAddAbsence = (newAbsence) => {
        const id = Math.max(...absences.map(a => a.id), 0) + 1;
        setAbsences([...absences, { ...newAbsence, id }]);
    };

    const handleJustify = (absenceId, text, file) => {
        setAbsences(absences.map(a =>
            a.id === absenceId
                ? { ...a, status: "Pending", justification: text, justificationFile: file ? file.name : "doc.pdf" }
                : a
        ));
    };

    const handleUpdateStatus = (absenceId, newStatus) => {
        setAbsences(absences.map(a =>
            a.id === absenceId ? { ...a, status: newStatus } : a
        ));
    };

    // Helper to switch users for demo purposes
    const toggleUser = () => {
        if (currentUser.role === 'student') {
            if (currentUser.id === 1) setCurrentUser({ role: 'student', id: 3 }); // Switch to student with many absences
            else setCurrentUser({ role: 'teacher', id: 99 });
        } else {
            setCurrentUser({ role: 'student', id: 1 });
        }
    };

    const currentStudent = studentsData.find(s => s.id === currentUser.id);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Demo Controls */}
            <div className="mb-8 flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Système de Gestion des Absences</h1>
                    <p className="text-sm text-gray-500">Mode actuel : <span className="font-bold uppercase text-blue-600">{currentUser.role}</span> {currentUser.role === 'student' && `(${currentStudent?.name})`}</p>
                </div>
                <button
                    onClick={toggleUser}
                    className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 text-sm flex items-center gap-2"
                >
                    {currentUser.role === 'student' ? <FaChalkboardTeacher /> : <FaUserGraduate />}
                    Changer de rôle (Démo)
                </button>
            </div>

            {currentUser.role === 'student' ? (
                <StudentAbsenceView
                    student={currentStudent}
                    absences={absences}
                    onJustify={handleJustify}
                />
            ) : (
                <TeacherAbsenceView
                    students={studentsData}
                    absences={absences}
                    onAddAbsence={handleAddAbsence}
                    onUpdateStatus={handleUpdateStatus}
                />
            )}
        </div>
    );
};

export default AdminDashboard;