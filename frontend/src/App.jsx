import React, { useState, useEffect } from 'react';
import { getAllRecords, saveRecord, updateRecord, deleteRecord } from './localStorageUtils';
import SleepChart from './components/SleepChart';
import SleepTip from './components/SleepTip';

function App() {
  const [sleepRecords, setSleepRecords] = useState([]);
  const [sleepDate, setSleepDate] = useState('');
  const [sleepTime, setSleepTime] = useState('');
  const [wakeTime, setWakeTime] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingRecordId, setEditingRecordId] = useState(null);

  useEffect(() => {
    const storedRecords = getAllRecords();
    setSleepRecords(storedRecords);
  }, []);

  const handleDelete = (id) => {
    deleteRecord(id);
    setSleepRecords(getAllRecords()); // Refresh records after deletion
  };

  const handleEdit = (record) => {
    setIsEditing(true);
    setEditingRecordId(record.id);
    setSleepDate(record.date);
    setSleepTime(record.sleepTime);
    setWakeTime(record.wakeTime);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sleepDate && sleepTime && wakeTime) {
      const recordData = {
        date: sleepDate,
        sleepTime,
        wakeTime,
        quality: 'unknown', // Default quality, can be expanded later
      };

      if (isEditing) {
        updateRecord(editingRecordId, recordData);
        setIsEditing(false);
        setEditingRecordId(null);
      } else {
        saveRecord({ ...recordData, id: new Date().getTime() });
      }

      setSleepRecords(getAllRecords()); // Update state from LocalStorage
      setSleepDate('');
      setSleepTime('');
      setWakeTime('');
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">수면 패턴 분석</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">수면 기록 {isEditing ? '수정' : '추가'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="sleep-date" className="block text-sm font-medium mb-2">날짜</label>
                <input
                  type="date"
                  id="sleep-date"
                  value={sleepDate}
                  onChange={(e) => setSleepDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="sleep-time" className="block text-sm font-medium mb-2">취침 시간</label>
                <input
                  type="time"
                  id="sleep-time"
                  value={sleepTime}
                  onChange={(e) => setSleepTime(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="wake-time" className="block text-sm font-medium mb-2">기상 시간</label>
                <input
                  type="time"
                  id="wake-time"
                  value={wakeTime}
                  onChange={(e) => setWakeTime(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
              >
                {isEditing ? '수정 완료' : '기록 추가'}
              </button>
            </form>
          </div>

          {/* Sleep Records List */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">수면 기록 목록</h2>
            <div className="space-y-4">
              {sleepRecords.length > 0 ? (
                sleepRecords.map(record => (
                  <div key={record.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-md flex justify-between items-center">
                    <div>
                      <p><strong>날짜:</strong> {record.date}</p>
                      <p><strong>취침 시간:</strong> {record.sleepTime}</p>
                      <p><strong>기상 시간:</strong> {record.wakeTime}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(record)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm py-1 px-3 rounded-md transition duration-300"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDelete(record.id)}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-3 rounded-md transition duration-300"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400">수면 기록이 없습니다.</p>
              )}
            </div>
          </div>
        </div>

        {/* Sleep Chart */}
        <SleepChart sleepRecords={sleepRecords} />

        {/* Sleep Tip */}
        <SleepTip sleepRecords={sleepRecords} />
      </div>
    </div>
  );
}

export default App;
