const SLEEP_RECORDS_KEY = 'sleep_records';

/**
 * LocalStorage에서 모든 수면 기록을 불러와 배열로 반환합니다.
 * 기록이 없으면 빈 배열을 반환합니다.
 * @returns {Array<Object>} 수면 기록 배열
 */
export const getAllRecords = () => {
  try {
    const records = localStorage.getItem(SLEEP_RECORDS_KEY);
    return records ? JSON.parse(records) : [];
  } catch (error) {
    console.error("Error getting all records from LocalStorage:", error);
    return [];
  }
};

/**
 * 새 수면 기록을 배열에 추가하고 LocalStorage에 저장합니다.
 * 기록 객체는 최소한 id, date, startTime, endTime, quality 속성을 포함해야 합니다.
 * @param {Object} record - 추가할 수면 기록 객체
 */
export const saveRecord = (record) => {
  try {
    const records = getAllRecords();
    // Ensure the record has required properties, though validation might be better in the component
    if (!record.id || !record.date || !record.startTime || !record.endTime || record.quality === undefined) {
      console.warn("Attempted to save a record without all required properties.", record);
      // Optionally throw an error or handle more robustly
    }
    records.push(record);
    localStorage.setItem(SLEEP_RECORDS_KEY, JSON.stringify(records));
  } catch (error) {
    console.error("Error saving record to LocalStorage:", error);
  }
};

/**
 * 특정 ID를 가진 기록을 찾아 newRecord로 교체하고 LocalStorage에 저장합니다.
 * @param {string | number} id - 업데이트할 기록의 ID
 * @param {Object} newRecord - 새 기록 객체
 */
export const updateRecord = (id, newRecord) => {
  try {
    let records = getAllRecords();
    const index = records.findIndex(record => record.id === id);
    if (index !== -1) {
      records[index] = { ...records[index], ...newRecord }; // Merge newRecord with existing one
      localStorage.setItem(SLEEP_RECORDS_KEY, JSON.stringify(records));
    } else {
      console.warn(`Record with ID ${id} not found for update.`);
    }
  } catch (error) {
    console.error("Error updating record in LocalStorage:", error);
  }
};

/**
 * 특정 ID를 가진 기록을 배열에서 삭제하고 LocalStorage에 저장합니다.
 * @param {string | number} id - 삭제할 기록의 ID
 */
export const deleteRecord = (id) => {
  try {
    let records = getAllRecords();
    const filteredRecords = records.filter(record => record.id !== id);
    if (filteredRecords.length < records.length) {
      localStorage.setItem(SLEEP_RECORDS_KEY, JSON.stringify(filteredRecords));
    } else {
      console.warn(`Record with ID ${id} not found for deletion.`);
    }
  } catch (error) {
    console.error("Error deleting record from LocalStorage:", error);
  }
};
