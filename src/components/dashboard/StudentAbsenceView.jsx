import React, { useState } from 'react';
import { FaFileUpload, FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';

const StudentAbsenceView = ({ student, absences, onJustify }) => {
  const myAbsences = absences.filter(a => a.studentId === student.id);
  const [selectedAbsence, setSelectedAbsence] = useState(null);
  const [justificationText, setJustificationText] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedAbsence) {
      onJustify(selectedAbsence.id, justificationText, file);
      setSelectedAbsence(null);
      setJustificationText("");
      setFile(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Mes Absences</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Heure</th>
              <th className="px-4 py-3">Matière</th>
              <th className="px-4 py-3">État</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {myAbsences.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-4 text-center text-gray-500">Aucune absence enregistrée.</td>
              </tr>
            ) : (
              myAbsences.map((absence) => (
                <tr key={absence.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{absence.date}</td>
                  <td className="px-4 py-3">{absence.time}</td>
                  <td className="px-4 py-3 font-medium">{absence.subject}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${absence.status === 'Justifié' ? 'bg-green-100 text-green-800' : 
                        absence.status === 'En Attente' || absence.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {absence.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {absence.status === 'Non Justifié' && (
                      <button 
                        onClick={() => setSelectedAbsence(absence)}
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        Justifier
                      </button>
                    )}
                    {absence.justification && <span className="text-gray-500 text-xs truncate max-w-[100px] inline-block" title={absence.justification}>{absence.justification}</span>}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedAbsence && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Justifier l'absence du {selectedAbsence.date}</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Motif</label>
                <textarea 
                  className="w-full border rounded p-2" 
                  rows="3"
                  value={justificationText}
                  onChange={(e) => setJustificationText(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Pièce jointe (Optionnel)</label>
                <input 
                  type="file" 
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <div className="flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setSelectedAbsence(null)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Annuler
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Envoyer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentAbsenceView;
