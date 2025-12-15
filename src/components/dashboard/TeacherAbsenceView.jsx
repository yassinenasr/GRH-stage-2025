import React, { useState } from 'react';

const TeacherAbsenceView = ({ students, absences, onAddAbsence, onUpdateStatus }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAbsence, setNewAbsence] = useState({
    studentId: students[0]?.id || '',
    date: '',
    time: '',
    subject: '',
    status: 'Non Justifié'
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    onAddAbsence({
      ...newAbsence,
      studentId: parseInt(newAbsence.studentId)
    });
    setShowAddModal(false);
    setNewAbsence({ ...newAbsence, date: '', time: '' }); // Reset some fields
  };

  return (
    <div className="space-y-6">
      {/* Actions Bar */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold text-gray-800">Gestion des Absences</h2>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-medium"
        >
          + Signaler une absence
        </button>
      </div>

      {/* Absences List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr>
              <th className="px-4 py-3">Étudiant</th>
              <th className="px-4 py-3">Date / Heure</th>
              <th className="px-4 py-3">Matière</th>
              <th className="px-4 py-3">Justification</th>
              <th className="px-4 py-3">État</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {absences.map((absence) => {
              const student = students.find(s => s.id === absence.studentId);
              return (
                <tr key={absence.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{student?.name || 'Inconnu'}</td>
                  <td className="px-4 py-3">
                    <div>{absence.date}</div>
                    <div className="text-xs text-gray-500">{absence.time}</div>
                  </td>
                  <td className="px-4 py-3">{absence.subject}</td>
                  <td className="px-4 py-3">
                    {absence.justification ? (
                      <div>
                        <p className="text-sm">{absence.justification}</p>
                        {absence.justificationFile && (
                          <span className="text-xs text-blue-500 underline cursor-pointer">
                            📎 {absence.justificationFile}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400 italic">Aucune</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${absence.status === 'Justifié' ? 'bg-green-100 text-green-800' : 
                        absence.status === 'En Attente' || absence.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {absence.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <select 
                      value={absence.status}
                      onChange={(e) => onUpdateStatus(absence.id, e.target.value)}
                      className="border rounded px-2 py-1 text-xs bg-white"
                    >
                      <option value="Non Justifié">Non Justifié</option>
                      <option value="En Attente">En Attente</option>
                      <option value="Justifié">Justifié</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add Absence Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Signaler une absence</h3>
            <form onSubmit={handleAddSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Étudiant</label>
                <select 
                  className="w-full border rounded p-2"
                  value={newAbsence.studentId}
                  onChange={(e) => setNewAbsence({...newAbsence, studentId: e.target.value})}
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input 
                    type="date" 
                    className="w-full border rounded p-2"
                    value={newAbsence.date}
                    onChange={(e) => setNewAbsence({...newAbsence, date: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Heure</label>
                  <input 
                    type="text" 
                    placeholder="ex: 08:30 - 10:00"
                    className="w-full border rounded p-2"
                    value={newAbsence.time}
                    onChange={(e) => setNewAbsence({...newAbsence, time: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Matière</label>
                <input 
                  type="text" 
                  className="w-full border rounded p-2"
                  value={newAbsence.subject}
                  onChange={(e) => setNewAbsence({...newAbsence, subject: e.target.value})}
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Annuler
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherAbsenceView;
